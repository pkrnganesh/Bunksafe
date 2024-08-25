import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Grid, Typography, Paper, Card, CardContent, CardHeader, IconButton, LinearProgress } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import LaptopIcon from '@mui/icons-material/Laptop';
import MotorcycleIcon from '@mui/icons-material/TwoWheeler';

const theme = createTheme({
  palette: {
    primary: { main: "#4CAF50" },
    secondary: { main: "#FFC107" },
    background: { default: "#F5F5F5" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const revenueData = [
  { day: '01', Income: 120, Expense: 80 },
  { day: '02', Income: 100, Expense: 110 },
  { day: '03', Income: 130, Expense: 90 },
  { day: '04', Income: 80, Expense: 100 },
  { day: '05', Income: 140, Expense: 120 },
  { day: '06', Income: 150, Expense: 80 },
  { day: '07', Income: 110, Expense: 130 },
];

const weeklyExpenseData = [
  { name: 'Grocery', value: 48, color: '#8884d8' },
  { name: 'Food & Drink', value: 32, color: '#82ca9d' },
  { name: 'Shopping', value: 13, color: '#ffc658' },
  { name: 'Transportation', value: 7, color: '#ff8042' },
];

const dailyExpenseData = [
  { day: '01', 'Food & Drink': 30, Grocery: 20, Shopping: 15, Transport: 10 },
  { day: '02', 'Food & Drink': 25, Grocery: 15, Shopping: 10, Transport: 5 },
  { day: '03', 'Food & Drink': 35, Grocery: 25, Shopping: 20, Transport: 15 },
  { day: '04', 'Food & Drink': 20, Grocery: 30, Shopping: 10, Transport: 10 },
  { day: '05', 'Food & Drink': 15, Grocery: 20, Shopping: 5, Transport: 5 },
  { day: '06', 'Food & Drink': 30, Grocery: 25, Shopping: 15, Transport: 10 },
  { day: '07', 'Food & Drink': 25, Grocery: 15, Shopping: 10, Transport: 5 },
];

const RevenueCard = () => (
  <Card>
    <CardHeader
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title="Revenue"
      subheader="Sales from 1-12 Apr, 2024"
    />
    <CardContent>
      <Typography variant="h4">$1,278.45</Typography>
      <Typography variant="body2" color="success.main">↑ 2.1% vs last week</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={revenueData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Income" fill="#82ca9d" />
          <Bar dataKey="Expense" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);



const SavingGoalCard = () => (
  <Card>
    <CardHeader
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title="Saving Goal"
      subheader="Data from 1-12 Apr, 2024"
    />
    <CardContent>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        {/* <CircularProgress variant="determinate" value={87.75} size={200} thickness={5} /> */}
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" component="div" color="text.secondary">
            $1,052.98
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary">of $1,200</Typography>
    </CardContent>
  </Card>
);

const SpendingLimitCard = () => (
  <Card>
    <CardHeader
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title="Spending Limit"
      subheader="Data from 1-12 Apr, 2024"
    />
    <CardContent>
      <Typography variant="h4">$252.98</Typography>
      <Typography variant="body2" color="text.secondary">of $1,200</Typography>
      <LinearProgress variant="determinate" value={21.08} sx={{ mt: 2 }} />
    </CardContent>
  </Card>
);

const SubscriptionCard = ({ icon, name, price, date }) => (
  <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
    {icon}
    <Box sx={{ ml: 2 }}>
      <Typography variant="subtitle1">{name}</Typography>
      <Typography variant="body2" color="text.secondary">{date}</Typography>
    </Box>
    <Typography variant="h6" sx={{ ml: 'auto' }}>${price}</Typography>
  </Card>
);

const DailyExpenseCard = () => (
  <Card>
    <CardHeader
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title="Daily Expense"
      subheader="Data from 1-12 Apr, 2024"
    />
    <CardContent>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={dailyExpenseData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Food & Drink" stackId="a" fill="#82ca9d" />
          <Bar dataKey="Grocery" stackId="a" fill="#8884d8" />
          <Bar dataKey="Shopping" stackId="a" fill="#ffc658" />
          <Bar dataKey="Transport" stackId="a" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const GoalCard = ({ icon, name, current, total }) => (
  <Card sx={{ p: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      {icon}
      <Typography variant="subtitle1" sx={{ ml: 1 }}>{name}</Typography>
    </Box>
    <LinearProgress variant="determinate" value={(current / total) * 100} sx={{ mb: 1 }} />
    <Typography variant="body2" color="text.secondary">
      ${current.toLocaleString()} of ${total.toLocaleString()}
    </Typography>
  </Card>
);

const FinanceDashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", background: "#F5F5F5", padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <RevenueCard />
          </Grid>
                   <Grid item xs={12} md={4}>
            <SavingGoalCard />
          </Grid>
          <Grid item xs={12} md={4}>
            <SpendingLimitCard />
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SubscriptionCard 
                  icon={<img src="spotify-icon.png" alt="Spotify" width={40} height={40} />}
                  name="Spotify Subscription"
                  price={5.99}
                  date="Apr 03, 2024"
                />
              </Grid>
              <Grid item xs={12}>
                <SubscriptionCard 
                  icon={<img src="youtube-icon.png" alt="YouTube" width={40} height={40} />}
                  name="Youtube Membership"
                  price={13.99}
                  date="Apr 03, 2024"
                />
              </Grid>
              <Grid item xs={12}>
                <SubscriptionCard 
                  icon={<img src="google-workspace-icon.png" alt="Google Workspace" width={40} height={40} />}
                  name="Google Workspace"
                  price={8.40}
                  date="Apr 03, 2024"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <DailyExpenseCard />
          </Grid>
          <Grid item xs={12} md={3}>
            <GoalCard 
              icon={<DirectionsCarIcon />}
              name="Dream Car"
              current={12567}
              total={25000}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <GoalCard 
              icon={<HomeIcon />}
              name="House Saving"
              current={12567}
              total={25000}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <GoalCard 
              icon={<LaptopIcon />}
              name="Laptop"
              current={12567}
              total={25000}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <GoalCard 
              icon={<MotorcycleIcon />}
              name="Motorcycle"
              current={12567}
              total={25000}
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default FinanceDashboard;