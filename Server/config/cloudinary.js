const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log('🔍 Cloudinary Config Check:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: !!process.env.CLOUDINARY_API_KEY,
    api_secret: !!process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        // All user images go here
        folder: 'ceramics_users',
        allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],
    },
});


const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // accept file
        } else {
            console.error('Invalid file type uploaded:', file.mimetype);
            cb(new Error('Invalid file type'), false); // reject file
        }
    }
});


module.exports = { cloudinary, upload };