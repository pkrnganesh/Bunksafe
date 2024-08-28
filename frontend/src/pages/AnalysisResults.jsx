import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Grid, Typography, Chip, useMediaQuery, Button, Card, CardContent, Fab, IconButton, SwipeableDrawer, Avatar } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import useAttendanceData from '../api/useAttendanceData';
import { motion, AnimatePresence } from 'framer-motion';
import { GetApp, Menu, School, TrendingUp, CalendarToday, LibraryBooks } from '@mui/icons-material';
import { styled } from '@mui/system';

// Custom styled components
const GlassCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  padding: '24px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.45)',
  },
}));

const theme = createTheme({
  palette: {
    primary: { main: "#3f51b5" },
    secondary: { main: "#f50057" },
    background: { default: "#ffffff" },
    text: { primary: "#333333", secondary: "#666666" },
  },
  typography: { 
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '3rem', color: "#333333" },
    h2: { fontWeight: 600, fontSize: '2.5rem', color: "#333333" },
    h3: { fontWeight: 600, fontSize: '2rem', color: "#333333" },
    h4: { fontWeight: 600, fontSize: '1.75rem', color: "#333333" },
    h5: { fontWeight: 600, fontSize: '1.5rem', color: "#333333" },
    h6: { fontWeight: 600, fontSize: '1.25rem', color: "#333333" },
    body1: { fontSize: '1rem', color: "#333333" },
    body2: { fontSize: '0.875rem', color: "#666666" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        },
      },
    },
  },
});

const AttendanceDashboard = () => {
  const { summaryData, subjectData, attendanceData, timetable, loading } = useAttendanceData();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4" sx={{ color: theme.palette.primary.main }}>Loading...</Typography>
      </Box>
    );
  }

  const handleDownload = () => {
    // Generate the analysis report
    const report = generateAnalysisReport(summaryData, subjectData, attendanceData);
    
    // Create a Blob with the report content
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    
    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'attendance_analysis.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateAnalysisReport = (summaryData, subjectData, attendanceData) => {
    let report = "Attendance Analysis Report\n\n";

    // Add summary data
    report += "Summary:\n";
    for (const [key, value] of Object.entries(summaryData)) {
      report += `${key}: ${value}\n`;
    }
    report += "\n";

    // Add subject-wise data
    report += "Subject-wise Attendance:\n";
    for (const subject of subjectData) {
      report += `${subject.subject}:\n`;
      report += `  Total Classes: ${subject['Total Classes']}\n`;
      report += `  Required for 75%: ${subject['Required for 75%']}\n`;
      report += `  Attendance Percentage: ${((subject['Required for 75%'] / subject['Total Classes']) * 100).toFixed(2)}%\n\n`;
    }

    // Add daily attendance data
    report += "Daily Attendance:\n";
    for (const day of attendanceData) {
      report += `${day.date}: ${day.value}\n`;
    }

    return report;
  };

  const SummarySection = () => (
    <GlassCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 3 }}>
        <School sx={{ mr: 1, verticalAlign: 'middle' }} />
        Attendance Summary
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(summaryData).map(([key, value], index) => (
          <Grid item xs={12} sm={4} key={key}>
            <Box sx={{
              textAlign: 'center',
              p: 2,
              borderRadius: '16px',
              background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              },
            }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>{value}</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{key}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </GlassCard>
  );

  const AttendanceSection = () => (
    <GlassCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 3 }}>
        <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
        Attendance Trend
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={attendanceData}>
          <defs>
            <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="day" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} />
          <Tooltip 
            contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
            cursor={{ stroke: theme.palette.primary.main, strokeWidth: 2 }}
          />
          <Area type="monotone" dataKey="value" stroke={theme.palette.primary.main} fillOpacity={1} fill="url(#colorAttendance)" />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  );

  const SubjectsSection = () => (
    <GlassCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 3 }}>
        <LibraryBooks sx={{ mr: 1, verticalAlign: 'middle' }} />
        Subject-wise Attendance
      </Typography>
      <Grid container spacing={3}>
        {subjectData.map((subject, index) => (
          <Grid item xs={12} sm={6} md={4} key={subject.subject}>
            <Box sx={{
              p: 2,
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              },
            }}>
              <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>{subject.subject}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Total: {subject['Total Classes']}</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>Required: {subject['Required for 75%']}</Typography>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={[
                  { name: 'Start', value: 0 },
                  { name: 'Current', value: subject['Required for 75%'] },
                  { name: 'Total', value: subject['Total Classes'] }
                ]}>
                  <Line type="monotone" dataKey="value" stroke={theme.palette.secondary.main} strokeWidth={2} dot={{ stroke: theme.palette.secondary.main, strokeWidth: 2, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        ))}
      </Grid>
    </GlassCard>
  );

  const TimetableSection = () => (
    <GlassCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 3 }}>
        <CalendarToday sx={{ mr: 1, verticalAlign: 'middle' }} />
        Weekly Timetable
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(timetable).map(([day, subjects]) => (
          <Grid item xs={12} sm={6} md={4} key={day}>
            <Box sx={{
              p: 2,
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              },
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}>{day}</Typography>
              {subjects.map((subject, index) => (
                <Chip
                  key={index}
                  label={subject}
                  sx={{
                    m: 0.5,
                    backgroundColor: theme.palette.secondary.light,
                    color: theme.palette.secondary.contrastText,
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.main,
                    },
                  }}
                />
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </GlassCard>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: isMobile ? 2 : 5,
        overflowX: 'hidden',
      }}>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ position: 'absolute', top: 16, left: 16 }}
          >
            <Menu />
          </IconButton>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 6 }}>
          <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: theme.palette.primary.main }}>
            <School fontSize="large" />
          </Avatar>
          <Typography variant="h2" sx={{ 
            color: theme.palette.primary.main, 
            fontWeight: 700,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            fontSize: isMobile ? '2rem' : '2.5rem',
          }}>
            Student Analytics
          </Typography>
        </Box>
        {isMobile ? (
          <SwipeableDrawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onOpen={() => setDrawerOpen(true)}
          >
            <Box sx={{ width: 250, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Dashboard Sections</Typography>
              <Button fullWidth sx={{ mb: 1 }} onClick={() => { setDrawerOpen(false); /* Scroll to Summary */ }}>Summary</Button>
              <Button fullWidth sx={{ mb: 1 }} onClick={() => { setDrawerOpen(false); /* Scroll to Attendance Trend */ }}>Attendance Trend</Button>
              <Button fullWidth sx={{ mb: 1 }} onClick={() => { setDrawerOpen(false); /* Scroll to Subjects */ }}>Subjects</Button>
              <Button fullWidth onClick={() => { setDrawerOpen(false); /* Scroll to Timetable */ }}>Timetable</Button>
            </Box>
          </SwipeableDrawer>
        ) : null}
        <Grid container spacing={isMobile ? 2 : 4}>
          <Grid item xs={12}>
            <SummarySection />
          </Grid>
          <Grid item xs={12}>
            <AttendanceSection />
          </Grid>
          <Grid item xs={12}>
            <SubjectsSection />
          </Grid>
          <Grid item xs={12}>
            <TimetableSection />
          </Grid>
        </Grid>
        <Fab 
          color="primary" 
          aria-label="download" 
          sx={{ 
            position: 'fixed', 
            bottom: 16, 
            right: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onClick={handleDownload}
        >
          <GetApp />
          {!isMobile && (
            <Typography variant="caption" sx={{ mt: 0.5 }}>
              Download Analysis
            </Typography>
          )}
        </Fab>
      </Box>
    </ThemeProvider>
  );
};

export default AttendanceDashboard;