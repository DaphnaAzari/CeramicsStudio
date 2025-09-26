const User = require('../Models/User');

const makeUser = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password, image, socials } = req.body;

        const newUser = new User({
            firstName,
            lastName,
            userName,
            email,
            password,
            image,
            socials
        });

        const savedUser = await newUser.save();
        console.log('User created:', savedUser);

        res.status(201).json(savedUser);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Server error' });
    }
};


const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // returns updated doc
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Server error' });
    }
};
module.exports = { makeUser, getUserById, updateUser };