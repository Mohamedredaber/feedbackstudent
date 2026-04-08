const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGO_URI|| "mongodb://mongodb:27017/coursDB";
    if (!dbUrl) {
      throw new Error("Database URL is not defined in environment variables");
    }
    const conn = await mongoose.connect(dbUrl);
    console.log(`Cours DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to Cours DB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
