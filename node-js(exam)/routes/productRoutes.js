const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const productController = require('../controllers/productController');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.get('/', ensureAuthenticated, productController.getAllProducts);
router.get('/create', ensureAuthenticated, (req, res) => res.render('products/create'));
router.post('/', ensureAuthenticated, productController.createProduct);
router.get('/:id/edit', ensureAuthenticated, productController.getEditProduct);
router.put('/:id', ensureAuthenticated, productController.updateProduct);
router.delete('/:id', ensureAuthenticated, productController.deleteProduct);

module.exports = router;