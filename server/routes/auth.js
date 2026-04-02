const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

// Admin Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Verify password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Create JWT Payload
    const payload = {
      admin: {
        id: admin._id,
        email: admin.email
      }
    };
    
    // Sign Token
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_secret_key_optimal2024',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        
        // Also send token in a secure httpOnly cookie (optional but good practice)
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        
        res.json({
          success: true,
          token,
          admin: {
            id: admin._id,
            email: admin.email,
            name: admin.name
          }
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
});

// Used to verify if a token is still valid
router.get('/verify', require('../middleware/auth'), (req, res) => {
  res.json({ success: true, admin: req.admin });
});

module.exports = router;
