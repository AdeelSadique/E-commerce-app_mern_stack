const userModel = require('../models/userModel');
const ErrorHandler = require('../util/errorHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cookie = require('cookie-parser');
const { sendMail } = require('../util/sendMail');

exports.register = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      next(new ErrorHandler('password must be same', 400));
    }
    const user = await userModel.create(req.body);
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWTSECRETKEY);
      const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 + 6 * 1000),
      };

      // cookie setted for 6 hour
      res
        .status(200)
        .cookie('token', token, { ...cookieOptions })
        .json({ success: true, token });
    } else {
      next(new ErrorHandler('User Registeration Failed', 400));
    }
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      next(new ErrorHandler('Invalid Email & Password', 401));
    } else {
      const user = await userModel.findOne({ email }).select('+password');

      if (!user) {
        next(new ErrorHandler('Invalid Email & Password', 401));
      } else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          next(new ErrorHandler('Invalid Email & Password', 401));
        } else {
          const token = jwt.sign({ id: user._id }, process.env.JWTSECRETKEY);
          const cookieOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 + 6 * 1000),
            sameSite: 'none',
            domain: process.env.FRONT_URL,
          };

          // cookie setted for 6 hour
          res
            .status(200)
            .cookie('token', token, { ...cookieOptions })
            .json({ success: true, token });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};
exports.getUserDetail = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res
      .cookie('token', null, { expires: new Date(Date.now()), httpOnly: true })
      .status(200)
      .json({
        success: true,
        message: 'logged out',
      });
  } catch (error) {
    next(error);
  }
};
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name && !email) {
      next(new ErrorHandler('Name or Email Required', 400));
    } else {
      await userModel.findByIdAndUpdate({ _id: req.user._id }, { name, email });
      res.status(200).json({
        success: true,
        message: 'Your profile is updated',
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  try {
    if (newPassword !== confirmPassword) {
      next(new ErrorHandler('new and confirm password must be same', 400));
    } else {
      const user = await userModel.findById(req.user._id).select('+password');
      const isPassMatched = await bcrypt.compare(oldPassword, user.password);
      if (!isPassMatched) {
        next(new ErrorHandler('Invalid Password', 400));
      } else {
        user.password = newPassword;
        await user.save();
        res.status(200).json({
          success: true,
          message: 'Your password is updated',
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });
  try {
    // const { token } = req.cookie;
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;

    const message = `Your password reset token is \n\n ${resetUrl}`;
    await sendMail({ email: user.email, subject: 'Apna Store Password Recovery', message });

    res.status(200).json({
      success: true,
      message: `Email Sent to ${user.email}`,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    next(new ErrorHandler(error.message, 500));
  }
};
exports.resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await userModel.findOne({ passwordResetToken, passwordResetTokenExpiry: { $gt: Date.now() } });
  try {
    if (!user) {
      next(new ErrorHandler('Token is Invalid or Expired', 400));
    }
    if (newPassword !== confirmPassword) {
      next(new ErrorHandler('password and confirm password is not matched ', 400));
    }
    user.password = newPassword;
    await user.save();
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;

    res.status(200).json({
      success: true,
      message: 'You password is successfully updated',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    next(new ErrorHandler(error.message, 500));
  }
};
