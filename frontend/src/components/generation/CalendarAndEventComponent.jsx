import React, { useState } from 'react';
import { Box, Grid, Typography, Paper, TextField, Select, MenuItem, Button, Avatar } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CustomCalendar = ({ selectedDate, onDateChange, highlightedDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isHighlighted = (date) => {
    return highlightedDates.some(d => d.date === date && (d.color === 'red' || d.color === 'green'));
  };

  const getHighlightColor = (date) => {
    const highlighted = highlightedDates.find(d => d.date === date);
    return highlighted ? highlighted.color : 'transparent';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">{`${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}</Typography>
        <Box>
          <Button onClick={previousMonth}><ArrowBackIosNewIcon /></Button>
          <Button onClick={nextMonth}><ArrowForwardIosIcon /></Button>
        </Box>
      </Box>
      <Grid container columns={7} sx={{ textAlign: 'center' }}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <Grid item xs={1} key={day}>
            <Typography variant="body2">{day}</Typography>
          </Grid>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <Grid item xs={1} key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(index + 1).padStart(2, '0')}`;
          return (
            <Grid item xs={1} key={date} sx={{ p: 1 }}>
              <Button
                onClick={() => onDateChange(date)}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: date === selectedDate ? 'primary.main' : 'transparent',
                  color: date === selectedDate ? 'white' : 'inherit',
                  '&:hover': {
                    backgroundColor: date === selectedDate ? 'primary.dark' : 'action.hover',
                  },
                  position: 'relative',
                }}
              >
                {index + 1}
                {isHighlighted(date) && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: getHighlightColor(date),
                    }}
                  />
                )}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

const CalendarAndEventComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventTitle, setEventTitle] = useState('');
  const [startTime, setStartTime] = useState('08:45');
  const [endTime, setEndTime] = useState('10:20');

  const people = [
    { name: 'John Hudges', email: 'johnhudges@gmail.com', avatar: 'JH' },
    { name: 'John LBF', email: 'JordanLBF10@gmail.com', avatar: 'JL' },
    { name: 'John Hawkins', email: 'Hawkinsjohn@gmail.com', avatar: 'JH' },
    { name: 'John Cena', email: 'Johncena19@gmail.com', avatar: 'JC' },
  ];

  const highlightedDates = [
    { date: '2023-08-16', color: 'red' },
    { date: '2023-08-20', color: 'green' },
  ];

  return (
    <Paper sx={{ p: 3, borderRadius: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Event Scheduler</Typography>
          <TextField
            fullWidth
            placeholder="Add something title, like 'Running'"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
            Add people
          </Button>
          {people.map((person, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ mr: 1 }}>{person.avatar}</Avatar>
              <Box>
                <Typography variant="body2">{person.name}</Typography>
                <Typography variant="caption" color="text.secondary">{person.email}</Typography>
              </Box>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomCalendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            highlightedDates={highlightedDates}
          />
        </Grid>
      </Grid>

      
    </Paper>
  );
};

export default CalendarAndEventComponent;