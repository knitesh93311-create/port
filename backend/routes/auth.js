const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST /api/auth/login
// @desc    Authenticate admin & return token
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.value || req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Find user in database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid administrator credentials' });
    }

    // Match password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid administrator credentials' });
    }

    // Sign JWT
    const payload = { id: user._id, username: user.username };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token: `Bearer ${token}`,
          user: { id: user._id, username: user.username }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
