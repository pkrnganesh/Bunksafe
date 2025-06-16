import React from 'react';
import { Typography, Paper, Box, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  color: 'white',
  margin: '-10px -10px',
  marginTop: '-1px',
}));

const AttendanceAnalysisReport = ({ analysisData }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(22);
    doc.text('Attendance Analysis Report', 105, 20, null, null, 'center');

    // Add Date Range
    doc.setFontSize(16);
    doc.text('Date Range', 20, 40);
    doc.setFontSize(12);
    doc.text(`From: ${analysisData.fromDate}`, 20, 50);
    doc.text(`To: ${analysisData.toDate}`, 20, 60);
    doc.text(`Total Days: ${analysisData.Totaldays}`, 20, 70);

    // Add Attendance Summary
    doc.setFontSize(16);
    doc.text('Attendance Summary', 20, 90);
    doc.setFontSize(12);
    doc.text(`Days Needed: ${analysisData.daysNeededToAttend}`, 20, 100);
    doc.text(`Days Can Skip: ${analysisData.daysCanSkip}`, 20, 110);
    doc.text(`Total Classes: ${analysisData.AttendanceRequirements?.totalClasses}`, 20, 120);

    // Add Subject Attendance Table
    doc.setFontSize(16);
    doc.text('Subject Attendance', 20, 140);
    const subjectCounts = Object.entries(analysisData.SubjectCountsdata || {}).map(([subject, count]) => ({
      subject,
      count,
    }));

    const subjectTable = subjectCounts.map((item) => [item.subject, item.count]);
    doc.autoTable({
      head: [['Subject', 'Attendance Count']],
      body: subjectTable,
      startY: 150,
    });

    // Add Daily Schedule Table
    doc.setFontSize(16);
    doc.text('Daily Schedule', 20, doc.previousAutoTable.finalY + 20);
    const dailySchedule = Object.entries(analysisData.basicdata || {}).map(([date, subjects]) => [
      date,
      subjects.join(', '),
    ]);
    doc.autoTable({
      head: [['Date', 'Subjects']],
      body: dailySchedule,
      startY: doc.previousAutoTable.finalY + 30,
    });

    // Add Footer
    doc.setFontSize(12);
    doc.text('Powered by BunkSafe', 20, doc.previousAutoTable.finalY + 20);

    doc.save('attendance_report.pdf');
  };

  const shareReport = () => {
    // Implement sharing logic here
    console.log('Sharing report...');
  };

  return (
    <Box sx={{ position: 'relative' }}>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <StyledButton
          
            startIcon={<DownloadIcon />}
            onClick={downloadPDF}
          >
          </StyledButton>
          <StyledButton
           
            startIcon={<ShareIcon />}
            onClick={shareReport}
          >
          </StyledButton>
        </Box>
    </Box>
  );
};

export default AttendanceAnalysisReport;
