const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o-mini";

function extractJSONFromResponse(content) {
  const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
  return jsonMatch && jsonMatch[1] ? jsonMatch[1].trim() : content;
}

async function attendanceManagementAdvisor(data, question) {
  try {
    console.log("Initializing OpenAI client...");
    const client = new OpenAI({ baseURL: endpoint, apiKey: token });

    const messages = [
      { role: "system", content: "You are an AI assistant that helps students manage their class attendance based on their schedule and attendance requirements. Analyze the provided data and answer the student's question about improving their attendance management." },
      { role: "user", content: `Data: ${JSON.stringify(data)}\n\nQuestion: ${question}` },
      { role: "user", content: "Please provide a detailed response to the student's question, taking into account the schedule, attendance requirements, and any other relevant information from the provided data. Format your response as a JSON object with the following structure: { \"advice\": \"Your detailed advice here\", \"keyPoints\": [\"Key point 1\", \"Key point 2\", ...], \"subjectSpecificRecommendations\": { \"SubjectName\": \"Recommendation\", ... } }" }
    ];

    console.log("Sending request to OpenAI API...");
    const response = await client.chat.completions.create({
      messages: messages,
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName
    });

    console.log("Received response from OpenAI API.");
    const jsonContent = extractJSONFromResponse(response.choices[0].message.content);

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      throw new Error("Failed to parse AI response");
    }

console.log("Parsed response:", parsedResponse);
    return parsedResponse;

  } catch (err) {
    console.error("Error in attendanceManagementAdvisor:", err);
    throw err;
  }
}

async function main() {
  try {
    const sampleData = { /* your sample data here */ };
    const sampleQuestion = "How can I improve my attendance?";
    const result = await attendanceManagementAdvisor(sampleData, sampleQuestion);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("The sample encountered an error:", err);
  }
}

// Uncomment the following line to run the main function
// main();

module.exports = { attendanceManagementAdvisor };
