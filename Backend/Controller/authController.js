const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const bodyParser = require('body-parser');
const express = require('express') 
const app = express();
const User = require('../Model/usermodel');
const config = require('../config');
const tokens = new Set(); 

app.use(bodyParser.json());
// User Registration
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate and send a JWT token
    const token = jwt.sign({ userId: user._id }, 'david', {
      expiresIn: '1h',
    });
    // req.headers.authorization = token; 
    // console.log(req.headers.authorization) 
    res.header('Authorization', `Bearer ${token}`);

  // Store the token in our temporary storage (In production, store in a database)
  tokens.add(token);
    res.status(200).json({message:"user login success", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 

exports.logoutUser = (req, res) => {
  try {
    
    const token = req.header('Authorization');
    console.log(token) 
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const tokenValue = token.split('Bearer ')[1];

  // Check if the token exists in our storage
  if (tokens.has(tokenValue)) {
    // Remove the token from storage
    tokens.delete(tokenValue);
    return res.status(200).json({ message: 'Logout successful' });
  } else {
    return res.status(401).json({ message: 'Invalid token' });
  }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 
