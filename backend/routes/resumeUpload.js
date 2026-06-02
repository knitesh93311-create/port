// routes/resumeUpload.js
const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const fs = require('fs');
const path = require('path');

// @route POST /api/portfolio/resume
// @desc Upload resume PDF (base64) and update portfolio resumeUrl
router.post('/resume', async (req, res) => {
  try {
    const { data, filename } = req.body; // base64 string and filename
    if (!data || !filename) {
      return res.status(400).json({ msg: 'Missing data or filename' });
    }
    // Decode base64
    const matches = data.match(/^data:application\/pdf;base64,(.+)$/);
    const base64 = matches ? matches[1] : data;
    const buffer = Buffer.from(base64, 'base64');
    // Save file to uploads folder
    const uploadPath = path.join(__dirname, '..', 'uploads', filename);
    fs.writeFileSync(uploadPath, buffer);
    // Update portfolio document
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    portfolio.personalInfo.resumeUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/uploads/${filename}`;
    await portfolio.save();
    res.json({ resumeUrl: portfolio.personalInfo.resumeUrl, msg: 'Resume uploaded' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
