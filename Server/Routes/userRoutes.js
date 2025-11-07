const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const User = require('../Models/User');
const { makeUser, getUserById, updateUser, loginUser } = require('../controllers/userC');
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');
// const multer = require('multer');
// const path = require('path');


router.use(methodOverride('_method'));


router.post('/', (req, res) => {
    // Call multer manually so we can capture its errors
    upload.single('imageFile')(req, res, async function (err) {
        if (err) {
            console.error('Multer/Cloudinary upload error:', err);
            return res
                .status(500)
                .json({ message: 'Upload failed', details: err.message || err.toString() });
        }

        try {
            console.log('Multer upload passed, continuing to makeUser');
            await makeUser(req, res);
        } catch (controllerError) {
            console.error(' Error inside makeUser:', controllerError);
            res
                .status(500)
                .json({ message: 'User creation failed', details: controllerError.message });
        }
    });
});


// LOGIN 
router.post('/login', loginUser);

// GET
router.get('/:id', protect, getUserById);

// Edit user profile
router.put('/:id', protect, updateUser);

//Get all users (Our Artists page)

router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE
router.delete('/:id', (req, res) => {
    console.log(`Deleting user with ID: ${req.params.id}`);
    res.send(`Deleting artist page with ID ${req.params.id}`);
});


module.exports = router;

// to delete later
// const makeUser = async () => {
//     const u = new User({
//         firstName: 'Daphna',
//         lastName: 'Azari',
//         userName: 'DaphnaA',
//         email: 'daphna.azari@gmail.com',
//         password: 'ceramicsTime123!'
//     })
//     const res = await u.save()
//     console.log(res)
// }
// makeUser();