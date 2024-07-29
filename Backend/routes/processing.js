const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const path = require("path");
const dotenv = require("dotenv");
const { extractText } = require("../curd/textExtractor");
const { processText } = require("../curd/textProcessor");
const { analysisGeneration } = require("../curd/AnalysisGeneration");

// Middleware
router.use(fileUpload());

dotenv.config();

// Route to handle file uploads
router.post('/uploads', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const filePath = path.resolve(__dirname, '../uploads', file.name);

    try {
        await file.mv(filePath);
        const extractedText = await extractText(filePath);
        res.json({ extractedText });
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

// Route to process extracted text
router.post("/processing", async (req, res) => {
  const { extractedText } = req.body;

  try {
    const timetableResponse = await processText(extractedText);
    res.json(timetableResponse);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Error processing chat request",
      message: error.message,
      generated_text: error.generated_text || null,
    });
  }
});

router.post('/analyze-attendance', async (req, res) => {
    const { timetableResponse, fromDate, toDate, attendancePercentage } = req.body;

    if (!timetableResponse || !fromDate || !toDate || !attendancePercentage) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    const basicdata = await analysisGeneration(timetableResponse, fromDate, toDate, attendancePercentage);
    res.json(basicdata);
});


router.post('/Basicanalysis', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const { percentage, fromDate, toDate } = req.body;


    const filePath = path.resolve(__dirname, '../uploads', file.name);

    try {
        // Save the uploaded file
        await file.mv(filePath);
        
        // Extract text from the uploaded file
        const extractedText = await extractText(filePath);
        
        // Process the extracted text along with the additional inputs
        const timetableResponse = await processText(extractedText);
        
        // Respond with the processed timetable response
        const basicdata = await analysisGeneration(timetableResponse, fromDate, toDate, percentage);

        res.json(basicdata);
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

module.exports = router;
