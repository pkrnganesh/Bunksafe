// src/components/AnalysisPeriod.js
import React, { useState } from 'react';
import { TextField } from '@mui/material';

const AnalysisPeriod = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <>
      <TextField
        label="From Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="To Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
    </>
  );
};

export default AnalysisPeriod;
