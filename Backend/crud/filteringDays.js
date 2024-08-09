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
  
  return { validdates: JSON.stringify(validdates) };
};


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

module.exports = { calculateValidDays, countDaysOfWeek, calculateDaysNeededToAttend, calculateDaysCanSkip };