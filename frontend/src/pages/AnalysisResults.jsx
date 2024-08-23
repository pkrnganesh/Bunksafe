import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Grid, Typography,CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

import SummaryCard from '../components/generation/SummaryCard';
import SubjectAttendanceChart from '../components/generation/SubjectAttendanceChart';
import AttendanceCalendar from '../components/generation/AttendanceCalendar';
import HolidaysList from '../components/generation/HolidaysList';
import Timetable from '../components/generation/Timetable';

import useAttendanceData from '../api/useAttendanceData';

const theme = createTheme({
  palette: {
    primary: { main: '#4A90E2' },
    secondary: { main: '#F5A623' },
    background: { default: '#F0F8FF' },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

const AnalysisResults = () => {
  const { summaryData, subjectData, attendanceData, holidays, timetable, loading } = useAttendanceData();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(120deg, #4A90E2 0%, #E0F7FA 100%)', padding: 4 }}>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h2" gutterBottom align="center" sx={{ color: 'white', fontWeight: 700, textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
            Attendance Analysis Dashboard
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} container spacing={2}>
              {Object.entries(summaryData).map(([key, value]) => (
                <Grid item xs={12} md={4} key={key}>
                  <SummaryCard title={key} value={value} />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <SubjectAttendanceChart data={subjectData} />
            </Grid>
            <Grid item xs={12}>
              <AttendanceCalendar data={attendanceData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <HolidaysList holidays={holidays} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Timetable data={timetable} />
            </Grid>
          </Grid>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default AnalysisResults;