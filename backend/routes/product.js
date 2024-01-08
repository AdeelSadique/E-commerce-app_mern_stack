const express = require('express');
const { getAllProducts, createProduct, findProduct, updateProduct, deleteProduct } = require('../controllers/product');

const router = express.Router();

router.route('/products').get(getAllProducts).post(createProduct);
router.route('/product/:id').get(findProduct).delete(deleteProduct).put(updateProduct);

module.exports = router;
