const { upload } = require('../config/cloudinary');
//centralise upload + error handling so controllers never need 
//to call upload.single(...) manually.
const uploadAndHandleErrors = (req, res, next) => {
    upload.single('imageFile')(req, res, function (err) {

        if (err) {
            console.error('Multer/Cloudinary upload error:', err);
            return res.status(500).json({
                message: 'Upload failed',
                details: err.message || err.toString()
            });
        }

        console.log('Multer upload passed, continuing to controller...');
        next();
    });
};

module.exports = { uploadAndHandleErrors };