const express = require('express');
const cors = require('cors');
const { register, login, logout, resetPassword, updateProfile, updatePassword, forgotPassword, getUserDetail } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();
const app = express();
app.use(
  cors({
    credentials: true,
    origin: ['https://e-commerce-app-mern-stack-47dv-9mt3wh0uk-adeelsadiques-projects.vercel.app', 'https://e-commerce-app-mern-stack-47dv.vercel.app', '*'],
  })
);

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(isAuthenticated, getUserDetail);
router.route('/logout').get(isAuthenticated, logout);
router.route('/updateProfile').put(isAuthenticated, updateProfile);
router.route('/updatePassword').put(isAuthenticated, updatePassword);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').put(resetPassword);

module.exports = router;
