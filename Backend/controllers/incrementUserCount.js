const express = require("express");
const { JSDOM } = require('jsdom');
const router = express.Router();
const dotenv = require("dotenv");
const { incrementUserCount, storeAnonymousData,fetchAnonymousData } = require("../config/firebase");

// Middleware
dotenv.config();

// Create an endpoint to increment the count and save IP address
router.get('/increment-count', async (req, res) => {
  const ipAddress = req.ip; // Capture the IP address of the user

  try {
    const newCount = await incrementUserCount(ipAddress);
    res.status(200).send(`Count incremented to: ${newCount}`);
  } catch (e) {
    console.error('Error incrementing count:', e);
    res.status(500).send('Error incrementing count');
  }
});

// Create an endpoint to store data in the anonymous_store collection
router.post('/storeData', async (req, res) => {
  const { id, dataValue } = req.body; // Destructure id and dataValue from request body

  if (!id || !dataValue) {
    return res.status(400).send('Missing id or dataValue');
  }

  try {
    const data = await storeAnonymousData(id, dataValue);
    res.status(200).send(`Data stored for id: ${id}`);
  } catch (e) {
    console.error('Error storing data:', e);
    res.status(500).send('Error storing data');
  }
});

router.get('/fetchData/:id', async (req, res) => {
  const { id } = req.params; // Get id from URL params

  try {
    const data = await fetchAnonymousData(id);
    res.status(200).json(data); // Return the fetched data as JSON
  } catch (e) {
    console.error('Error fetching data:', e);
    res.status(500).send('Error fetching data');
  }
});


module.exports = router;
