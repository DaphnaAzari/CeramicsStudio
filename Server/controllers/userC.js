const User = require('../Models/User');
const { cloudinary } = require('../config/cloudinary');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const makeUser = async (req, res) => {
    try {
        console.log('--- Creating New User ---');
        console.log('Body keys:', Object.keys(req.body));
        console.dir(req.file, { depth: 2 });

        const { firstName, lastName, userName, email, password } = req.body;

        if (!firstName || !lastName || !userName || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }


        //parsing socials-handeling both Json strings and empty data to be safe:

        let socials = { instagram: '', website: '' };
        if (req.body.socials) {
            if (typeof req.body.socials === 'string') {
                try {
                    socials = JSON.parse(req.body.socials);
                } catch (err) {
                    console.error('Failed to parse socials JSON:', err.message);
                    return res.status(400).json({ error: 'Invalid socials format' });
                }
            } else if (typeof req.body.socials === 'object') {
                socials = req.body.socials;
            }
        }


        // extract Cloudinary image fields
        let image = { url: '', public_id: '' };
        if (req.file) {
            // Multer-storage-cloudinary may set different keys, so trying various options to be safe
            image.url = req.file.path || req.file.secure_url || req.file.url || '';
            image.public_id = req.file.filename || req.file.public_id || '';
        }

        //note url stores the actual image URL from Cloudinary & public_id stores Cloudinary’s ID in case I want to delete or manage the image later.

        // check if email already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: 'Email already registered' });
        }



        const newUser = new User({
            firstName,
            lastName,
            userName,
            email,
            password,
            socials,
            image,
        });

        const savedUser = await newUser.save();

        console.log('User created:', savedUser.email);

        // generate JWT token for the new user:
        const token = jwt.sign(
            { id: savedUser._id },
            process.env.JWT_SECRET,
            // valid for 7 days:
            { expiresIn: '7d' }
        );

        console.log('Generated token for new user:', token);



        res.status(201).json({
            user: {
                _id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                userName: savedUser.userName,
                email: savedUser.email,
                image: savedUser.image,
                socials: savedUser.socials
            },
            token
        });
    } catch (err) {
        console.error('Error creating user:', err.message);
        console.error(err.stack);

        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation failed', details: err.errors });
        }

        if (err.code === 11000) {
            return res.status(409).json({ error: 'Duplicate key', keyValue: err.keyValue });
        }

        res.status(500).json({ error: err.message || 'Server error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};




const updateUser = async (req, res) => {
    try {
        console.log("Incoming update request for user:", req.params.id);
        console.log("Body received:", req.body);
        console.log("File received:", req.file ? req.file.originalname : "No file");

        const updateFields = { ...req.body };

        // If socials is sent as a string (from FormData), parse it
        if (updateFields.socials && typeof updateFields.socials === "string") {
            try {
                updateFields.socials = JSON.parse(updateFields.socials);
            } catch (err) {
                console.error("Failed to parse socials JSON:", err.message);
            }
        }

        // If a new image was uploaded, include it
        if (req.file) {
            updateFields.image = {
                url: req.file.path || req.file.secure_url,
                public_id: req.file.filename || req.file.public_id,
            };
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log("Updated user:", updatedUser);
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: 'Server error' });
    }
};

// DELETE USER
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // prevent deleting someone else's account
        if (req.user.id !== user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this user' });
        }

        await user.deleteOne();
        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting user' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // find user by email
        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        // verify password with hashed one!
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        // generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // sends user info & token

        res.status(200).json({
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email,
                image: user.image || null,
                socials: user.socials || {}
            },
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // generate a reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 3600000; // 1 hour expiration
        await user.save();

        // build frontend reset URL
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        // create email message
        const message = `You requested a password reset. Click the link to reset your password: ${resetUrl}`;

        // send the email
        await sendEmail({
            to: user.email,
            subject: "Password Reset Request",
            text: message
        });

        // respond to frontend
        res.status(200).json({ message: "Reset email sent!" });

    } catch (err) {
        console.error("Forgot password error:", err);
        res.status(500).json({ message: "Server error sending reset email" });
    }
};


// RESET PASSWORD 
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // validate password exists and meets requirements
        if (!password || password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            });
        }

        // find user with valid, non-expired token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
            // Need to select password field
        }).select('+password');

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired token"
            });
        }

        // update password -will be hashed by presave hook
        user.password = password;

        //clear reset token fields null rather than undefined
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;

        // save user
        await user.save();

        console.log(`Password successfully reset for user: ${user.email}`);

        res.status(200).json({
            message: "Password reset successful! Redirecting to login..."
        });

    } catch (err) {
        console.error("Reset password error:", err);
        res.status(500).json({
            message: "Server error resetting password. Please try again."
        });
    }
};


module.exports = { makeUser, getUserById, getAllUsers, updateUser, deleteUser, loginUser, forgotPassword, resetPassword };