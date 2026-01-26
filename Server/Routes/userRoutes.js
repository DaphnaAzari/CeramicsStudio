const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const User = require('../Models/User');
const { makeUser, getUserById, updateUser, loginUser, getAllUsers, deleteUser, forgotPassword, resetPassword } = require('../controllers/userC');
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');
const { uploadAndHandleErrors } = require('../middleware/uploadMiddleware');

router.use(methodOverride('_method'));

router.post('/', uploadAndHandleErrors, makeUser);

router.post('/login', loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

router.get('/:id', getUserById);

router.get('/', getAllUsers);

router.get('/debug-artists', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        console.log("Users fetched from DB:", users.length);
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching users" });
    }
});

//updated edit that allows both image + form data to be updated:

router.put('/:id', protect, upload.single('imageFile'), updateUser);

router.delete('/:id', protect, deleteUser);


module.exports = router;
