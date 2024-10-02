// components/CGPACalculator.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CGPAForm from '../components/Cgpa/CGPAForm';
import SGPAForm from '../components/Cgpa/SGPAForm';
import MarksForm from '../components/Cgpa/MarksForm';
import ActionSpeedDial from '../components/Cgpa/ActionSpeedDial';
import CustomSnackbar from '../components/Cgpa/CustomSnackbar';
import { calculateCGPA } from '../components/Cgpa/calculations';

const CGPACalculator = () => {
  const [subjects, setSubjects] = useState([
    { name: 'Subject 1', grade: 'A', credits: 3 },
    { name: 'Subject 2', grade: 'B', credits: 3 },
  ]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [goalCGPA, setGoalCGPA] = useState(8.5);
  const [calculatorType, setCalculatorType] = useState('CGPA');
  const [gradeScale, setGradeScale] = useState(10);
  const [cgpaHistory, setCGPAHistory] = useState([]);
  const [currentCGPA, setCurrentCGPA] = useState(0);

  useEffect(() => {
    const calculatedCGPA = calculateCGPA(subjects, gradeScale);
    const interval = setInterval(() => {
      setCurrentCGPA((prevCGPA) => {
        const newCGPA = prevCGPA + 0.01;
        return newCGPA > calculatedCGPA ? calculatedCGPA : newCGPA;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [subjects, gradeScale]);

  const handleSave = () => {
    const currentCGPA = calculateCGPA(subjects, gradeScale);
    setCGPAHistory([...cgpaHistory, { date: new Date().toLocaleDateString(), cgpa: currentCGPA }]);
    setSnackbar({ open: true, message: 'Progress saved successfully!', severity: 'success' });
  };

  const handleReset = () => {
    setSubjects([{ name: 'Subject 1', grade: 'A', credits: 3 }]);
    setSnackbar({ open: true, message: 'Data reset successfully!', severity: 'info' });
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
        <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Academic Performance Calculator</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Calculator Type</InputLabel>
                <Select value={calculatorType} onChange={(e) => setCalculatorType(e.target.value)} label="Calculator Type">
                  <MenuItem value="CGPA">CGPA Calculator</MenuItem>
                  <MenuItem value="SGPA">SGPA to CGPA</MenuItem>
                  <MenuItem value="Marks">Marks Calculator</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Grade Scale</InputLabel>
                <Select value={gradeScale} onChange={(e) => setGradeScale(e.target.value)} label="Grade Scale">
                  <MenuItem value={3}>3-point scale</MenuItem>
                  <MenuItem value={5}>5-point scale</MenuItem>
                  <MenuItem value={10}>10-point scale</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>

        <AnimatePresence>
          {calculatorType === 'CGPA' && (
            <CGPAForm subjects={subjects} setSubjects={setSubjects} gradeScale={gradeScale} setSnackbar={setSnackbar} />
          )}
          {calculatorType === 'SGPA' && <SGPAForm setSnackbar={setSnackbar} />}
          {calculatorType === 'Marks' && <MarksForm setSnackbar={setSnackbar} />}
        </AnimatePresence>
      </motion.div>

      <ActionSpeedDial handleSave={handleSave} handleReset={handleReset} setSnackbar={setSnackbar} />
      <CustomSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </>
  );
};

export default CGPACalculator;