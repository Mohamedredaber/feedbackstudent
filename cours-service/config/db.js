const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI_COURS);
        console.log(`Cours DB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to Cours DB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
