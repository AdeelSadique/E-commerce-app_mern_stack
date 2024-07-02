const userModel = require('../models/userModel');
const ErrorHandler = require('../util/errorHandler');

const jwt = require('jsonwebtoken');
// const cookie = require('cookie-parser');
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log('backend cookie', token);
  if (!token) {
    next(new ErrorHandler('Authorized users only can access', 401));
  } else {
    const decodedUser = jwt.verify(token, process.env.JWTSECRETKEY);
    req.user = await userModel.findById(decodedUser.id);
    next();
  }
};

exports.rolesAuthentication = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        next(new ErrorHandler('Admin only can access', 403));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
