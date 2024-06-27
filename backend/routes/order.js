const express = require('express');
const { isAuthenticated, rolesAuthentication } = require('../middleware/auth');
const { placeOrder, myOrders, findOrder, allOrders, updateOrder, chat, updatePayment } = require('../controllers/order');

const router = express.Router();

router.route('/placeOrder/:productId').post(isAuthenticated, placeOrder);
router.route('/myOrders').get(isAuthenticated, myOrders);
router.route('/orderDetails/:orderId').get(isAuthenticated, findOrder);
router.route('/allOrders').get(isAuthenticated, rolesAuthentication('admin'), allOrders);
router.route('/updatePayment/:id').put(isAuthenticated, rolesAuthentication('admin'), updatePayment);
router.route('/chat/:id').put(isAuthenticated, chat);
router.route('/allOrders/:id').put(isAuthenticated, rolesAuthentication('admin'), updateOrder);

module.exports = router;
