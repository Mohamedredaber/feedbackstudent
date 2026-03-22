const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/', authRoutes);

const PORT = process.env.PORT_AUTH || 5005;

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});
