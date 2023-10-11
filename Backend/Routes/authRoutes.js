const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');

// User Registration
router.post('/signup', authController.registerUser);

// User Login
router.post('/login', authController.loginUser);

router.post('/logout', authController.logoutUser) ; 
// Add more authentication-related routes as needed (e.g., logout, password reset).

module.exports = router;
