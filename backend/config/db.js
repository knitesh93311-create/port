const mongoose = require('mongoose');

const connectDB = async () => {
  const primaryURI = process.env.MONGODB_URI;
  const fallbackURI = 'mongodb://localhost:27017/portfolioDB';

  try {
    console.log('Attempting connection to primary MongoDB...');
    const conn = await mongoose.connect(primaryURI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });
    console.log(`MongoDB Connected (Primary): ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Primary Connection Error: ${error.message}`);
    if (primaryURI !== fallbackURI) {
      try {
        console.log(`Attempting fallback connection to local MongoDB (${fallbackURI})...`);
        const conn = await mongoose.connect(fallbackURI, {
          serverSelectionTimeoutMS: 5000
        });
        console.log(`MongoDB Connected (Fallback/Local): ${conn.connection.host}`);
      } catch (fallbackError) {
        console.error(`MongoDB Fallback Connection Error: ${fallbackError.message}`);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
