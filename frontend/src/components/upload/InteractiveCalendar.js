import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Typography } from '@mui/material';

const InteractiveCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Typography variant="h6">Interactive Calendar</Typography>
      <Calendar onChange={setDate} value={date} />
    </>
  );
};

export default InteractiveCalendar;