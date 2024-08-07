import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Container, Box, Card, CardContent, CircularProgress } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import { BarChart, PieChart, Timeline, TrendingUp, Group, School, EventNote } from '@mui/icons-material';
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
  50% { transform: translateY(-10px); }
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

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 4px 12px 0 rgba(31, 38, 135, 0.37)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px 0 rgba(31, 38, 135, 0.5)',
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
            <Grid item xs={12} md={8}>
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
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
                          max: 100,
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
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <StyledPaper>
                  <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                    Attendance Distribution
                  </Typography>
                  <Chart
                    type="doughnut"
                    data={{
                      labels: ['Present', 'Absent'],
                      datasets: [
                        {
                          data: [75, 25],
                          backgroundColor: ['rgba(33, 150, 243, 0.6)', 'rgba(244, 67, 54, 0.6)'],
                          borderColor: ['rgba(33, 150, 243, 1)', 'rgba(244, 67, 54, 1)'],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      animation: {
                        duration: 2000,
                        easing: 'easeOutQuart',
                      },
                    }}
                  />
                </StyledPaper>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <StyledPaper>
                  <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                    Attendance Trends
                  </Typography>
                  <Chart
                    type="line"
                    data={{
                      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                      datasets: [
                        {
                          label: 'Attendance Rate',
                          data: [65, 70, 80, 75],
                          fill: false,
                          borderColor: 'rgb(75, 192, 192)',
                          tension: 0.1,
                        },
                      ],
                    }}
                    options={{
                      animation: {
                        duration: 2000,
                        easing: 'easeOutQuart',
                      },
                    }}
                  />
                </StyledPaper>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                    <StatCard
                      icon={<Group sx={{ fontSize: 40, color: '#2196f3' }} />}
                      title="Total Students"
                      value="256"
                      color="#2196f3"
                    />
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
                    <StatCard
                      icon={<School sx={{ fontSize: 40, color: '#4caf50' }} />}
                      title="Average Attendance"
                      value="85%"
                      color="#4caf50"
                    />
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
                    <StatCard
                      icon={<EventNote sx={{ fontSize: 40, color: '#ff9800' }} />}
                      title="Total Classes"
                      value="180"
                      color="#ff9800"
                    />
                  </motion.div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default AnalysisResults;