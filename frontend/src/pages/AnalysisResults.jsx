import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Grid, Typography, Paper, Chip, LinearProgress } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PieChart, Pie, Cell } from 'recharts';
import CalendarAndEventComponent from '../components/generation/CalendarAndEventComponent';
import FinanceDashboard from '../components/generation/FinanceDashboard';
import { keyframes } from '@emotion/react';



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



const AnalyticsDashboard = () => {
  const historyData = [
    {
      screen: "Login Page",
      insight:
        'The absence of a "Remember Me" checkbox increases user friction for repeated logins.',
      status: "Resolved",
      boost: "+02%",
    },
    {
      screen: "Account Overview",
      insight:
        "The use of too many contrasting colors in the overview section creates visual clutter and increases...",
      status: "In Progress",
      boost: "+01%",
    },
    {
      screen: "Funds Transfer",
      insight:
        'The placement of the "Submit" button is not intuitive, causing users to spend more time finding it.',
      status: "Resolved",
      boost: "+02%",
    },
  ];

const audienceData = [
  { name: 'Grocery', amount: 758.20, percentage: 48, color: '#a05dff' },
  { name: 'Food & Drink', amount: 758.20, percentage: 32, color: '#5bc26d' },
  { name: 'Shopping', amount: 758.20, percentage: 13, color: '#ff7477' },
  { name: 'Transportation', amount: 758.20, percentage: 7, color: '#f5d35d' },
];


  const competitorsData = [
    { name: "ConvertIX", growth: "+11%" },
    { name: "OptiFlow AI", growth: null },
    { name: "AuditMinds", growth: "+47%" },
    { name: "UXElevate", growth: "+24%" },
    { name: "ProAudit AI", growth: null },
  ];

  const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", background: "#F5F5F5", padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CalendarAndEventComponent />
            <br />
            <FinanceDashboard />
<br/>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">History</Typography>
                <Box>
                  <ArrowUpwardIcon sx={{ mr: 1 }} />
                  <ArrowForwardIcon />
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Screen
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Insight
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Boost
                  </Typography>
                </Grid>
              </Grid>
              {historyData.map((item, index) => (
                <Grid container spacing={2} key={index} sx={{ mt: 1 }}>
                  <Grid item xs={3}>
                    <Typography variant="body2">
                      {item.screen}{" "}
                      <ArrowForwardIcon sx={{ fontSize: 14, ml: 1 }} />
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="body2" noWrap>
                      {item.insight}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Chip
                      label={item.status}
                      size="small"
                      color={
                        item.status === "Resolved" ? "primary" : "secondary"
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2" color="primary">
                      {item.boost}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: 4,
          textAlign: 'center',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.text.primary }}>
          Weekly Expense
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
          From 1 - 6 Apr, 2024
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            position: 'relative',
            height: 220,
          }}
        >
          {audienceData.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: `${item.percentage * 3}px`,
                height: `${item.percentage * 3}px`,
                borderRadius: '50%',
                backgroundColor: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: `${item.percentage / 4}px`,
                color: '#fff',
                fontWeight: 'bold',
                boxShadow: `0px 6px 20px ${item.color}80`, // Add shadow with color tint
                animation: `${bounce} 1.5s infinite`, // Add bounce animation
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {item.percentage}%
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 4 }}>
          {audienceData.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
                px: 1, // Added padding for better spacing
                backgroundColor: theme.palette.background.default,
                borderRadius: 2,
                py: 1,
                transition: 'background-color 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center', color: theme.palette.text.primary }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    mr: 1,
                  }}
                />
                {item.name}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                ${item.amount.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Competitors</Typography>
                <ArrowForwardIcon />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  height: 200,
                }}
              >
                {competitorsData.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "18%",
                    }}
                  >
                    <Box sx={{ width: "100%", mb: 1 }}>
                      {item.growth && (
                        <Chip
                          label={item.growth}
                          size="small"
                          color={
                            item.growth.includes("+") ? "primary" : "secondary"
                          }
                          sx={{ mb: 1 }}
                        />
                      )}
                      <LinearProgress
                        variant="determinate"
                        value={item.growth ? parseInt(item.growth) : 0}
                        sx={{
                          height: 100,
                          borderRadius: 2,
                          backgroundColor: "#E0E0E0",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 2,
                            backgroundColor: item.growth
                              ? "#4CAF50"
                              : "#E0E0E0",
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="body2">{item.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default AnalyticsDashboard;
