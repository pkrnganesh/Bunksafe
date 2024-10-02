import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { calculateSGPAtoCGPA } from './calculations';

const SGPAForm = ({ setSnackbar }) => {
  const [previousCGPA, setPreviousCGPA] = useState('');
  const [previousCredits, setPreviousCredits] = useState('');
  const [currentSGPA, setCurrentSGPA] = useState('');
  const [currentCredits, setCurrentCredits] = useState('');

  const handleCalculate = () => {
    const result = calculateSGPAtoCGPA(previousCGPA, previousCredits, currentSGPA, currentCredits);
    if (result.success) {
      setSnackbar({ open: true, message: `Your new CGPA is ${result.cgpa.toFixed(2)}`, severity: 'success' });
    } else {
      setSnackbar({ open: true, message: result.message, severity: 'error' });
    }
  };

  return (
    <motion.div
      key="sgpa-calculator"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>SGPA to CGPA Calculator</Typography>
          <TextField label="Previous CGPA" type="number" value={previousCGPA} onChange={(e) => setPreviousCGPA(e.target.value)} fullWidth margin="normal" />
          <TextField label="Previous Total Credits" type="number" value={previousCredits} onChange={(e) => setPreviousCredits(e.target.value)} fullWidth margin="normal" />
          <TextField label="Current SGPA" type="number" value={currentSGPA} onChange={(e) => setCurrentSGPA(e.target.value)} fullWidth margin="normal" />
          <TextField label="Current Semester Credits" type="number" value={currentCredits} onChange={(e) => setCurrentCredits(e.target.value)} fullWidth margin="normal" />
          <Button onClick={handleCalculate} variant="contained" color="primary" sx={{ mt: 2 }}>Calculate New CGPA</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SGPAForm;
