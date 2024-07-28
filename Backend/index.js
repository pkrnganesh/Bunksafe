
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Processing = require('./routes/processing');

// Load environment variables from .env file
dotenv.config();

// Retrieve PORT from environment variables or set a default value
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

// Using the routes
app.use('/process', Processing);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});