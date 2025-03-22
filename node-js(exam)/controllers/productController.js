const Product = require('../models/Product');
const Cart = require('../models/Cart');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }
        const products = await Product.find(query);
        const cart = await Cart.findOne({ userId: req.user._id });
        res.render('products/index', { products, cart });
    } catch (err) {
        req.flash('error_msg', 'Error loading products');
        res.redirect('/');
    }
};

exports.getEditProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            req.flash('error_msg', 'Product not found');
            return res.redirect('/products');
        }
        res.render('products/edit', { product });
    } catch (err) {
        req.flash('error_msg', 'Error loading product');
        res.redirect('/products');
    }
};

exports.createProduct = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            req.flash('error_msg', err);
            return res.redirect('/products/create');
        }

        try {
            const { name, price, qty, description, category } = req.body;
            const newProduct = new Product({
                name,
                price,
                qty,
                description,
                category,
                image: `/uploads/${req.file.filename}`
            });
            await newProduct.save();
            req.flash('success_msg', 'Product added successfully');
            res.redirect('/products');
        } catch (err) {
            req.flash('error_msg', 'Error creating product');
            res.redirect('/products/create');
        }
    });
};

exports.updateProduct = (req, res) => {
    upload(req, res, async (err) => {
        try {
            const { name, price, qty, description, category } = req.body;
            const updateData = {
                name,
                price,
                qty,
                description,
                category
            };

            // Only update image if a new one was uploaded
            if (req.file) {
                updateData.image = `/uploads/${req.file.filename}`;
            }

            await Product.findByIdAndUpdate(req.params.id, updateData);
            req.flash('success_msg', 'Product updated successfully');
            res.redirect('/products');
        } catch (err) {
            req.flash('error_msg', 'Error updating product');
            res.redirect('/products');
        }
    });
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Product deleted successfully');
        res.redirect('/products');
    } catch (err) {
        req.flash('error_msg', 'Error deleting product');
        res.redirect('/products');
    }
};