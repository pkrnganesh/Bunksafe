const { CohereClient } = require("cohere-ai");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const moment = require("moment");
const indianHolidays = require("../utils/indianHolidays");

dotenv.config();

// Initialize Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const calculateValidDays = (fromDate, toDate) => {
  const start = moment(fromDate);
  const end = moment(toDate);
  let validDays = 0;

  while (start <= end) {
    const dayOfWeek = start.day();
    const formattedDate = start.format("YYYY-MM-DD");

    if (dayOfWeek !== 0 && !indianHolidays.includes(formattedDate)) {
      validDays += 1;
    }

    start.add(1, "days");
  }

  return validDays;
};

const calculateDaysNeededToAttend = (validDays, attendancePercentage) => {
  const requiredAttendance = attendancePercentage / 100;
  const daysNeededToAttend = Math.ceil(validDays * requiredAttendance);
  return daysNeededToAttend;
};

const calculateDaysCanSkip = (validDays, attendancePercentage) => {
  const daysNeededToAttend = calculateDaysNeededToAttend(
    validDays,
    attendancePercentage
  );
  const daysCanSkip = validDays - daysNeededToAttend;
  return daysCanSkip;
};

const calculateSubjectAttendance = (
  timetableData,
  validDays,
  attendancePercentage
) => {
  const daysNeededToAttend = calculateDaysNeededToAttend(
    validDays,
    attendancePercentage
  );
  const subjectAttendance = {};

  // Initialize attendance counts for each subject
  for (const day in timetableData.schedule) {
    for (const classInfo of timetableData.schedule[day]) {
      if (!subjectAttendance[classInfo.subject]) {
        subjectAttendance[classInfo.subject] = {
          totalClasses: 0,
          classesToAttend: 0,
          classesToSkip: 0,
        };
      }
      subjectAttendance[classInfo.subject].totalClasses += 1;
    }
  }

  let attendedClasses = 0;
  const allClasses = Object.values(timetableData.schedule).flat();

  for (const classInfo of allClasses) {
    if (attendedClasses < daysNeededToAttend) {
      subjectAttendance[classInfo.subject].classesToAttend += 1;
      attendedClasses += 1;
    } else {
      subjectAttendance[classInfo.subject].classesToSkip += 1;
    }
  }

  return subjectAttendance;
};

const analysisGeneration = async (
  timetableData,
  fromDate,
  toDate,
  attendancePercentage
) => {
  try {
    console.log("Input Data:", { timetableData, fromDate, toDate, attendancePercentage });

    // Parse the timetableData if it's a string
    if (typeof timetableData === "string") {
      timetableData = JSON.parse(timetableData);
    }

    const validDays = calculateValidDays(fromDate, toDate);
    console.log("Valid Days:", validDays);

    const daysNeededToAttend = calculateDaysNeededToAttend(
      validDays,
      attendancePercentage
    );
    console.log("Days Needed to Attend:", daysNeededToAttend);

    const daysCanSkip = calculateDaysCanSkip(validDays, attendancePercentage);
    console.log("Days Can Skip:", daysCanSkip);

    const subjectAttendance = await calculateSubjectAttendanceWithAI(
      timetableData,
      validDays,
      attendancePercentage,
      daysNeededToAttend,
      daysCanSkip
    );

    return {
      daysNeededToAttend,
      daysCanSkip,
      subjectAttendance
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      error: "Error generating attendance analysis",
      message: error.message,
      rawResponse: error.rawResponse || null,
    };
  }
};

const calculateSubjectAttendanceWithAI = async (
  timetableData,
  validDays,
  attendancePercentage,
  daysNeededToAttend,
  daysCanSkip
) => {
  const prompt = `
Analyze the following timetable data:
${JSON.stringify(timetableData.schedule, null, 2)}

Given:
- Total valid working days: ${validDays}
- Required attendance percentage: ${attendancePercentage}%
- Days needed to attend: ${daysNeededToAttend}
- Days that can be skipped: ${daysCanSkip}

Task:
1. Calculate the total number of classes for each subject.
2. Determine how many classes should be attended for each subject to meet the attendance requirement.
3. Calculate how many classes can be skipped for each subject.

Provide the results in the following JSON format:
{
  "subjectName": {
    "totalClasses": number,
    "classesToAttend": number,
    "classesToSkip": number
  },
  ...
}

Ensure that the sum of classesToAttend across all subjects equals ${daysNeededToAttend},
and the sum of classesToSkip equals ${daysCanSkip}.
`;

  const response = await cohere.generate({
    model: "command",
    prompt: prompt,
    max_tokens: 2500,
    temperature: 0.1,
  });

  let subjectAttendance;
  try {
    subjectAttendance = JSON.parse(response.generations[0].text);
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
    console.log("Raw response:", response.generations[0].text);
    throw new Error("Unable to extract valid JSON from the response");
  }

  return subjectAttendance;
};

module.exports = { analysisGeneration };