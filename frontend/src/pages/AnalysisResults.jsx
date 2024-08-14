import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveCalendar } from '@nivo/calendar';
import { Typography, Box, Grid, Button, TextField, List, ListItem, ListItemText, IconButton, Chip } from '@mui/material';
import { styled } from '@mui/system';
import { Add, Delete, DateRange } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#87CEEB', // Sky Blue
    },
    background: {
      default: '#F0F8FF', // Alice Blue
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

const GlassContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.7)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(4px)',
  borderRadius: '10px',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  padding: theme.spacing(3),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 12px 48px 0 rgba(31, 38, 135, 0.5)',
  },
}));

const FloatingButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #87CEEB 30%, #00BFFF 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  transition: 'all 0.3s',
  '&:hover': {
    boxShadow: '0 6px 10px 4px rgba(33, 203, 243, .5)',
  },
}));

const AnalysisResults = () => {
  const [newHoliday, setNewHoliday] = useState('');

  const subjectData = {
    DWDM: { total: 29, required75: 22, required40: 12 },
    OOAD: { total: 32, required75: 24, required40: 13 },
    DML_LAB: { total: 15, required75: 12, required40: 6 },
    DM_LAB: { total: 18, required75: 14, required40: 8 },
    ADS_LAB: { total: 18, required75: 14, required40: 8 },
    'OE-1': { total: 16, required75: 12, required40: 7 },
    QA: { total: 16, required75: 12, required40: 7 },
    SS: { total: 16, required75: 12, required40: 7 },
    CAD: { total: 33, required75: 25, required40: 14 },
    ML: { total: 30, required75: 23, required40: 12 }
  };

  const timetable = {
    Monday: ['DWDM', 'OOAD', 'DML LAB'],
    Tuesday: ['DM LAB', 'ADS LAB'],
    Wednesday: ['OE-1', 'QA', 'SS'],
    Thursday: ['CAD', 'ML'],
    Friday: ['ML', 'DWDM'],
    Saturday: ['OOAD', 'CAD']
  };

  const totalDays = 96;
  const daysNeededToAttend = 72;
  const daysCanSkip = 24;

  const holidays = ['New Year', 'Independence Day', 'Christmas'];

  const attendingdates = ['2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-08', '2024-03-22', '2024-03-23', '2024-03-26', '2024-03-27', '2024-03-28'];
  const skipingdates = ['2024-01-01', '2024-01-07', '2024-01-14', '2024-01-15', '2024-01-21'];

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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(120deg, #87CEEB 0%, #E0F7FA 100%)',
          padding: 4,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" gutterBottom align="center" sx={{ color: 'white', fontWeight: 700, textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
            Attendance Analysis Dashboard
          </Typography>

          <Grid container spacing={4}>
            {/* Summary Cards */}
            <Grid item xs={12} md={4}>
              <GlassContainer>
                <Typography variant="h4" gutterBottom sx={{ color: '#4A90E2' }}>Total Days</Typography>
                <Typography variant="h2" sx={{ fontWeight: 700, color: '#333' }}>{totalDays}</Typography>
              </GlassContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <GlassContainer>
                <Typography variant="h4" gutterBottom sx={{ color: '#4A90E2' }}>Days to Attend</Typography>
                <Typography variant="h2" sx={{ fontWeight: 700, color: '#333' }}>{daysNeededToAttend}</Typography>
              </GlassContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <GlassContainer>
                <Typography variant="h4" gutterBottom sx={{ color: '#4A90E2' }}>Days Can Skip</Typography>
                <Typography variant="h2" sx={{ fontWeight: 700, color: '#333' }}>{daysCanSkip}</Typography>
              </GlassContainer>
            </Grid>

            {/* Subject-wise Attendance */}
            <Grid item xs={12}>
              <GlassContainer sx={{ height: 500 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#4A90E2' }}>Subject-wise Attendance</Typography>
                <ResponsiveBar
                  data={Object.entries(subjectData).map(([subject, data]) => ({
                    subject,
                    'Total Classes': data.total,
                    'Required for 75%': data.required75,
                    'Required for 40%': data.required40,
                  }))}
                  keys={['Total Classes', 'Required for 75%', 'Required for 40%']}
                  indexBy="subject"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: 'linear' }}
                  indexScale={{ type: 'band', round: true }}
                  colors={['#ff7f0e', '#2ca02c', '#d62728']}
                  borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: 'Subject',
                    legendPosition: 'middle',
                    legendOffset: 40
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Number of Classes',
                    legendPosition: 'middle',
                    legendOffset: -40
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  legends={[
                    {
                      dataFrom: 'keys',
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: 'left-to-right',
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemOpacity: 1
                          }
                        }
                      ]
                    }
                  ]}
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  tooltip={({ id, value, color }) => (
                    <strong style={{ color }}>
                      {id}: {value}
                    </strong>
                  )}
                />
              </GlassContainer>
            </Grid>

            {/* Attendance Calendar */}
            <Grid item xs={12}>
              <GlassContainer sx={{ height: 300 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#4A90E2' }}>Attendance Calendar</Typography>
                <ResponsiveCalendar
                  data={[
                    ...attendingdates.map(date => ({ day: date, value: 1 })),
                    ...skipingdates.map(date => ({ day: date, value: 0 }))
                  ]}
                  from={attendingdates[0]}
                  to={attendingdates[attendingdates.length - 1]}
                  emptyColor="#eeeeee"
                  colors={['#ff0000', '#00ff00']}
                  margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                  yearSpacing={40}
                  monthBorderColor="#ffffff"
                  dayBorderWidth={2}
                  dayBorderColor="#ffffff"
                  legends={[
                    {
                      anchor: 'bottom-right',
                      direction: 'row',
                      translateY: 36,
                      itemCount: 2,
                      itemWidth: 42,
                      itemHeight: 36,
                      itemsSpacing: 14,
                      itemDirection: 'right-to-left'
                    }
                  ]}
                  tooltip={({ day, value }) => (
                    <strong>
                      {day}: {value === 1 ? 'Attended' : 'Skipped'}
                    </strong>
                  )}
                />
              </GlassContainer>
            </Grid>

            {/* Holidays */}
            <Grid item xs={12} md={6}>
              <GlassContainer>
                <Typography variant="h4" gutterBottom sx={{ color: '#4A90E2' }}>Holidays</Typography>
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
                  <FloatingButton onClick={handleAddHoliday}>
                    Add
                  </FloatingButton>
                </Box>
                <List>
                  {holidays.map((holiday) => (
                    <ListItem key={holiday} secondaryAction={
                      <IconButton edge="end" onClick={() => handleDeleteHoliday(holiday)}>
                        <Delete />
                      </IconButton>
                    }>
                      <ListItemText primary={holiday} />
                    </ListItem>
                  ))}
                </List>
              </GlassContainer>
            </Grid>

            {/* Timetable */}
            <Grid item xs={12} md={6}>
              <GlassContainer>
                <Typography variant="h4" gutterBottom sx={{ color: '#4A90E2' }}>Timetable</Typography>
                {Object.entries(timetable).map(([day, subjects]) => (
                  <Box key={day} mb={2}>
                    <Typography variant="h6">{day}</Typography>
                    <Box display="flex" flexWrap="wrap">
                      {subjects.map((subject, index) => (
                        <Chip
                          key={index}
                          label={subject}
                          onDelete={() => handleDeleteSubject(day, index)}
                          sx={{ m: 0.5 }}
                        />
                      ))}
                      <IconButton onClick={() => handleAddSubject(day)}>
                        <Add />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </GlassContainer>
            </Grid>
          </Grid>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
};

export default AnalysisResults;
