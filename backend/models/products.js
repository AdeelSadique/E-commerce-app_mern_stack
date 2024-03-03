const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter product name'],
  },
  price: {
    required: [true, 'please enter product price'],
    type: Number,
  },
  description: {
    required: [true, 'please enter product description'],
    type: String,
  },
  images: [
    {
      image1: {
        type: String,
        required: true,
      },
      image2: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    required: [true, 'please enter category'],
    type: String,
  },
  stock: {
    required: [true, 'please enter stock'],
    type: Number,
    maxLength: [4, 'stock cannot exceed 4 character'],
    default: 1,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        required: true,
        type: String,
      },
      rating: {
        required: true,
        type: Number,
      },
      comment: {
        required: true,
        type: String,
      },
    },
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

module.exports = mongoose.model('products', productSchema);
