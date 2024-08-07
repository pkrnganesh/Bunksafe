// // src/components/AnalysisResultsOverview.js
// import React from 'react';
// import { Typography, Button } from '@mui/material';

// // const AnalysisResultsOverview = () => {
// //   return (
// //     <>
// //       <Typography variant="h6">Analysis Results Overview</Typography>
// //       <Typography>Total Classes Attended: 50</Typography>
// //       <Typography>Total Classes Required: 60</Typography>
// //       <Typography>Percentage of Classes Attended: 83%</Typography>
// //       <Button variant="contained" color="primary">Regenerate Reports</Button>
// //       <Button variant="contained">Exportable Reports</Button>
// //     </>
// //   );
// // };

// // export default AnalysisResultsOverview;
// src/components/AnalysisResultsOverview.js
import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AnalysisResultsOverview = ({ totalAttended, totalRequired, percentageAttended }) => {
  const pieData = {
    labels: ['Attended', 'Missed'],
    datasets: [
      {
        data: [totalAttended, totalRequired - totalAttended],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  const barData = {
    labels: ['Subject 1', 'Subject 2', 'Subject 3'],
    datasets: [
      {
        label: 'Attended',
        data: [30, 35, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Required',
        data: [40, 40, 40],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px', marginLeft: '150px' }}>
      <Typography variant="h5" gutterBottom>Analysis Results Overview</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography>Total Classes Attended: {totalAttended}</Typography>
          <Typography>Total Classes Required: {totalRequired}</Typography>
          <Typography>Percentage of Classes Attended: {percentageAttended}%</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Pie data={pieData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Bar data={barData} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AnalysisResultsOverview;