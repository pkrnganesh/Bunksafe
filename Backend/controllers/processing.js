const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const path = require("path");
const dotenv = require("dotenv");
const NodeCache = require("node-cache");  
const cron = require("node-cron");
const axios = require("axios");

// Import custom modules
const { extractText } = require("../crud/textExtractor");
const { processText, reScheduling } = require("../crud/textProcessor");
const { ClassificationText } = require("../crud/textClassification");
const { calculateAttendanceRequirements, createCalendar } = require("../crud/AnalysisGeneration");
const { calculateValidDays, countDaysOfWeek, calculateDaysNeededToAttend, calculateDaysCanSkip } = require("../crud/filteringDays");

router.use(fileUpload());

dotenv.config();

let workflowStatus = 'Processing';

const memoryCache = new NodeCache({ stdTTL: 3600 });

// Route to get the current status
router.get('/status', (req, res) => {
    res.json({ status: workflowStatus });
});

router.get('/health', (req, res) => {
    res.json("Checking Health");
});

cron.schedule('0 0 * * *', async () => {
    try {
        const apiUrl = process.env.API_URL || 'http://localhost:3000';
        const response = await axios.get(`${apiUrl}/process/health`);
        console.log('Daily Health Check:', response.data);
    } catch (error) {
        console.error('Health check failed:', error.message);
    }
});

// Route to perform basic analysis
router.post('/basicanalysis', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const { percentage, fromDate, toDate } = req.body;

    try {
        const cacheKey = `${file.name}-${fromDate}-${toDate}-${percentage}`;
        if (memoryCache.has(cacheKey)) {
            const cachedResult = memoryCache.get(cacheKey);
            console.log('Serving from cache');
            return res.json(cachedResult);
        }

        // Extract text directly from the file buffer without saving
        const extractedText = await extractText(file);

        const timetableResponse = await processText(extractedText);
        const DaywiseSubjectsdata = await reScheduling(timetableResponse);

        const validdates = calculateValidDays(fromDate, toDate);
        const countDaysOfWeekdata = countDaysOfWeek(validdates);
        const daysNeededToAttend = calculateDaysNeededToAttend(validdates, percentage);
        const daysCanSkip = calculateDaysCanSkip(validdates, percentage);
        const Totaldays = daysNeededToAttend + daysCanSkip;

        const SubjectCountsdata = ClassificationText(JSON.stringify(countDaysOfWeekdata), DaywiseSubjectsdata);
        const AttendanceRequirements = calculateAttendanceRequirements({ SubjectCountsdata }, percentage);

        const basicdata = createCalendar({ AttendanceRequirements, DaywiseSubjectsdata, validdates });

        memoryCache.set(cacheKey, {
            Totaldays,
            daysNeededToAttend,
            daysCanSkip,
            timetableResponse,
            SubjectCountsdata,
            AttendanceRequirements,
            basicdata
        });

        workflowStatus = 'Thanks for waiting, Calendar is ready';
        res.json({
            fromDate, toDate,
            Totaldays,
            daysNeededToAttend,
            daysCanSkip,
            timetableResponse,
            SubjectCountsdata,
            AttendanceRequirements,
            basicdata
        });
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

module.exports = router;
