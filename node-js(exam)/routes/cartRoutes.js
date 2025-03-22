const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const cartController = require('../controllers/cartController');

// View cart
router.get('/', ensureAuthenticated, cartController.getCart);

// Add item to cart
router.post('/add', ensureAuthenticated, cartController.addToCart);

// Update cart item quantity
router.post('/update', ensureAuthenticated, cartController.updateCart);

// Remove item from cart
router.post('/remove/:productId', ensureAuthenticated, cartController.removeFromCart);

module.exports = router;