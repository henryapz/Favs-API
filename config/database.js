require('dotenv').config();

const mongoose = require('mongoose');

const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env;

async function connectDB() {
  try {
    const connectionURI = NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGODB_URI;
    await mongoose.connect(connectionURI);
    // eslint-disable-next-line no-console
    console.log('Connected to DB', connectionURI);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    process.exit(1);
  }
}

module.exports = connectDB;
