import React, { useState, useEffect } from 'react';
import { 
  Grid, Paper, Typography, Container, Box, 
  CircularProgress, Button, TextField, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, 
  DialogContent, DialogActions, Tooltip, List, ListItem, ListItemText, Chip
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Pie, Bar } from 'react-chartjs-2';
import { DateRange, PercentOutlined, Add, Delete, School, TrendingUp } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
  background: '#ffffff',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px 0 rgba(0,0,0,0.1)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1)',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

// const AnimatedIcon = styled(motion.div)`
//   animation: ${float} 3s ease-in-out infinite;
// `;

const AnalysisResults = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showTimetable, setShowTimetable] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [newHoliday, setNewHoliday] = useState('');
  const [targetAttendance, setTargetAttendance] = useState(75);


  // Dummy data

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Attendance Distribution',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
  };

  const holidays = ['New Year', 'Independence Day', 'Christmas'];

  const subjectData = {
    DWDM: 29,
    OOAD: 32,
    DML_LAB: 15,
    DM_LAB: 18,
    ADS_LAB: 18,
    'OE-1': 16,
    QA: 16,
    SS: 16,
    CAD: 33,
    ML: 30
  };

  const timetable = {
    Monday: ['DWDM', 'OOAD', 'DML LAB'],
    Tuesday: ['DM LAB', 'ADS LAB'],
    Wednesday: ['OE-1', 'QA', 'SS'],
    Thursday: ['CAD', 'ML'],
    Friday: ['ML', 'DWDM'],
    Saturday: ['OOAD', 'CAD']
  };

  const validDates = JSON.parse('["2024-01-02","2024-01-03","2024-01-04","2024-01-05","2024-01-06","2024-01-08","2024-01-09","2024-01-10","2024-01-11","2024-01-12","2024-01-13","2024-01-16","2024-01-17","2024-01-18","2024-01-19","2024-01-20","2024-01-22","2024-01-23","2024-01-24","2024-01-25","2024-01-27","2024-01-29","2024-01-30","2024-01-31","2024-02-01","2024-02-02","2024-02-03","2024-02-05","2024-02-06","2024-02-07","2024-02-08","2024-02-09","2024-02-10","2024-02-12","2024-02-13","2024-02-14","2024-02-15","2024-02-16","2024-02-17","2024-02-19","2024-02-20","2024-02-21","2024-02-22","2024-02-23","2024-02-24","2024-02-26","2024-02-27","2024-02-28","2024-02-29","2024-03-01","2024-03-02","2024-03-04","2024-03-05","2024-03-06","2024-03-07","2024-03-09","2024-03-11","2024-03-12","2024-03-13","2024-03-14","2024-03-15","2024-03-16","2024-03-18","2024-03-19","2024-03-20","2024-03-21","2024-03-22","2024-03-23","2024-03-26","2024-03-27","2024-03-28","2024-03-30","2024-04-01","2024-04-02","2024-04-03","2024-04-04","2024-04-05","2024-04-06","2024-04-08","2024-04-09","2024-04-10","2024-04-12","2024-04-13","2024-04-15","2024-04-16","2024-04-18","2024-04-19","2024-04-20","2024-04-22","2024-04-23","2024-04-24","2024-04-25","2024-04-26","2024-04-27","2024-04-29","2024-04-30"]');

  const totalDays = 96;
  const daysNeededToAttend = 24;
  const daysCanSkip = 72;

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleAddHoliday = () => {
    // Add holiday logic here
  };

  const handleDeleteHoliday = (holiday) => {
    // Delete holiday logic here
  };



  const handleDeleteSubject = (day, index) => {
    // Delete subject logic here
  };

  const handleAddSubject = (day) => {
    // Add subject logic here
  };

  const handleSaveSubject = () => {
    // Save subject logic here
  };

  const calculateRequiredClasses = (subject) => {
    const subjectRequirements = {
      DWDM: { total: 29, asperpercentage: 22, minimum40: 12 },
      OOAD: { total: 32, asperpercentage: 24, minimum40: 13 },
      DML_LAB: { total: 15, asperpercentage: 12, minimum40: 6 },
      DM_LAB: { total: 18, asperpercentage: 14, minimum40: 8 },
      ADS_LAB: { total: 18, asperpercentage: 14, minimum40: 8 },
      'OE-1': { total: 16, asperpercentage: 12, minimum40: 7 },
      QA: { total: 16, asperpercentage: 12, minimum40: 7 },
      SS: { total: 16, asperpercentage: 12, minimum40: 7 },
      CAD: { total: 33, asperpercentage: 25, minimum40: 14 },
      ML: { total: 30, asperpercentage: 23, minimum40: 12 }
    };
    return subjectRequirements[subject].minimum40;
  };


  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 4 }}>
          Attendance Analysis Dashboard
        </Typography>

        <AnimatePresence>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
              <CircularProgress size={60} />
            </Box>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Grid container spacing={4}>

              <Grid item xs={12} sm={6} md={3}>
                  <StyledPaper>
                    <Box display="flex" alignItems="center" mb={2}>
                      <TrendingUp color="primary" fontSize="large" sx={{ mr: 2 }} />
                      <Typography variant="h6">Total Days</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>{totalDays}</Typography>
                  </StyledPaper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <StyledPaper>
                    <Box display="flex" alignItems="center" mb={2}>
                      <TrendingUp color="primary" fontSize="large" sx={{ mr: 2 }} />
                      <Typography variant="h6">Days to Attend</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>{daysCanSkip}</Typography>
                  </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StyledPaper>
                    <Box display="flex" alignItems="center" mb={2}>
                      <TrendingUp color="primary" fontSize="large" sx={{ mr: 2 }} />
                      <Typography variant="h6">Days Can Skip</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>{daysNeededToAttend}</Typography>
                  </StyledPaper>
                </Grid>
                {/* Subject-wise Attendance */}
                <Grid item xs={12}>
                  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                    <StyledPaper>
                      <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                        Subject-wise Attendance
                      </Typography>
                      <Chart
                        type="bar"
                        data={{
                          labels: Object.keys(subjectData),
                          datasets: [
                            {
                              label: 'Total Classes',
                              data: Object.values(subjectData),
                              backgroundColor: 'rgba(33, 150, 243, 0.6)',
                              borderColor: 'rgba(33, 150, 243, 1)',
                              borderWidth: 1,
                            },
                            {
                              label: 'Required Classes',
                              data: Object.keys(subjectData).map(calculateRequiredClasses),
                              backgroundColor: 'rgba(255, 193, 7, 0.6)',
                              borderColor: 'rgba(255, 193, 7, 1)',
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{
                          scales: {
                            y: {
                              beginAtZero: true,
                              title: {
                                display: true,
                                text: 'Number of Classes',
                              },
                            },
                          },
                          animation: {
                            duration: 2000,
                            easing: 'easeOutQuart',
                          },
                        }}
                      />
                    </StyledPaper>
                  </motion.div>
            </Grid>

                {/* Holidays */}
                <Grid item xs={12} md={6}>
                  <StyledPaper>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      Holidays
                    </Typography>
                    <Box display="flex" alignItems="center" mb={2}>
                      <TextField
                        label="Add Holiday"
                        variant="outlined"
                        size="small"
                        value={newHoliday}
                        onChange={(e) => setNewHoliday(e.target.value)}
                        sx={{ mr: 2, flexGrow: 1 }}
                        InputProps={{
                          startAdornment: <DateRange color="primary" />,
                        }}
                      />
                      <StyledButton variant="contained" color="primary" onClick={handleAddHoliday}>
                        Add
                      </StyledButton>
                    </Box>
                    <List>
                      {holidays.map((holiday) => (
                        <ListItem key={holiday} secondaryAction={
                          <Tooltip title="Delete Holiday">
                            <StyledIconButton edge="end" onClick={() => handleDeleteHoliday(holiday)}>
                              <Delete />
                            </StyledIconButton>
                          </Tooltip>
                        }>
                          <ListItemText primary={holiday} />
                        </ListItem>
                      ))}
                    </List>
                  </StyledPaper>
                </Grid>

                {/* Attendance Calculator */}
                <Grid item xs={12} md={6}>
                  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
                    <StyledPaper>
                      <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                        Attendance Calculator
                      </Typography>
                      <Box display="flex" alignItems="center" mb={2}>
                        <TextField
                          label="Target Attendance (%)"
                          variant="outlined"
                          size="small"
                          type="number"
                          value={targetAttendance}
                          onChange={(e) => setTargetAttendance(Number(e.target.value))}
                          style={{ marginRight: '10px' }}
                          InputProps={{
                            startAdornment: <PercentOutlined color="primary" />,
                          }}
                        />
                      </Box>
                      <Typography variant="body1">
                        Total Days: {totalDays}
                      </Typography>
                      <Typography variant="body1">
                        Days Needed to Attend: {daysNeededToAttend}
                      </Typography>
                      <Typography variant="body1">
                        Days Can Skip: {daysCanSkip}
                      </Typography>
                    </StyledPaper>
                  </motion.div>
                </Grid>

                {/* Timetable */}
                <Grid item xs={12}>
                  <StyledPaper>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Timetable
                      </Typography>
                      <StyledButton variant="outlined" color="primary" onClick={() => setShowTimetable(!showTimetable)}>
                        {showTimetable ? 'Hide Timetable' : 'Show Timetable'}
                      </StyledButton>
                    </Box>
                    {showTimetable && (
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Day</TableCell>
                              <TableCell>Subjects</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Object.entries(timetable).map(([day, subjects]) => (
                              <TableRow key={day}>
                                <TableCell>{day}</TableCell>
                                <TableCell>
                                  {subjects.map((subject, index) => (
                                    <Chip
                                      key={index}
                                      label={subject}
                                      sx={{ mr: 1, mb: 1 }}
                                    />
                                  ))}
                                </TableCell>
                                <TableCell>
                                  <Tooltip title="Add Subject">
                                    <StyledIconButton onClick={() => handleAddSubject(day)}>
                                      <Add />
                                    </StyledIconButton>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </StyledPaper>
                </Grid>

                {/* Stat Cards */}
                
                {/* ... (you can add more stat cards as needed) */}
              </Grid>
            </motion.div>
          )}
        </AnimatePresence>

        <Dialog open={!!editingSubject} onClose={() => setEditingSubject(null)}>
          <DialogTitle>Edit Subject</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Subject Name"
              fullWidth
              value={editingSubject?.subject || ''}
              onChange={(e) => setEditingSubject({ ...editingSubject, subject: e.target.value })}
              InputProps={{
                startAdornment: <School color="primary" />,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingSubject(null)}>Cancel</Button>
            <StyledButton >Save</StyledButton>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default AnalysisResults;