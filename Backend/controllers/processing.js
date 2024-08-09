const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const { extractText } = require("../crud/textExtractor");
const { processText ,reScheduling } = require("../crud/textProcessor");
const { ClassificationText } = require("../crud/textClassification");
const {calculateAttendanceRequirements,createCalendar} = require("../crud/AnalysisGeneration");
const { calculateValidDays, countDaysOfWeek } = require("../crud/filteringDays");
const { calculateSubjectCounts } = require("../crud/subjectAnalysis");




// Middleware
router.use(fileUpload());

dotenv.config();

let workflowStatus;


// Route to get the current status
router.get('/status', (req, res) => {
    res.json({ status: workflowStatus });
});

const memoryCache = new Map(); // In-memory cache
const cacheExpiration = 3600000; // 1 hour in milliseconds

// Route to check all functions

router.post('/basicanalysis', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    const file = req.files.file;
    const { percentage, fromDate, toDate } = req.body;
    const filePath = path.resolve(__dirname, '../uploads', file.name);
  
    try {
      const cacheKey = `${filePath}-${fromDate}-${toDate}-${percentage}`;
      if (memoryCache.has(cacheKey)) {
        const cachedResult = memoryCache.get(cacheKey);
        console.log('Serving from cache');
        return res.json(cachedResult);
      }
  
      await file.mv(filePath);
      const extractedText = await extractText(filePath);
      const timetableResponse = await processText(extractedText);
      const DaywiseSubjectsdata = await reScheduling(timetableResponse);
  
      const validdates = calculateValidDays(fromDate, toDate);
      const countDaysOfWeekdata = countDaysOfWeek(validdates);
  
      const SubjectCountsdata = ClassificationText(JSON.stringify(countDaysOfWeekdata), DaywiseSubjectsdata);
      console.log('SubjectCountsdata:', SubjectCountsdata); // Log the SubjectCountsdata for debugging
  
      const AttendanceRequirements = calculateAttendanceRequirements({ SubjectCountsdata }, percentage);
      console.log('AttendanceRequirements:', AttendanceRequirements); // Log the AttendanceRequirements for debugging
  
      const basicdata = createCalendar(AttendanceRequirements, DaywiseSubjectsdata, validdates);
      console.log('Basic Data:', basicdata); // Log the basic data for debugging
  
      memoryCache.set(cacheKey, basicdata, cacheExpiration);
  
      workflowStatus = 'Thanks for waiting, Calendar is ready';
      res.json(basicdata);
    } catch (err) {
      res.status(500).send(`Error: ${err.message}`);
    }
  });


  router.post('/calculateSubjectCounts', async (req, res) => {
    const { countDaysOfWeekdata, DaywiseSubjectsdata } = req.body;

    if (!countDaysOfWeekdata || !DaywiseSubjectsdata) {
        return res.status(400).send('Both countDaysOfWeekdata and DaywiseSubjectsdata are required.');
    }

    try {
        const result = ClassificationText(countDaysOfWeekdata, DaywiseSubjectsdata);
        console.log(JSON.stringify(result, null, 2));
        res.json(result); // Send the result back to the client
    } catch (error) {
        console.error('Error in calculateSubjectCounts:', error);
        res.status(500).send(`Error: ${error.message}`);
    }
});

module.exports = router;
