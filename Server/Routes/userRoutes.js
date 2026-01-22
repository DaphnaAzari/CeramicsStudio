const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const User = require('../Models/User');
const { makeUser, getUserById, updateUser, loginUser, getAllUsers, deleteUser } = require('../controllers/userC');
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');
const { uploadAndHandleErrors } = require('../middleware/uploadMiddleware');
// const multer = require('multer');
// const path = require('path');


router.use(methodOverride('_method'));

router.post('/', uploadAndHandleErrors, makeUser);


// This was moved to an upload middleware
// Call multer manually so we can capture its errors

// router.post('/', (req, res) => {

//     upload.single('imageFile')(req, res, async function (err) {
//         if (err) {
//             console.error('Multer/Cloudinary upload error:', err);
//             return res
//                 .status(500)
//                 .json({ message: 'Upload failed', details: err.message || err.toString() });
//         }

//         try {
//             console.log('Multer upload passed, continuing to makeUser');
//             await makeUser(req, res);
//         } catch (controllerError) {
//             console.error(' Error inside makeUser:', controllerError);
//             res
//                 .status(500)
//                 .json({ message: 'User creation failed', details: controllerError.message });
//         }
//     });
// });


router.post('/login', loginUser);


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

//Updated edit that allows both image + form data to be updated:

router.put('/:id', protect, upload.single('imageFile'), updateUser);

router.delete('/:id', protect, deleteUser);







module.exports = router;
