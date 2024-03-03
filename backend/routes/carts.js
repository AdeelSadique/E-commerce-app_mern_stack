const express = require('express');
const { getCart, addProductsInCart, deleteCart } = require('../controllers/carts');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();
router.route('/mycart').get(isAuthenticated, getCart).post(isAuthenticated, addProductsInCart);
router.route('/mycart/:productId').delete(isAuthenticated, deleteCart);

module.exports = router;
