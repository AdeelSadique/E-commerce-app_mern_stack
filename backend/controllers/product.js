const Product = require('../models/products');
const ErrorHandler = require('../util/errorHandler');

// getAllProducts model
exports.getAllProducts = async (req, res, next) => {
  try {
    const product = await Product.find();
    if (product) {
      res.status(200).json({ success: true, data: product });
    } else {
      next(new ErrorHandler('Products not found', 404));
    }
  } catch (error) {
    next(error);
  }
};

// new product creation
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    if (product) {
      res.status(201).json({ success: true, data: product });
    } else {
      next(new ErrorHandler('Product not added', 400));
    }
  } catch (error) {
    next(error);
  }
};
// find product by id
exports.findProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json({ success: true, data: product });
    } else {
      next(new ErrorHandler('Product not found', 404));
    }
  } catch (error) {
    next(error);
  }
};
// update product
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const response = await Product.updateOne(req.body);
      res.status(200).json({ success: true, data: response });
    } else {
      next(new ErrorHandler('Product not found', 404));
    }
  } catch (error) {
    next(error);
  }
};
// delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const response = await Product.deleteOne(product);
      res.status(200).json({ success: true, data: response });
    } else {
      next(new ErrorHandler('Product not found', 404));
    }
  } catch (error) {
    next(error);
  }
};
