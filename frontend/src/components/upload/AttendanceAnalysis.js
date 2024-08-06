// src/components/AttendanceAnalysis.js
import React, { useState } from 'react';
import { Grid, Paper, Typography, Button, TextField, Container, LinearProgress  } from '@mui/material';
import AnalysisResultsOverview from './AnalysisResultsOverview';
import UploadData from './UploadData';
import TimeBasedReports from './TimeBasedReports';
import SubjectWiseReports from './SubjectWiseReports';
import InteractiveCalendar from './InteractiveCalendar';
import ViewEditTimetable from './ViewEditTimetable';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const AttendanceAnalysis = () => {
  const [attendanceRequirement, setAttendanceRequirement] = useState(75);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [analysisStatus, setAnalysisStatus] = useState(null); // 'uploading', 'processing', 'generating', or null

  const handleGenerateAnalysis = () => {
    setAnalysisStatus('uploading');
    setTimeout(() => {
      setAnalysisStatus('processing');
      setTimeout(() => {
        setAnalysisStatus('generating');
        setTimeout(() => {
          setAnalysisStatus(null);
        }, 2000);
      }, 2000);
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>Optimize Your Attendance</Typography>
      <Typography variant="subtitle1" gutterBottom>Enhanced organization and user experience for analysis page.</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <UploadData />
          </Paper>
        </Grid>

        {analysisStatus && (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>Analysis Progress</Typography>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={4}>
              <Typography color={analysisStatus === 'uploading' ? 'primary' : 'textSecondary'}>Uploading</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography color={analysisStatus === 'processing' ? 'primary' : 'textSecondary'}>Processing</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography color={analysisStatus === 'generating' ? 'primary' : 'textSecondary'}>Generating Reports</Typography>
            </Grid>
          </Grid>
          <LinearProgress style={{ marginTop: '10px' }} />
          <Button variant="outlined" style={{ marginTop: '10px' }} onClick={() => setAnalysisStatus(null)}>
            Cancel Analysis
          </Button>
        </Paper>
      )}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="From Date"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="To Date"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField 
                  label="Attendance Requirement"
                  type="number"
                  value={attendanceRequirement}
                  onChange={(e) => setAttendanceRequirement(e.target.value)}
                  InputProps={{ endAdornment: '%' }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <div style={{ marginTop: '20px' }}>
              <Button variant="contained" color="primary" onClick={handleGenerateAnalysis} style={{ marginRight: '10px' }}>
                Generate Analysis
              </Button>
              <Button variant="outlined">Cancel Analysis</Button>
            </div>
          </Paper>
        </Grid>
        <AnalysisResultsOverview totalAttended={50} totalRequired={60} percentageAttended={83} />
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <TimeBasedReports />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <SubjectWiseReports />
          </Paper>
        </Grid>
        
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Paper style={{ padding: '20px', maxWidth: '500px' }}>
            <InteractiveCalendar />
          </Paper>
        </Grid>
        
        <Grid item xs={12} container spacing={3} justifyContent="flex-center" alignItems="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleGenerateAnalysis}>
              Regenerate Reports
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained">
              Download Reports
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ViewEditTimetable />
        </Grid>
      </Grid>
    </Container>
    </ThemeProvider>
  );
};

export default AttendanceAnalysis;