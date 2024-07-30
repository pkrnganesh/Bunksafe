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
  
  fs.writeFile("./validDates.json", JSON.stringify(validdates), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Valid dates logged in validDates.txt");
    }
  });
  
  return { validdates: JSON.stringify(validdates) };
};

function calculateSubjectCounts(dayCountsString, timetableResponse) {
  const dayCounts = JSON.parse(dayCountsString);
  const schedule = timetableResponse.schedule;

  const subjectCounts = {};

  Object.entries(schedule).forEach(([day, subjects]) => {
    const dayCount = dayCounts[day];
    subjects.forEach(subjectObj => {
      const subject = subjectObj.subject;
      if (!subjectCounts[subject]) {
        subjectCounts[subject] = 0;
      }
      subjectCounts[subject] += dayCount;
    });
  });

  return subjectCounts;
}

const countDaysOfWeek = (input) => {
  const data = typeof input === 'string' ? JSON.parse(input) : input;
  const validdate = JSON.parse(data.validdates);

  const dayCounts = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  validdate.forEach(dateStr => {
    try {
      const date = new Date(dateStr.trim());
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      const dayName = days[date.getDay()];
      dayCounts[dayName]++;
    } catch (error) {
      console.error(`Error processing date ${dateStr}: ${error.message}`);
    }
  });

  return dayCounts;
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

const calculateNumberofClassesperSubject = (timetableResponse, validdate) => {
  const subjectCounts = {};

  validdate.forEach(date => {
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

function calculateTotalClasses(dayCountsString, timetableResponse) {
  try {
    const parsedDayCounts = JSON.parse(dayCountsString);
    const schedule = parsedDayCounts.schedule;
    const dayCounts = JSON.parse(timetableResponse);

    console.log('Parsed schedule:', schedule);
    console.log('Parsed dayCounts:', dayCounts);

    const subjectTotals = {};

    if (typeof schedule === 'object' && typeof dayCounts === 'object') {
      for (const [day, subjects] of Object.entries(schedule)) {
        const dayCount = parseInt(dayCounts[day], 10);

        console.log(`Processing day: ${day}, dayCount: ${dayCount}`);

        if (!isNaN(dayCount)) {
          subjects.forEach(subjectEntry => {
            const subject = subjectEntry.subject;
            console.log(`Processing subject: ${subject}`);
            if (!(subject in subjectTotals)) {
              subjectTotals[subject] = 0;
            }
            subjectTotals[subject] += dayCount;
          });
        }
      }
    } else {
      console.error('schedule or dayCounts is not an object');
    }

    console.log('Final subjectTotals:', subjectTotals);
    return subjectTotals;
  } catch (error) {
    console.error('Error parsing JSON or processing data:', error);
    return {};
  }
};



module.exports = { analysisGeneration,countDaysOfWeek,calculateSubjectCounts,calculateValidDays,calculateDaysNeededToAttend,calculateDaysCanSkip,calculateNumberofClassesperSubject,calculateNumberofClassesperSubjectforpercentage,calculateTotalClasses };