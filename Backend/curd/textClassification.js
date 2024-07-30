const { CohereClient } = require("cohere-ai");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const ClassificationText = async (dayCountsString, timetableResponse) => {
  const response = await cohere.generate({
    model: 'command-xlarge-nightly',
    prompt: `Given the following timetable and day counts:

Timetable: ${JSON.stringify(timetableResponse)}
Day Counts: ${dayCountsString}

Calculate the total number of classes for each subject across the entire schedule, considering the number of occurrences of each day. Follow these steps:

1. For each subject, count its occurrences on each day of the week.
2. Multiply the count for each day by the corresponding number of occurrences of that day from the day counts.
3. Sum up the results for each subject across all days.

Present the results in JSON format, like this:
{
  "SUBJECT_NAME": TOTAL_CLASS_COUNT,
  ...
}`,
    max_tokens: 1000,
    temperature: 0.1,
    k: 0,
    stop_sequences: [],
    return_likelihoods: 'NONE'
  });

  const classifiedText = response.generations[0].text;
  console.log("Raw classified text:", classifiedText); 
  try {
    const jsonMatch = classifiedText.match(/```json\n([\s\S]*?)```/);
    if (jsonMatch && jsonMatch[1]) {
      const jsonString = jsonMatch[1].trim();
      const parsedResult = JSON.parse(jsonString);
      return parsedResult;
    } else {
      console.error("No JSON found in the response");
      return {};
    }
  } catch (error) {
    console.error("Error parsing the result:", error);
    return {};
  }

};

module.exports = { ClassificationText };
