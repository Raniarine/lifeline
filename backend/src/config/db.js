const mongoose = require('mongoose');

async function connectDB() {
  const mongoUri = String(process.env.MONGO_URI || '').trim();

  if (!mongoUri) {
    throw new Error(
      'MONGO_URI is not set. Add it to backend/.env before starting the LifeLine API.'
    );
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
    return mongoose.connection;
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
}

module.exports = connectDB;
