const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const coursRoutes = require('./routes/coursRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/', coursRoutes);

const PORT = process.env.PORT_COURS || 5001;

app.listen(PORT, () => {
    console.log(`Cours Service running on port ${PORT}`);
});
