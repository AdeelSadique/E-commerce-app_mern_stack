const Product = require('../models/products');
const ErrorHandler = require('../util/errorHandler');
const ApiFeatures = require('../util/apiFeatures');
const userModel = require('../models/userModel');
const path = require('path');
const multer = require('multer');
const { cloudinaryFileUploader } = require('../util/cloudinary');

// getAllProducts model
exports.getAllProducts = async (req, res, next) => {
  try {
    // 10 products per page
    const productPerPage = 8;
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(productPerPage);
    const products = await apiFeatures.query;
    const productCounts = await Product.countDocuments();
    if (products) {
      res.status(200).json({ success: true, products, productCounts });
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
    req.body.user = req.user.id;

    const path1 = req.files[0].path;
    const path2 = req.files[1].path;
    // call the cloudinaryUploader function and pass the path
    const url1 = await cloudinaryFileUploader(path1);
    const url2 = await cloudinaryFileUploader(path2);
    const { name, price, stock, description, category, user } = req.body;
    const product = await Product.create({ name, price, stock, description, category, images: { image1: url1, image2: url2 }, user });
    if (product) {
      product.user = await userModel.findById(product.user);
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
      res.status(200).json({ success: true, product });
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
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (product) {
      res.status(200).json({ success: true, data: 'Product Updated' });
    } else {
      next(new ErrorHandler('Product not found', 404));
    }
  } catch (error) {
    next(error);
  }
};
// user feedback
exports.userFeedback = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const { reviews } = req.body;
      product.reviews.push(reviews);
      product.save({ validateBeforeSave: false });

      res.status(200).json({ success: true, data: 'Thanks for feedback' });
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
