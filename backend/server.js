require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const User = require('./models/User');
const resumeUploadRouter = require('./routes/resumeUpload');

const app = express();



// Middleware
app.use(cors({
  origin: '*', // Allow all origins for portfolio integrations
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve Uploaded Files Statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Server is running successfully' });
});

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/portfolio', resumeUploadRouter);
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/upload', require('./routes/upload'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Something broke on the server!', error: err.message });
});

// Auto-seed Default Administrator User if empty
const seedAdmin = async () => {
  try {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const count = await User.countDocuments();
    if (count === 0) {
      const defaultAdmin = new User({
        username: adminUsername,
        password: adminPassword // Plain password, schema pre-save hook will hash it automatically!
      });
      await defaultAdmin.save();
      console.log(`Default administrator user seeded! Username: "${adminUsername}"`);
    }
  } catch (err) {
    console.error(`Admin Seeding Failed: ${err.message}`);
  }
};

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  await seedAdmin();
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};
start();

