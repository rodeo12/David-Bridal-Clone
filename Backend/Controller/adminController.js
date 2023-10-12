const Admin = require('../Model/adminmodel');
const bcrypt = require('bcryptjs')  
const jwt = require('jsonwebtoken'); 
const config = require('../config');
const bodyParser = require('body-parser');
const express = require('express') ;
const app = express();

app.use(bodyParser.json());
// Create a new admin
exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password)
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      password:hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin by email
    const admin = await Admin.findOne({ email });
    // Check if the admin exists
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    // Compare the provided password with the stored hash 
    // console.log(password,admin.password,typeof(password),typeof(admin.password))
    const isPasswordValid = await bcrypt.compare(password, admin.password);
  //  console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate and send a JWT token
    const token = jwt.sign({ adminId: admin._id }, 'david', {
      expiresIn: '1h', // Token expiration time
    });

    res.status(200).json({ message: "Admin Login Successfull",token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 


exports.logoutAdmin = (req, res) => {
  try {
    // If you are using sessions for authentication, you can clear the session data as follows:
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error during logout' });
      } else {
        res.status(200).json({ message: 'Admin logged out successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 