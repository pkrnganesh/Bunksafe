import React, { useState, useEffect } from 'react';
import { 
  Grid, Paper, Typography, Container, Box, 
  CircularProgress, Button, TextField, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, 
  DialogContent, DialogActions, Tooltip, List, ListItem, ListItemText,Chip
} from '@mui/material';
import { styled, alpha} from '@mui/material/styles';
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
  const [dummyData, setDummyData] = useState(null);
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

  const subjectData = {
    'Mathematics': 30,
    'Physics': 25,
    'Chemistry': 28,
    'Biology': 22,
    'English': 20
  };

  const holidays = ['New Year', 'Independence Day', 'Christmas'];

  const timetable = {
    'Monday': ['Mathematics', 'Physics', 'Chemistry'],
    'Tuesday': ['Biology', 'English', 'Mathematics'],
    'Wednesday': ['Physics', 'Chemistry', 'Biology'],
    'Thursday': ['English', 'Mathematics', 'Physics'],
    'Friday': ['Chemistry', 'Biology', 'English']
  };

  const validDays = 220;

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      const generateDummyData = () => {
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        const data = labels.map(() => Math.floor(Math.random() * 100));
        return { labels, data };
      };
      setDummyData(generateDummyData());
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
    // Calculate required classes logic here
    return Math.floor(subjectData[subject] * 0.75);
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
                <Grid item xs={12} md={6}>
                  <StyledPaper>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      Weekly Attendance Overview
                    </Typography>
                    <Box height={300}>
                      <Bar
                        data={{
                          labels: dummyData.labels,
                          datasets: [
                            {
                              label: 'Attendance',
                              data: dummyData.data,
                              backgroundColor: theme.palette.primary.main,
                            },
                          ],
                        }}
                        options={chartOptions}
                      />
                    </Box>
                  </StyledPaper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <StyledPaper>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      Attendance Distribution
                    </Typography>
                    <Box height={300}>
                      <Pie
                        data={{
                          labels: ['Present', 'Absent'],
                          datasets: [
                            {
                              data: [75, 25],
                              backgroundColor: [theme.palette.success.main, theme.palette.error.main],
                            },
                          ],
                        }}
                        options={chartOptions}
                      />
                    </Box>
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
                    Valid Working Days: {validDays}
                  </Typography>
                  <Typography variant="body1">
                    Required Days to Attend: {Math.ceil((targetAttendance / 100) * validDays)}
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
                              <TableCell>Actions</TableCell>
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
                                      onDelete={() => handleDeleteSubject(day, index)}
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
                <Grid item xs={12} sm={6} md={3}>
                  <StyledPaper>
                    <Box display="flex" alignItems="center" mb={2}>
                      <TrendingUp color="primary" fontSize="large" sx={{ mr: 2 }} />
                      <Typography variant="h6">Overall Attendance</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>85%</Typography>
                  </StyledPaper>
                </Grid>
                {/* ... (repeat for other stat cards) */}
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
            <StyledButton onClick={handleSaveSubject}>Save</StyledButton>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default AnalysisResults;