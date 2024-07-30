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
    prompt: `Calculate the number of classes for each subject based on the overall data of dayCountsString.
    From the following text ${timetableResponse} and ${dayCountsString} and format it in JSON:

For example:
{
    "subject1": 5,
    "subject2": 4,
    "subject3": 3,
    ...
}
`,
    max_tokens: 1000,
    temperature: 0.1,
    k: 0,
    stop_sequences: [],
    return_likelihoods: 'NONE'
  });

  const classifiedText = response.generations[0].text;
  return classifiedText;

 
};

module.exports = { ClassificationText };
