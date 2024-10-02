import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { calculateMarksPercentage } from './calculations';

const MarksForm = ({ setSnackbar }) => {
  const [totalMarks, setTotalMarks] = useState('');
  const [obtainedMarks, setObtainedMarks] = useState('');

  const handleCalculate = () => {
    const result = calculateMarksPercentage(totalMarks, obtainedMarks);
    if (result.success) {
      setSnackbar({ open: true, message: `Your percentage is ${result.percentage.toFixed(2)}%`, severity: 'success' });
    } else {
      setSnackbar({ open: true, message: result.message, severity: 'error' });
    }
  };

  return (
    <motion.div
      key="marks-calculator"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Marks Calculator</Typography>
          <TextField label="Total Marks" type="number" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} fullWidth margin="normal" />
          <TextField label="Obtained Marks" type="number" value={obtainedMarks} onChange={(e) => setObtainedMarks(e.target.value)} fullWidth margin="normal" />
          <Button onClick={handleCalculate} variant="contained" color="primary" sx={{ mt: 2 }}>Calculate Percentage</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MarksForm;

