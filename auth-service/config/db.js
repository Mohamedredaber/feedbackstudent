const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGO_URI || process.env.MONGO_URI_AUTH;

    if (!dbUrl) {
      throw new Error("Database URL is not defined in environment variables");
    }

    const conn = await mongoose.connect(dbUrl);
    console.log(`Auth DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to Auth DB: ${error.message}`);
  }
};

module.exports = connectDB;
