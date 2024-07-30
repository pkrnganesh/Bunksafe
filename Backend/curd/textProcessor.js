const { CohereClient } = require("cohere-ai");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const processText = async (extractedText) => {
  const truncatedText = extractedText.slice(0, 1000); // Adjust as needed

  const response = await cohere.generate({
    model: 'command-xlarge-nightly',
    prompt: `Extract timetable information from the following text and format it as valid JSON:

${truncatedText}

Format the output as a JSON object with this structure:
{
  "schedule": {
    "Monday": [{"subject": "" }],
    "Tuesday": [{"subject": ""  }],
    "Wednesday": [{"subject": ""  }],
    "Thursday": [{"subject": "" }],
    "Friday": [{"subject": ""}],
    "Saturday": [{"subject": "" }]
  }
}

Ensure your response contains ONLY the JSON object. Do not include any explanations or additional text.`,
    max_tokens: 1000,
    temperature: 0.3,
    k: 0,
    stop_sequences: [],
    return_likelihoods: 'NONE'
  });

  const generatedText = response.generations[0].text;

  // Attempt to extract and parse the JSON
  const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    const jsonString = jsonMatch[0];
    try {
      return JSON.parse(jsonString);
    } catch (jsonError) {
      throw new Error("Failed to parse JSON from the response");
    }
  } else {
    throw new Error("No valid JSON found in the response");
  }
};

module.exports = { processText };
