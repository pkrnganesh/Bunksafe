const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const { extractText } = require("../crud/textExtractor");
const { processText } = require("../crud/textProcessor");
const { ClassificationText } = require("../crud/textClassification");
const { countDaysOfWeek,calculateValidDays,calculateAttendanceRequirements,reScheduling,createCalendar} = require("../crud/AnalysisGeneration");


// Middleware
router.use(fileUpload());

dotenv.config();

let workflowStatus;


// Route to get the current status
router.get('/status', (req, res) => {
    res.json({ status: workflowStatus });
});


// Route to handle file uploads 18 ms
router.post('/uploads', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const filePath = path.resolve(__dirname, '../uploads', file.name);

    try {
        await file.mv(filePath);
        res.json({ filePath });
        workflowStatus = 'File uploaded successfully';


    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

// Route to extract text from a file 375ms
router.post('/extractingText', async (req, res) => {
    const { filePath } = req.body;

    if (!filePath) {
        return res.status(400).send('File path is required.');
    }

    try {
        const extractedText = await extractText(filePath);
        workflowStatus = 'Extracting Text';
        res.json({ extractedText });
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

// Route to process extracted text 18.5 s
router.post('/processingText', async (req, res) => {
    const { extractedText } = req.body;

    if (!extractedText) {
        return res.status(400).send('Extracted text is required.');
    }

    try {
        const timetableResponse = await processText(extractedText);
        workflowStatus = 'Processing Text.';
        res.json(timetableResponse);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Error processing chat request',
            message: error.message,
            generated_text: error.generated_text || null,
        });
    }
});

// Route to classify subjects Daywise 43 ms
router.post('/DaywiseSubjects', async (req, res) => {
    const timetableResponse = req.body;

    if (!timetableResponse) {
        return res.status(400).send('Timetable response is required.');
    }

    try {
        const DaywiseSubjectsdata = await reScheduling(timetableResponse);
        res.json(DaywiseSubjectsdata);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Route to calculate valid days 21 ms
router.post('/calculateValidDays', async (req, res) => {
    const { fromDate, toDate } = req.body;

    if (!fromDate || !toDate) {
        return res.status(400).send('Both fromDate and toDate are required.');
    }

    try {
        const validdates = calculateValidDays(fromDate, toDate);
        workflowStatus = 'Calculating Valid days ', validdates;
        res.json(validdates);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Route to count days of week 34 ms
router.post('/countDaysOfWeek', async (req, res) => {
    const { validdates } = req.body;

    if (!validdates) {
        return res.status(400).send('Valid dates are required.');
    }

    try {
        const countDaysOfWeekdata = countDaysOfWeek(validdates);
        res.json(countDaysOfWeekdata);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Route to calculate subject counts 18.89 s
router.post('/calculateSubjectCounts', async (req, res) => {
    const { countDaysOfWeekdata, DaywiseSubjectsdata } = req.body;

    if (!countDaysOfWeekdata || !DaywiseSubjectsdata) {
        return res.status(400).send('Both countDaysOfWeekdata and DaywiseSubjectsdata are required.');
    }

    try {
        const SubjectCountsdata = await ClassificationText(countDaysOfWeekdata, DaywiseSubjectsdata);
        workflowStatus = 'Calculating Subject Counts';
        res.json(SubjectCountsdata);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Route to calculate basic analysis 21 ms
router.post('/percentages', async (req, res) => {
    const { SubjectCountsdata, percentage } = req.body;

    if (!SubjectCountsdata || !percentage) {
        return res.status(400).send('Both SubjectCountsdata and percentage are required.');
    }

    try {
        const AttendanceRequirements = calculateAttendanceRequirements({ SubjectCountsdata }, percentage);
        workflowStatus = 'Calculating Basic Analysis';
        res.json(AttendanceRequirements);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Route to create calendar 67 ms
router.post('/calendar', async (req, res) => {
    const { AttendanceRequirements, DaywiseSubjectsdata, validdates } = req.body;

    if (!AttendanceRequirements || !DaywiseSubjectsdata || !validdates) {
        return res.status(400).send('AttendanceRequirements, DaywiseSubjectsdata, and validdates are required.');
    }

    try {
        const basicdata = createCalendar(AttendanceRequirements, DaywiseSubjectsdata, validdates);
        workflowStatus = 'Thanks for waiting, Calendar is ready';
        res.json(basicdata);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Route to delete a file 23 ms
router.delete('/deleteFile', async (req, res) => {
    const { filePath } = req.body;
    console.log('Received filePath:', filePath); 

    if (!filePath) {
        return res.status(400).send('File path is required.');
    }


    try {
        const resolvedFilePath = path.resolve(__dirname, '../uploads', filePath);
        console.log('Resolved filePath:', resolvedFilePath); // Log the resolved filePath for debugging

        if (fs.existsSync(resolvedFilePath)) {
            fs.unlinkSync(resolvedFilePath);
            res.json({ message: 'File deleted successfully.' });
        } else {
            res.status(404).send('File not found.');
        }
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

module.exports = router;
