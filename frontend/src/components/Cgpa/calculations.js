export const gradeScales = {
    3: { A: 3, B: 2, C: 1, F: 0 },
    5: { A: 5, B: 4, C: 3, D: 2, F: 0 },
    10: { 'A+': 10, A: 9, 'A-': 8, 'B+': 7, B: 6, 'B-': 5, 'C+': 4, C: 3, 'C-': 2, D: 1, F: 0 },
  };
  
  export const calculateCGPA = (subjects, gradeScale) => {
    const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
    const totalGradePoints = subjects.reduce((sum, subject) => sum + gradeScales[gradeScale][subject.grade] * subject.credits, 0);
    return totalCredits === 0 ? 0 : totalGradePoints / totalCredits;
  };
  
  export const calculateSGPAtoCGPA = (prevCGPA, prevCredits, currSGPA, currCredits) => {
    const values = [prevCGPA, prevCredits, currSGPA, currCredits].map(parseFloat);
    if (values.some(isNaN)) {
      return { success: false, message: 'Please enter valid numbers' };
    }
    const [prevCGPANum, prevCreditsNum, currSGPANum, currCreditsNum] = values;
    const newCGPA = (prevCGPANum * prevCreditsNum + currSGPANum * currCreditsNum) / (prevCreditsNum + currCreditsNum);
    return { success: true, cgpa: newCGPA };
  };
  
  export const calculateMarksPercentage = (totalMarks, obtainedMarks) => {
    const total = parseFloat(totalMarks);
    const obtained = parseFloat(obtainedMarks);
    if (isNaN(total) || isNaN(obtained)) {
      return { success: false, message: 'Please enter valid numbers' };
    }
    const percentage = (obtained / total) * 100;
    return { success: true, percentage };
  };
  