const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/', feedbackRoutes);

const PORT = process.env.PORT_FEEDBACK || 5002;

app.listen(PORT, () => {
    console.log(`Feedback Service running on port ${PORT}`);
});
