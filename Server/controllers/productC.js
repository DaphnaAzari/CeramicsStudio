const Product = require('../Models/Product');
const { cloudinary } = require('../config/cloudinary');

// CREATE PRODUCT
const createProduct = async (req, res) => {
    try {
        const { productName, price, artType } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Product image is required" });
        }
        const product = await Product.create({
            productName,
            price,
            artType,
            userId: req.user.id,
            image: {
                url: req.file.path,
                public_id: req.file.filename
            }
        });

        res.status(201).json(product);

    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).json({ message: "Product creation failed", details: err.message });
    }
};
//         const product = await Product.create({
//             productName,
//             price,
//             artType,
//             userId: req.user.id,
//             image: req.file
//                 ? { url: req.file.path, public_id: req.file.filename }
//                 : { url: '', public_id: '' }
//         });

//         res.status(201).json(product);

//     } catch (err) {
//         console.error("Error creating product:", err);
//         res.status(500).json({ message: "Product creation failed", details: err.message });
//     }
// };

// GET ALL PRODUCTS (optional filter)
const getProducts = async (req, res) => {
    try {
        const filter = req.query.artType ? { artType: req.query.artType } : {};
        const products = await Product.find(filter);
        //res.json(products);
        res.status(200).json({ products })
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Server error fetching products" });
    }
};

// GET PRODUCTS OF A SPECIFIC USER
const getUserProducts = async (req, res) => {
    try {
        const products = await Product.find({ userId: req.params.userId });
        res.status(200).json({ products }); // <-- wrap array in object
    } catch (err) {
        console.error("Error fetching user's products:", err);
        res.status(500).json({ message: "Server error fetching user's products" });
    }
};


// const getUserProducts = async (req, res) => {
//     try {
//         const products = await Product.find({ userId: req.params.userId });
//         res.json(products);
//     } catch (err) {
//         console.error("Error fetching user's products:", err);
//         res.status(500).json({ message: "Server error fetching user's products" });
//     }
// };

// GET PRODUCT BY ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('userId', 'userName image');
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ message: "Server error fetching product" });
    }
};

// UPDATE PRODUCT
// "if (product.userId !== req.user.id)"" changed because when types differ 
//comparing is fragile:

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Ensure user owns this product
        if (!product.userId.equals(req.user._id)) {
            return res.status(403).json({ message: "Not authorized to edit this product" });
        }

        // Replace image if new file uploaded
        if (req.file) {
            if (product.image.public_id) {
                try {
                    await cloudinary.uploader.destroy(product.image.public_id);
                } catch (err) {
                    console.warn("Failed to delete old image", err);
                }
            }

            product.image = {
                url: req.file.path,
                public_id: req.file.filename
            };
        }

        product.productName = req.body.productName ?? product.productName;
        product.price = req.body.price ?? product.price;
        product.artType = req.body.artType ?? product.artType;

        const updatedProduct = await product.save();
        res.json(updatedProduct);

    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({
            message: "Product update failed",
            details: err.message
        });
    }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // if (product.userId !== req.user.id)
        //     return res.status(403).json({ message: "Not authorized to delete this product" });

        if (!product.userId.equals(req.user._id)) {
            return res.status(403).json({ message: "Not authorized to delete this product" });
        }

        if (product.image.public_id) {
            try {
                await cloudinary.uploader.destroy(product.image.public_id);
            } catch (err) {
                console.warn("Failed to delete product image", err);
            }
        }

        await product.deleteOne();
        res.json({ message: "Product deleted successfully" });

    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ message: "Product deletion failed", details: err.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getUserProducts,
    getProductById,
    updateProduct,
    deleteProduct
};