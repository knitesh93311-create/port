const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('FATAL: MONGODB_URI environment variable is not set.');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // 10 seconds
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Failed: ${error.message}`);
    console.error(
      'Hint: Make sure your MongoDB Atlas cluster allows connections from 0.0.0.0/0 (all IPs).'
    );
    process.exit(1);
  }
};

module.exports = connectDB;
