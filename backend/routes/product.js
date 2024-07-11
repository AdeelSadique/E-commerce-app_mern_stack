const express = require('express');
const { getAllProducts, createProduct, findProduct, updateProduct, deleteProduct, userFeedback, getAllStock } = require('../controllers/product');
const { isAuthenticated, rolesAuthentication } = require('../middleware/auth');
const path = require('path');
const multer = require('multer');
const process = require('process');
const router = express.Router();

// logic to handle images while uploading
const uploadpath = path.join(__dirname, '/public');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadpath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage }).array('images', 2);

router.route('/products').get(getAllProducts).post(isAuthenticated, rolesAuthentication('admin'), upload, createProduct);
router.route('/products-getAllStock').get(isAuthenticated, rolesAuthentication('admin'), getAllStock);
router
  .route('/product/:id')
  .get(findProduct)
  .delete(isAuthenticated, rolesAuthentication('admin'), deleteProduct)
  .put(isAuthenticated, rolesAuthentication('admin'), updateProduct);
router
  .route('/product/feedback/:id')

  .post(isAuthenticated, userFeedback);

module.exports = router;
