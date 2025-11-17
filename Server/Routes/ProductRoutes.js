const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { uploadAndHandleErrors } = require('../middleware/uploadMiddleware');
const { validateProduct } = require('../middleware/validators/productValidators');


const {
    createProduct,
    getProducts,
    getUserProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/productC');

router.post('/', protect, uploadAndHandleErrors, validateProduct, createProduct);
router.get('/', getProducts);
router.get('/user/:userId', getUserProducts);
router.put('/:id', protect, uploadAndHandleErrors, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;