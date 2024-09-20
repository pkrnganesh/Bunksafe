const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const memoryCache = new Map(); // In-memory cache
const cacheExpiration = 3600000; // 1 hour in milliseconds

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.inference.ai.azure.com"; // Replace with your actual endpoint
const modelName = "gpt-4o"; // Ensure that the model is correctly set

const processText = async (extractedText) => {
  const truncatedText = extractedText.slice(0, 1000); // Adjust as needed
  const cacheKey = `processText-${truncatedText}`;

  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  const body = JSON.stringify({
    prompt: `Extract timetable information from the following text and format it as valid JSON:

${truncatedText}

Format the output as a JSON object with this structure:
{
  "schedule": {
    "Monday": [{"subject": "" }],
    "Tuesday": [{"subject": "" }],
    "Wednesday": [{"subject": "" }],
    "Thursday": [{"subject": "" }],
    "Friday": [{"subject": "" }],
    "Saturday": [{"subject": "" }]
  }
}

Ensure your response contains ONLY the JSON object. Do not include any explanations or additional text.`,
    max_tokens: 1000,
    temperature: 0.3,
  });

  const response = await fetch(`${endpoint}/v1/models/${modelName}/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error(`Error with status ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  const generatedText = data.choices[0].text; // Adjust based on response structure

  const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    const jsonString = jsonMatch[0];
    try {
      const parsedResponse = JSON.parse(jsonString);
      memoryCache.set(cacheKey, parsedResponse, cacheExpiration);
      return parsedResponse;
    } catch (jsonError) {
      throw new Error("Failed to parse JSON from the response");
    }
  } else {
    throw new Error("No valid JSON found in the response");
  }
};

function reScheduling(input) {
  let parsedResponse;
  const timetableResponse = input.timetableResponse || input;
  
  parsedResponse = typeof timetableResponse === 'string' 
    ? JSON.parse(timetableResponse) 
    : timetableResponse;

  const schedule = parsedResponse.schedule;

  const allSubjects = new Set(
    Object.values(schedule).flatMap(day => day.map(subject => subject.subject))
  );

  const dailySubjects = [...allSubjects].filter(subject =>
    Object.values(schedule).every(day =>
      day.some(item => item.subject === subject)
    )
  );

  for (const day in schedule) {
    schedule[day] = schedule[day].filter(subject =>
      !dailySubjects.includes(subject.subject)
    );
  }

  return schedule;
}

module.exports = { processText, reScheduling };
