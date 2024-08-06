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

function calculateAttendanceRequirements(input, percentage) {
  const subjectCounts = JSON.parse(input.SubjectCountsdata);
  const requirements = {};
  let totalClasses = 0;

  Object.entries(subjectCounts).forEach(([subject, count]) => {
    totalClasses += count;
    requirements[subject] = {
      total: count,
      asperpercentage: Math.ceil(count * (percentage / 100)),
      minimum40: Math.ceil(count * 0.4),
    };
  });

  const result = {
    subjectRequirements: requirements,
  };

  return result;
}


function distributeAttendance(requirements) {
  const data = JSON.parse(requirements.percentages);
  const { subjectRequirements, overallRequirement } = data;
  
  let remainingClasses = overallRequirement.required75Percent;
  const subjects = Object.keys(subjectRequirements);
  const subjectCount = subjects.length;

  for (const subject of subjects) {
    const subjectData = subjectRequirements[subject];
    subjectData.allocated = subjectData.minimum40;
    remainingClasses -= subjectData.minimum40;
  }

  let totalSpace = 0;
  for (const subject of subjects) {
    totalSpace += subjectRequirements[subject].total - subjectRequirements[subject].allocated;
  }
  if (remainingClasses > 0 && totalSpace > 0) {
    for (const subject of subjects) {
      const subjectData = subjectRequirements[subject];
      const spaceLeft = subjectData.total - subjectData.allocated;
      const share = Math.round((spaceLeft / totalSpace) * remainingClasses);
      const toAllocate = Math.min(share, spaceLeft);
      subjectData.allocated += toAllocate;
      remainingClasses -= toAllocate;
    }
  }

  while (remainingClasses > 0) {
    let distributed = false;
    for (const subject of subjects) {
      const subjectData = subjectRequirements[subject];
      if (subjectData.allocated < subjectData.total) {
        subjectData.allocated++;
        remainingClasses--;
        distributed = true;
        if (remainingClasses === 0) break;
      }
    }
    if (!distributed) break;
  }

  const result = {
    subjectRequirements: {},
    overallRequirement: overallRequirement
  };

  for (const subject of subjects) {
    result.subjectRequirements[subject] = {
      // total: subjectRequirements[subject].total,
      // minimum40: subjectRequirements[subject].minimum40,
      recommended: subjectRequirements[subject].allocated
    };
  }

  return result;
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
};
function createCalendar(subjectRequirementsStr, weeklyScheduleStr, validDatesInputStr) {
  let subjectRequirements, weeklySchedule, validDatesInput, validDates;

    subjectRequirements = JSON.parse(subjectRequirementsStr);
    weeklySchedule = JSON.parse(weeklyScheduleStr);
    validDatesInput = JSON.parse(validDatesInputStr);

    if (validDatesInput && validDatesInput.validdates) {
      validDates = JSON.parse(validDatesInput.validdates);
    } 

  const calendar = {};
  const classesScheduled = {};

  for (const subject in subjectRequirements.subjectRequirements) {
    classesScheduled[subject] = 0;
  }

  validDates.forEach(dateStr => {
    const date = new Date(dateStr);
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    
    if (weeklySchedule[dayOfWeek]) {
      calendar[dateStr] = [];
      
      weeklySchedule[dayOfWeek].forEach(subjectObj => {
        const subject = subjectObj.subject;
        if (subjectRequirements.subjectRequirements[subject] && 
            classesScheduled[subject] < subjectRequirements.subjectRequirements[subject].asperpercentage) {
          calendar[dateStr].push(subject);
          classesScheduled[subject]++;
        }
      });
      
      if (calendar[dateStr].length === 0) {
        delete calendar[dateStr];
      }
    }
  });

  return calendar;
};

module.exports = {countDaysOfWeek,calculateSubjectCounts,calculateValidDays,calculateDaysNeededToAttend,calculateDaysCanSkip,calculateNumberofClassesperSubject,calculateNumberofClassesperSubjectforpercentage,calculateAttendanceRequirements,distributeAttendance,reScheduling,createCalendar };
