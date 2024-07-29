const dotenv = require("dotenv");
const moment = require("moment");
const indianHolidays = require("../utils/indianHolidays");
const fs = require("fs");

dotenv.config();

const calculateValidDays = (fromDate, toDate) => {
  const start = moment(fromDate);
  const end = moment(toDate);
  let validDays = 0;
  const validdates = [];

  while (start <= end) {
    const dayOfWeek = start.day();
    const formattedDate = start.format("YYYY-MM-DD");

    if (dayOfWeek !== 0 && !indianHolidays.includes(formattedDate)) {
      validDays += 1;
      validdates.push(formattedDate);
    }

    start.add(1, "days");
  }
  
  fs.writeFile("./validDates.txt", validdates.join("\n"), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Valid dates logged in validDates.txt");
    }
  });
  
  return { validDays, validdates };
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

const calculateNumberofClassesperSubject = (timetableResponse, validDates) => {
  const subjectCounts = {};

  validDates.forEach(date => {
    const dayOfWeek = moment(date).format('dddd');
    const schedule = timetableResponse.schedule[dayOfWeek];

    if (schedule) {
      schedule.forEach(class_ => {
        const subject = class_.subject;
        subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
      });
    }
  });

  return subjectCounts;
};

const calculateNumberofClassesperSubjectforpercentage = (subjectCounts,attendancePercentage) => {
  const subjectCountsforpercentage = {};
  for (const [subject, count] of Object.entries(subjectCounts)) {
    subjectCountsforpercentage[subject] = Math.ceil(count * (attendancePercentage / 100));
  }
  return subjectCountsforpercentage;
};

const analysisGeneration = async (
  timetableResponse,
  fromDate,
  toDate,
  attendancePercentage
) => {
  try {
    // Parse the timetableResponse if it's a string
    if (typeof timetableResponse === "string") {
      timetableResponse = JSON.parse(timetableResponse);
    }

    const { validDays, validdates } = calculateValidDays(fromDate, toDate);

    const daysNeededToAttend = calculateDaysNeededToAttend(
      validDays,
      attendancePercentage
    );
    console.log("Days Needed to Attend:", daysNeededToAttend);

    const daysCanSkip = calculateDaysCanSkip(validDays, attendancePercentage);
    console.log("Days Can Skip:", daysCanSkip);

    const subjectwiseclasses = calculateNumberofClassesperSubject(
      timetableResponse,
      validdates
    );

    const subjectwiseclassesforpercentage = calculateNumberofClassesperSubjectforpercentage(subjectwiseclasses,attendancePercentage);

    console.log("Subject wise classes:", subjectwiseclasses);
    return {
      daysNeededToAttend,
      daysCanSkip,
      subjectwiseclasses,
      subjectwiseclassesforpercentage,
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

module.exports = { analysisGeneration };