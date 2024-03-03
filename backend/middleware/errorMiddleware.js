const ErrorHandler = require('../util/errorHandler');
module.exports = (err, req, res, next) => {
  err.message = err.message || 'Internal Server Error';
  err.statusCode = err.statusCode || 500;

  if (err.name === 'CastError') {
    const message = `Resource not found: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = ` ${Object.keys(err.keyValue)} already exists`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 'JsonWebTokenError') {
    const message = 'Json web token is invalid!';
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 'TokenExpiredError') {
    const message = 'Json web token is expired!';
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({ success: false, message: err.message });
};
