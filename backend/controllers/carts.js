const cartsModel = require('../models/carts');
const Products = require('../models/products');
const ErrorHandler = require('../util/errorHandler');

exports.getCart = async (req, res, next) => {
  try {
    const user = req.user;
    const carts = await cartsModel.find({ user: user._id });
    if (carts) {
      const products = [];
      for (let i = 0; i < carts.length; i++) {
        const product = await Products.findById(carts[i].product);
        products.push(product);
      }
      res.status(200).json({ status: true, products });
    } else {
      next(new ErrorHandler('cart is empty', 404));
    }
  } catch (error) {
    next(error);
  }
};
exports.addProductsInCart = async (req, res, next) => {
  const { productId } = req.body;
  try {
    const isCartExist = await cartsModel.findOne({ product: productId });

    if (isCartExist) {
      next(new ErrorHandler('product is already in cart', 400));
    } else {
      const cart = await cartsModel.create({ user: req.user._id, product: productId });
      res.status(200).json({ status: true, cart });
    }
  } catch (error) {
    next(error);
  }
};
exports.deleteCart = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const cart = await cartsModel.deleteOne({ product: productId });
    if (cart) {
      res.status(200).json({ status: true, message: 'cart is deleted' });
    } else {
      next(new ErrorHandler('failed to delete cart', 400));
    }
  } catch (error) {
    next(error);
  }
};
