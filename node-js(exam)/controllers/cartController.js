const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id })
            .populate('items.productId');
        const products = cart ? cart.items.map(item => ({
            ...item.productId._doc,
            quantity: item.quantity
        })) : [];
        res.render('cart/index', { cart, products });
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error fetching cart');
        res.redirect('/');
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            cart = new Cart({ userId: req.user._id, items: [] });
        }

        const existingItem = cart.items.find(item => 
            item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        req.flash('success_msg', 'Item added to cart');
        res.redirect('/cart');
    } catch (err) {
        req.flash('error_msg', 'Error adding to cart');
        res.redirect('/products');
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        await Cart.findOneAndUpdate(
            { userId: req.user._id, 'items.productId': productId },
            { $set: { 'items.$.quantity': quantity } }
        );
        req.flash('success_msg', 'Cart updated');
        res.redirect('/cart');
    } catch (err) {
        req.flash('error_msg', 'Error updating cart');
        res.redirect('/cart');
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        
        // Only remove from cart
        await Cart.findOneAndUpdate(
            { userId: req.user._id },
            { $pull: { items: { productId } } }
        );

        req.flash('success_msg', 'Item removed from cart');
        res.redirect('/cart');
    } catch (err) {
        console.error('Remove error:', err);
        req.flash('error_msg', 'Error removing item');
        res.redirect('/cart');
    }
};