const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Name'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter Email'],
    unique: true,
    validate: [validator.isEmail, 'Enter Valid Email'],
  },
  password: {
    type: String,
    required: [true, 'Please Enter Password'],
    maxLength: [20, 'Password should be less than 20 characters'],
    minLength: [8, 'Password should be greater than 8 characters'],
    select: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  passwordResetToken: String,
  passwordResetTokenExpiry: Date,
});

//this function is for password hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
//this function is for password resetting
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetTokenExpiry = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model('users', userSchema);
