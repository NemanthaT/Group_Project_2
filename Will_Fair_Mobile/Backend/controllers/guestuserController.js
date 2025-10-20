// Guest User Controller
const guestuserModel = require('../models/guestuserModel');
const bcrypt = require('bcrypt');

// Register new guest user
exports.registerGuestUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Validate required fields
    if (!username || !email || !phone || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required (username, email, phone, password)' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid email format' 
      });
    }

    // Validate phone format (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ 
        success: false,
        message: 'Phone number must be 10 digits' 
      });
    }

    // Validate username length
    if (username.trim().length < 3) {
      return res.status(400).json({ 
        success: false,
        message: 'Username must be at least 3 characters' 
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters' 
      });
    }

    // Create guest user
    const result = await guestuserModel.createGuestUser(username, email, phone, password);
    
    res.status(201).json({ 
      success: true,
      ...result 
    });
  } catch (error) {
    console.error('Guest user registration error:', error);
    
    // Handle specific errors
    if (error.message === 'Email already registered') {
      return res.status(409).json({ 
        success: false,
        message: 'Email already registered' 
      });
    }
    if (error.message === 'Username already taken') {
      return res.status(409).json({ 
        success: false,
        message: 'Username already taken' 
      });
    }
    if (error.message === 'Phone number already registered') {
      return res.status(409).json({ 
        success: false,
        message: 'Phone number already registered' 
      });
    }

    res.status(500).json({ 
      success: false,
      message: 'Server error during registration', 
      error: error.message 
    });
  }
};

// Login guest user
exports.loginGuestUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    // Get user by email
    const user = await guestuserModel.getGuestUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Login successful - return user data (excluding password)
    res.status(200).json({ 
      success: true,
      message: 'Login successful',
      user: {
        guestuser_id: user.guestuser_id,
        username: user.username,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Guest user login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login', 
      error: error.message 
    });
  }
};
