const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { incrementUserCount } = require("../config/firebase");

// Create an endpoint to increment the count
router.get('/increment-count', async (req, res) => {
  try {
    const newCount = await incrementUserCount();
    res.status(200).send(`Count incremented to: ${newCount}`);
  } catch (e) {
    console.error('Error incrementing count:', e);
    res.status(500).send('Error incrementing count');
  }
});

// Middleware
dotenv.config();

module.exports = router;
