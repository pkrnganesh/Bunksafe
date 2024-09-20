const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

// Extract text from image file buffer
const extractTextFromImage = (fileBuffer) => {
    return Tesseract.recognize(
        fileBuffer,
        'eng',
        {}
    ).then(({ data: { text } }) => text);
};

// Extract text from PDF file buffer
const extractTextFromPDF = (fileBuffer) => {
    return pdfParse(fileBuffer).then(data => data.text);
};

// Extract text from DOC file buffer
const extractTextFromDoc = (fileBuffer) => {
    return mammoth.extractRawText({ buffer: fileBuffer })
        .then(result => result.value);
};

const extractText = (file) => {
    const fileExt = file.name.split('.').pop().toLowerCase();
    const fileBuffer = file.data; // Buffer from the uploaded file

    switch (fileExt) {
        case 'jpg':
        case 'jpeg':
        case 'png':
            return extractTextFromImage(fileBuffer);
        case 'pdf':
            return extractTextFromPDF(fileBuffer);
        case 'doc':
        case 'docx':
            return extractTextFromDoc(fileBuffer);
        default:
            return Promise.reject(new Error('Unsupported file type'));
    }
};

module.exports = { extractText };
