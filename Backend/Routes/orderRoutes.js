const express = require('express');
const router = express.Router();
const orderController = require('../Controller/orderController');

// Create a new order
router.post('/', orderController.createOrder);

// Get all orders
router.get('/', orderController.getAllOrders);

// Add more order-related routes (e.g., get order details, update order status).

module.exports = router;
