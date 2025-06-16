const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { attendanceManagementAdvisor } = require("../crud/Ai_chat");

// Middleware
dotenv.config();


// Create an endpoint to get attendance management advice
router.post('/attendance-management-advice', async (req, res) => {
  const { data, question } = req.body;

  try {
    const advice = await attendanceManagementAdvisor(data, question);
    res.status(200).json(advice);
  } catch (e) {
    console.error('Error getting attendance management advice:', e);
    res.status(500).send('Error getting attendance management advice');
  }
});

module.exports = router;
