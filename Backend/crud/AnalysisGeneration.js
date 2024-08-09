const dotenv = require("dotenv");
dotenv.config();



function calculateAttendanceRequirements(input, percentage) {
  const subjectCounts = input.SubjectCountsdata;
  const requirements = {};
  let totalClasses = 0;

  console.log(subjectCounts, percentage);

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
console.log("calculateAttendanceRequirements",result);
  return result;

}

function distributeAttendance(requirements) {
  const data = JSON.parse(requirements.percentages);
  const { subjectRequirements, overallRequirement } = data;
  
  let remainingClasses = overallRequirement.required75Percent;
  const subjects = Object.keys(subjectRequirements);

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
      recommended: subjectRequirements[subject].allocated
    };
  }

  return result;
  console.log("distributeAttendance",result);
};


function createCalendar(subjectRequirementsStr, weeklyScheduleStr, validDatesInputStr) {
  console.log( weeklyScheduleStr, validDatesInputStr);

  let subjectRequirements, weeklySchedule, validDatesInput, validDates;

  // Parse subjectRequirementsStr if it's a JSON string
  if (typeof subjectRequirementsStr === 'string') {
    try {
      subjectRequirements = JSON.parse(subjectRequirementsStr);
    } catch (e) {
      console.error('Error parsing subjectRequirementsStr JSON:', e);
      return {};
    }
  } else {
    subjectRequirements = subjectRequirementsStr;
  }

  // Parse weeklyScheduleStr if it's a JSON string
  if (typeof weeklyScheduleStr === 'string') {
    try {
      weeklySchedule = JSON.parse(weeklyScheduleStr);
    } catch (e) {
      console.error('Error parsing weeklyScheduleStr JSON:', e);
      return {};
    }
  } else {
    weeklySchedule = weeklyScheduleStr;
  }

  // Parse validDatesInputStr if it's a JSON string
  if (typeof validDatesInputStr === 'string') {
    try {
      validDatesInput = JSON.parse(validDatesInputStr);
    } catch (e) {
      console.error('Error parsing validDatesInputStr JSON:', e);
      return {};
    }
  } else {
    validDatesInput = validDatesInputStr;
  }

  // Parse validDates if it exists and is a string
  if (validDatesInput && typeof validDatesInput.validdates === 'string') {
    try {
      validDates = JSON.parse(validDatesInput.validdates);
    } catch (e) {
      console.error('Error parsing validdates JSON:', e);
      return {};
    }
  } else {
    validDates = validDatesInput.validdates;
  }

  const calendar = {};
  const classesScheduled = {};

  // Initialize the class schedule counts
  for (const subject in subjectRequirements.subjectRequirements) {
    classesScheduled[subject] = 0;
  }

  // Process each valid date
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
}

module.exports = {calculateAttendanceRequirements,distributeAttendance,createCalendar };
