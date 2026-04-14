const mongoose = require('mongoose');

async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI is not set. LifeLine API will start without a database connection.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

module.exports = connectDB;
