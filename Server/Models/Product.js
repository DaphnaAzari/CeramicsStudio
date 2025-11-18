const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    userId: {
        // type: String,
        // required: true
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    price: {
        type: Number,
        required: true
    },
    artType: {
        type: String,
        required: true,
        enum: ['Animal Figures', 'Human Figures', 'Homeware', 'Abstract']

    },
    image: {
        url: { type: String, default: '', required: true },
        public_id: { type: String, default: '', required: true }

    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;