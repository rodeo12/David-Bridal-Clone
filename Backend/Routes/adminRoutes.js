const express = require('express');
const router = express.Router();
const adminController = require('../Controller/adminController');

// Create a new admin
router.post('/', adminController.createAdmin);

// Get all admins
router.get('/', adminController.getAllAdmins);  

router.post('/login',adminController.loginAdmin) 

router.post('/logout',adminController.logoutAdmin) 

// Add more admin-related routes (e.g., update admin details, delete admin).

module.exports = router;
