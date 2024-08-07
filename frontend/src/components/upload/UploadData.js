import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button, Container, Box, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import { CloudUpload, BarChart, PieChart, Timeline } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  background: 'rgba(255, 255, 255, 0.25)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
  },
}));

const StyledButton = styled(Button)(() => ({
  borderRadius: 30,
  padding: '10px 20px',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
  },
}));

const UploadingData = () => {
  const [dummyData, setDummyData] = useState(null);

  useEffect(() => {
    // Generate dummy data
    const generateDummyData = () => {
      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      const data = labels.map(() => Math.floor(Math.random() * 100));
      return { labels, data };
    };

    setDummyData(generateDummyData());
  }, []);



  return (
    <Container maxWidth="lg" style={{ marginTop: '40px' }}>
      <Typography variant="h3" gutterBottom align="center" style={{ fontWeight: 'bold', color: '#3f51b5' }}>
        Optimize Your Attendance
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" style={{ marginBottom: '40px' }}>
        Enhanced organization and user experience for analysis page
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <StyledPaper>
              <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                Upload Data
              </Typography>
              <Box
                sx={{
                  border: '2px dashed #3f51b5',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(63, 81, 181, 0.04)' },
                }}
              >
                <CloudUpload sx={{ fontSize: 60, color: '#3f51b5', mb: 2 }} />
                <Typography variant="body1" gutterBottom>
                  Drag and drop files here or click to browse
                </Typography>
                <StyledButton variant="contained" color="primary">
                  Choose file
                </StyledButton>
              </Box>
            </StyledPaper>
          </motion.div>
        </Grid>        

        {dummyData && (
          <>
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <StyledPaper>
                  <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                    Weekly Attendance
                  </Typography>
                  <Chart
                    type="bar"
                    data={{
                      labels: dummyData.labels,
                      datasets: [
                        {
                          label: 'Attendance',
                          data: dummyData.data,
                          backgroundColor: 'rgba(63, 81, 181, 0.6)',
                          borderColor: 'rgba(63, 81, 181, 1)',
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
                    }}
                  />
                </StyledPaper>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
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
                          backgroundColor: ['rgba(63, 81, 181, 0.6)', 'rgba(244, 67, 54, 0.6)'],
                          borderColor: ['rgba(63, 81, 181, 1)', 'rgba(244, 67, 54, 1)'],
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </StyledPaper>
              </motion.div>
            </Grid>
          </>
        )}
      </Grid>

      <Box mt={6}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <BarChart sx={{ fontSize: 40, color: '#3f51b5', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Detailed Reports
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Access comprehensive attendance reports and analytics.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <PieChart sx={{ fontSize: 40, color: '#3f51b5', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Attendance Insights
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Gain valuable insights into attendance patterns and trends.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Timeline sx={{ fontSize: 40, color: '#3f51b5', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Historical Data
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  View and analyze historical attendance data.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UploadingData;