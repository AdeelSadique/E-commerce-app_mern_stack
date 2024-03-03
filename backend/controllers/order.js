const orderModel = require('../models/order');
const productModel = require('../models/products');
const ErrorHandler = require('../util/errorHandler');

exports.placeOrder = async (req, res, next) => {
  const { productId } = req.params;
  const user = req.user._id;
  const { name, email, contact, address, shippingCost, paymentMethod, quantity } = req.body;
  try {
    const order = await orderModel.create({ product: productId, user, name, email, contact, address, shippingCost, paymentMethod, quantity });

    if (!order) {
      next(new ErrorHandler('order is not placed Try again!', 400));
    } else {
      res.status(200).json({ status: true, order });
    }
  } catch (error) {
    next(error);
  }
};

exports.myOrders = async (req, res, next) => {
  try {
    const user = req.user._id;

    const orders = await orderModel.find({ user });

    if (!orders) {
      next(new ErrorHandler('You have not placed any order', 404));
    } else {
      for (let i = 0; i < orders.length; i++) {
        const product = await productModel.findById(orders[i].product);
        orders[i].user = req.user;
        orders[i].product = product;
      }
      res.status(200).json({ status: true, orders });
    }
  } catch (error) {
    next(error);
  }
};
exports.findOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await orderModel.findById(orderId);
    order.user = req.user;
    const p = await productModel.findById(order.product);
    order.product = p;

    if (!order) {
      next(new ErrorHandler('You have not placed any order', 404));
    } else {
      res.status(200).json({ status: true, order });
    }
  } catch (error) {
    next(error);
  }
};
exports.allOrders = async (req, res, next) => {
  const { status } = req.query;
  try {
    if (status) {
      const orders = await orderModel.find({ status });
      if (!orders) {
        next(new ErrorHandler('Orders not found', 404));
      } else {
        res.status(200).json({ status: true, orders });
      }
    } else {
      const orders = await orderModel.find();
      if (!orders) {
        next(new ErrorHandler('Orders not found', 404));
      } else {
        res.status(200).json({ status: true, orders });
      }
    }
  } catch (error) {
    next(error);
  }
};
exports.updateOrder = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const findOrder = await orderModel.findById(id);
    if (!findOrder) {
      next(new ErrorHandler('Order not found', 404));
    } else {
      findOrder.status = status;
      findOrder.save();
      res.status(200).json({ status: true, message: 'Order Status is updated' });
    }
  } catch (error) {
    next(error);
  }
};
exports.chat = async (req, res, next) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    const findOrder = await orderModel.findById(id);
    if (!findOrder) {
      next(new ErrorHandler('Order not found', 404));
    } else {
      const chat = { role: req.user.role, time: new Date(Date.now()), message };
      findOrder.chat.push(chat);
      findOrder.save({ validateBeforeSave: false });
      res.status(200).json({ status: true, message: 'message is sent' });
    }
  } catch (error) {
    next(error);
  }
};
