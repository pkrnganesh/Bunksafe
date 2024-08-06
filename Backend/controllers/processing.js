const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const path = require("path");
const dotenv = require("dotenv");
const { extractText } = require("../curd/textExtractor");
const { processText } = require("../curd/textProcessor");
const { ClassificationText } = require("../curd/textClassification");
const { analysisGeneration,countDaysOfWeek,calculateSubjectCounts,calculateValidDays,calculateAttendanceRequirements,distributeAttendance,reScheduling} = require("../curd/AnalysisGeneration");


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

router.post('/reScheduling', async (req, res) => {
    const timetableResponse = req.body;
    const basicdata = await reScheduling(timetableResponse);
    res.json(basicdata);
});

router.post('/calculateValidDays', async (req, res) => {
    const { fromDate, toDate} = req.body;

  
    const basicdata = await calculateValidDays(fromDate, toDate);
    res.json(basicdata);
});

router.post('/countdays', async (req, res) => {
    const { validdates} = req.body;

  
    const basicdata = await countDaysOfWeek(validdates);
    res.json(basicdata);
});

router.post('/calculateSubjectCounts', async (req, res) => {
    const { dayCountsString, rescheduled } = req.body;
    const basicdata = await ClassificationText(dayCountsString, rescheduled);
    res.json(basicdata);
});

router.post('/percentages', async (req, res) => {
    const subjectCounts = req.body;
    const basicdata = await calculateAttendanceRequirements(subjectCounts);
    res.json(basicdata);
});

router.post('/distribution', async (req, res) => {
    const percentages = req.body;
    const basicdata = await distributeAttendance(percentages);
    res.json(basicdata);
});


// router.post('/analyze-attendance', async (req, res) => {
//     const { timetableResponse, fromDate, toDate, attendancePercentage } = req.body;

//     if (!timetableResponse || !fromDate || !toDate || !attendancePercentage) {
//         return res.status(400).json({ error: 'Missing required parameters' });
//     }
//     const basicdata = await analysisGeneration(timetableResponse, fromDate, toDate, attendancePercentage);
//     res.json(basicdata);
// });

router.post('/Basicanalysis', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const { percentage, fromDate, toDate } = req.body;


    const filePath = path.resolve(__dirname, '../uploads', file.name);

    try {
        await file.mv(filePath);
        
        const extractedText = await extractText(filePath);
        
        const timetableResponse = await processText(extractedText);

        const rescheduled = await reScheduling(timetableResponse);

        const validdates = await calculateValidDays(fromDate, toDate);

        const subjectCounts = await ClassificationText(validdates, rescheduled);

        const percentages = await calculateAttendanceRequirements(subjectCounts);

        const distribution = await distributeAttendance(percentages);

        res.json(distribution);
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

module.exports = router;
