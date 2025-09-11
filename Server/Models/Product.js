const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    artType: {
        type: String,
        required: true,
        enum: ['Animal Figures', 'Human Figures', 'Homeware', 'Abstract']

    }
});

const Product = mongoose.model('Product', productSchema);

// Optional- only if needed elsewhere
module.exports = Product;