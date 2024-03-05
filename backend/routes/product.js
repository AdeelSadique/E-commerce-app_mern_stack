const express = require('express');
const { getAllProducts, createProduct, findProduct, updateProduct, deleteProduct, userFeedback } = require('../controllers/product');
const { isAuthenticated, rolesAuthentication } = require('../middleware/auth');

const router = express.Router();

router.route('/').get((req, res) => {
  res.end('welcome');
});
router.route('/products').get(getAllProducts).post(isAuthenticated, rolesAuthentication('admin'), createProduct);
router
  .route('/product/:id')
  .get(findProduct)
  .delete(isAuthenticated, rolesAuthentication('admin'), deleteProduct)
  .put(isAuthenticated, rolesAuthentication('admin'), updateProduct);
router
  .route('/product/feedback/:id')

  .post(isAuthenticated, userFeedback);

module.exports = router;
