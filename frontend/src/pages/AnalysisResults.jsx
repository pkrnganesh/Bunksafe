import React, { useState, useEffect } from 'react';
import { 
  Grid, Paper, Typography, Container, Box, Card, CardContent, 
  CircularProgress, Button, TextField, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, 
  DialogContent, DialogActions
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import { BarChart, PieChart, Timeline, TrendingUp, Group, School, EventNote, Add, Delete, Edit, CloudUpload, DateRange, PercentOutlined } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 20,
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 30px 0 rgba(31, 38, 135, 0.5)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: '12px 24px',
  fontWeight: 'bold',
  textTransform: 'none',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
    transform: 'scale(1.05)',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    background: theme.palette.primary.dark,
  },
}));

const AnimatedIcon = styled(motion.div)`
  animation: ${float} 3s ease-in-out infinite;
`;

const AnalysisResults = () => {
  const [dummyData, setDummyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const StatCard = ({ icon, title, value, color }) => (
    <StyledCard>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <AnimatedIcon>
            {icon}
          </AnimatedIcon>
          <Typography variant="h6" style={{ marginLeft: '10px' }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" style={{ color: color, fontWeight: 'bold' }}>
          {value}
        </Typography>
      </CardContent>
    </StyledCard>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" style={{ marginTop: '40px', marginBottom: '40px' }}>
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h3" gutterBottom align="center" style={{ fontWeight: 'bold', color: '#2196f3' }}>
            Attendance Analysis Dashboard
          </Typography>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Typography variant="subtitle1" gutterBottom align="center" style={{ marginBottom: '40px' }}>
            Comprehensive insights and visualizations of your attendance data
          </Typography>
        </motion.div>

        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress size={60} />
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                <StyledPaper>
                  <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                    Weekly Attendance Overview
                  </Typography>
                  <Chart
                    type="bar"
                    data={{
                      labels: dummyData.labels,
                      datasets: [
                        {
                          label: 'Attendance',
                          data: dummyData.data,
                          backgroundColor: 'rgba(33, 150, 243, 0.6)',
                          borderColor: 'rgba(33, 150, 243, 1)',
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
                            text: 'Attendance Percentage',
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

            {/* Attendance Distribution */}
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <StyledPaper>
                  <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                    Attendance Distribution
                  </Typography>
                  <Chart
                    type="pie"
                    data={{
                      labels: ['Present', 'Absent'],
                      datasets: [
                        {
                          data: [75, 25],
                          backgroundColor: ['rgba(76, 175, 80, 0.6)', 'rgba(244, 67, 54, 0.6)'],
                          borderColor: ['rgba(76, 175, 80, 1)', 'rgba(244, 67, 54, 1)'],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      animation: {
                        duration: 2000,
                        easing: 'easeOutQuart',
                      },
                    }}
                  />
                </StyledPaper>
              </motion.div>
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
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                <StyledPaper>
                  <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                    Holidays
                  </Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <TextField
                      label="Add Holiday"
                      variant="outlined"
                      size="small"
                      value={newHoliday}
                      onChange={(e) => setNewHoliday(e.target.value)}
                      style={{ marginRight: '10px' }}
                      InputProps={{
                        startAdornment: <DateRange color="primary" />,
                      }}
                    />
                    <StyledButton onClick={handleAddHoliday}>
                      Add
                    </StyledButton>
                  </Box>
                  <ul>
                    {holidays.map((holiday) => (
                      <li key={holiday}>
                        {holiday}
                        <StyledIconButton size="small" onClick={() => handleDeleteHoliday(holiday)}>
                          <Delete fontSize="small" />
                        </StyledIconButton>
                      </li>
                    ))}
                  </ul>
                </StyledPaper>
              </motion.div>
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
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
                <StyledPaper>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                      Timetable
                    </Typography>
                    <StyledButton onClick={() => setShowTimetable(!showTimetable)}>
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
                                  <Box key={index} display="flex" alignItems="center" mb={1}>
                                    <Typography>{subject}</Typography>
                                    <StyledIconButton size="small" onClick={() => handleEditSubject(day, index)}>
                                      <Edit fontSize="small" />
                                    </StyledIconButton>
                                    <StyledIconButton size="small" onClick={() => handleDeleteSubject(day, index)}>
                                      <Delete fontSize="small" />
                                    </StyledIconButton>
                                  </Box>
                                ))}
                              </TableCell>
                              <TableCell>
                                <StyledButton startIcon={<Add />} onClick={() => handleAddSubject(day)}>
                                  Add Subject
                                </StyledButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </StyledPaper>
              </motion.div>
            </Grid>

            {/* Stat Cards */}
            <Grid item xs={12} sm={6} md={3}>
              <AnimatedIcon>
                <StyledIconButton>
                  <TrendingUp />
                </StyledIconButton>
              </AnimatedIcon>
              <Typography variant="h6">Overall Attendance</Typography>
              <Typography variant="h4">85%</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AnimatedIcon>
                <StyledIconButton>
                  <Group />
                </StyledIconButton>
              </AnimatedIcon>
              <Typography variant="h6">Total Students</Typography>
              <Typography variant="h4">150</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AnimatedIcon>
                <StyledIconButton>
                  <School />
                </StyledIconButton>
              </AnimatedIcon>
              <Typography variant="h6">Courses</Typography>
              <Typography variant="h4">12</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AnimatedIcon>
                <StyledIconButton>
                  <EventNote />
                </StyledIconButton>
              </AnimatedIcon>
              <Typography variant="h6">School Days</Typography>
              <Typography variant="h4">220</Typography>
            </Grid>
          </Grid>
        )}

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

// Additional styled components for enhanced visuals
const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 15,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 10px 4px rgba(255, 105, 135, .3)',
  },
}));

const ChartWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  borderRadius: 15,
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  },
}));

const FloatingActionButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  borderRadius: '50%',
  width: 60,
  height: 60,
  minWidth: 0,
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
  },
}));

// Add these components to enhance the visual appeal
const EnhancedAnalysisResults = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnalysisResults />
      {showScrollTop && (
        <FloatingActionButton onClick={scrollToTop}>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowUpward />
          </motion.div>
        </FloatingActionButton>
      )}
    </>
  );
};

export default EnhancedAnalysisResults;