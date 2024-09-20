const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const NodeCache = require("node-cache");

// Import custom modules
const { extractText } = require("../crud/textExtractor");
const { processText, reScheduling } = require("../crud/textProcessor");
const { ClassificationText } = require("../crud/textClassification");
const { calculateAttendanceRequirements, createCalendar } = require("../crud/AnalysisGeneration");
const { calculateValidDays, countDaysOfWeek, calculateDaysNeededToAttend, calculateDaysCanSkip } = require("../crud/filteringDays");

router.use(fileUpload());

dotenv.config();

const memoryCache = new NodeCache({ stdTTL: 3600 }); // 1 hour TTL

// Initiate analysis
router.post('/initiate-analysis', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const { percentage, fromDate, toDate } = req.body;

    try {
        const jobId = Date.now().toString();
        memoryCache.set(jobId, { status: 'extracting' });

        // Start the first step
        const extractedText = await extractText(file);
        memoryCache.set(jobId, { status: 'processing', extractedText });

        res.json({ jobId, message: 'Analysis initiated. Use this jobId to continue the process.' });
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

// Continue analysis
router.post('/continue-analysis/:jobId', async (req, res) => {
    const jobId = req.params.jobId;
    const job = memoryCache.get(jobId);

    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    const { percentage, fromDate, toDate } = req.body;

    try {
        switch (job.status) {
            case 'processing':
                const timetableResponse = await processText(job.extractedText);
                const DaywiseSubjectsdata = await reScheduling(timetableResponse);
                memoryCache.set(jobId, { status: 'calculating', timetableResponse, DaywiseSubjectsdata });
                break;

            case 'calculating':
                const validdates = calculateValidDays(fromDate, toDate);
                const countDaysOfWeekdata = countDaysOfWeek(validdates);
                const daysNeededToAttend = calculateDaysNeededToAttend(validdates, percentage);
                const daysCanSkip = calculateDaysCanSkip(validdates, percentage);
                const Totaldays = daysNeededToAttend + daysCanSkip;

                const SubjectCountsdata = ClassificationText(JSON.stringify(countDaysOfWeekdata), job.DaywiseSubjectsdata);
                const AttendanceRequirements = calculateAttendanceRequirements({ SubjectCountsdata }, percentage);

                const basicdata = createCalendar({ AttendanceRequirements, DaywiseSubjectsdata: job.DaywiseSubjectsdata, validdates });

                const result = {
                    Totaldays,
                    daysNeededToAttend,
                    daysCanSkip,
                    timetableResponse: job.timetableResponse,
                    SubjectCountsdata,
                    AttendanceRequirements,
                    basicdata
                };

                memoryCache.set(jobId, { status: 'completed', result });
                break;

            case 'completed':
                return res.json({ status: 'completed', result: job.result });

            default:
                return res.status(400).json({ message: 'Invalid job status' });
        }

        res.json({ status: memoryCache.get(jobId).status });
    } catch (err) {
        memoryCache.set(jobId, { status: 'error', error: err.message });
        res.status(500).send(`Error: ${err.message}`);
    }
});

// Get analysis status
router.get('/analysis-status/:jobId', (req, res) => {
    const jobId = req.params.jobId;
    const job = memoryCache.get(jobId);

    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ status: job.status, result: job.status === 'completed' ? job.result : null });
});

module.exports = router;