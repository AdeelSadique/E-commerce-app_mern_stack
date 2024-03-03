const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  contact: {
    type: Number,
    required: [true, 'Contact is required'],
    minLength: [11, 'Contact is must be 11 digits'],
    maxLength: [11, 'Contact is must be 11 digits'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
  shippingCost: {
    type: Number,
    required: [true, 'Shipping cost is required'],
  },
  // 0 for processing 1 for shipped 2 for delivered
  status: {
    type: Number,
    default: 0,
  },
  paymentMethod: {
    type: Number,
    required: [true, 'Payment method cost is required'],
    // 0 for cash 1 for easypesa 2 for credit
    default: 0,
  },
  chat: [{ role: { type: String, required: true }, message: { type: String, required: true }, time: { type: Date, required: true } }],
  paidStatus: {
    type: Number,
    required: [true, 'Payment method cost is required'],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('orders', orderSchema);
