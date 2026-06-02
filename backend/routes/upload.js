const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const auth = require('../middleware/auth');

// Multer Config with Memory Storage (no files written to disk)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (jpeg, jpg, png, gif) and PDFs are allowed'));
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Configure Cloudinary if keys are available
const isCloudinaryConfigured = () => {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

// @route   POST /api/upload
// @desc    Upload image or document file (returns URL or Base64 URI)
// @access  Private
router.post('/', auth, (req, res, next) => {
  // Wrap upload in custom handler to catch multer errors
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }
    next();
  });
}, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  try {
    if (isCloudinaryConfigured()) {
      // Upload to Cloudinary via upload stream
      const uploadStream = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: req.file.mimetype === 'application/pdf' ? 'raw' : 'image',
              folder: 'portfolio'
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });
      };

      const result = await uploadStream();
      return res.json({ url: result.secure_url });
    } else {
      // Fallback: Convert to Base64 data URI
      const base64Data = req.file.buffer.toString('base64');
      const fileUrl = `data:${req.file.mimetype};base64,${base64Data}`;
      return res.json({ url: fileUrl });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Upload failed', error: err.message });
  }
});

module.exports = router;
