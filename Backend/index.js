const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Processing = require('./controllers/processing');
const user = require('./controllers/incrementUserCount');
const  attendanceManagementAdvisor  = require('./controllers/ai_chat');

// Load environment variables from .env file
dotenv.config();

// Retrieve PORT from environment variables or set a default value
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only these origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  credentials: true // Allow credentials if needed
};

// Use CORS middleware
app.use(cors(corsOptions));

// Increase payload size limit if necessary
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something broke!'
  });
});

// Using the routes
app.use('/process', Processing);
app.use('/user', user);
app.use('/ai', attendanceManagementAdvisor);

// Timeout middleware
app.use((req, res, next) => {
  res.setTimeout(120000, () => {
    console.log('Request has timed out.');
    res.status(408).json({ message: 'Request Timeout' });
  });
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Happy Coding, guys!");
});
