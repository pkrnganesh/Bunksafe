import React from 'react';
import { Grid, Paper, Button, Container  } from '@mui/material';
import AnalysisResultsOverview from '../components/upload/AnalysisResultsOverview';
import TimeBasedReports from '../components/upload/TimeBasedReports';
import SubjectWiseReports from '../components/upload/SubjectWiseReports';
import InteractiveCalendar from '../components/upload/InteractiveCalendar';
import ViewEditTimetable from '../components/upload/ViewEditTimetable';
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
  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
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
            <Button variant="contained" color="primary" >
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
    </Container>
    </ThemeProvider>
  );
};

export default AttendanceAnalysis;