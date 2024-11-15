const express = require("express");
const { JSDOM } = require('jsdom');
const router = express.Router();
const dotenv = require("dotenv");
const { fetchAnonymousData } = require("../config/firebase");

// Middleware
dotenv.config();


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fetchAnonymousData(id);

    // Parse the HTML content
    const dom = new JSDOM(data.dataValue);
    const document = dom.window.document;

    // Function to recursively process nodes and preserve formatting
    function processNode(node) {
      if (node.nodeType === dom.window.Node.TEXT_NODE) {
        return node.textContent.trim();
      } else if (node.nodeType === dom.window.Node.ELEMENT_NODE) {
        let content = Array.from(node.childNodes).map(processNode).join('').trim();
        if (node.nodeName === 'P') {
          return content + '\n';
        } else if (node.nodeName === 'STRONG') {
          return `*${content}*`;  // Surround with asterisks to indicate bold
        } else {
          return content;
        }
      }
      return '';
    }

    // Process the body and get formatted content
    let formattedContent = processNode(document.body);

    // Remove excessive newlines
    formattedContent = formattedContent.replace(/\n{3,}/g, '\n\n');

    // Prepare the content for the .txt file
    const fileContent = `ID: ${id}\nData:\n${formattedContent.trim()}`;

    // Set the response headers to force a file download
    res.setHeader('Content-Disposition', `attachment; filename=${id}.txt`);
    res.setHeader('Content-Type', 'text/plain');

    // Send the file content directly
    res.send(fileContent);
  } catch (e) {
    console.error('Error fetching data:', e);
    res.status(500).send('Error fetching data');
  }
});

module.exports = router;
