import React, { useState } from 'react';
import { 
  Card, CardContent, Typography, TextField, Button, IconButton, 
  Box, Select, MenuItem, FormControl, InputLabel, Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { motion, AnimatePresence } from 'framer-motion';

const gradeScales = {
  3: { 'A': 3, 'B': 2, 'C': 1, 'F': 0 },
  5: { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'F': 0 },
  10: { 'A+': 10, 'A': 9, 'A-': 8, 'B+': 7, 'B': 6, 'B-': 5, 'C+': 4, 'C': 3, 'C-': 2, 'D': 1, 'F': 0 }
};

export const CGPACalculator = ({ subjects, setSubjects, addSubject, removeSubject, handleChange, calculateCGPA, setSnackbar, gradeScale }) => {
  return (
    <Card sx={{ p: 2, mb: 2,borderRadius:'15px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>CGPA Calculator</Typography>
        <AnimatePresence>
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card sx={{ mb: 2, p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Subject Name"
                      value={subject.name}
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Grade</InputLabel>
                      <Select
                        value={subject.grade}
                        onChange={(e) => handleChange(index, 'grade', e.target.value)}
                        label="Grade"
                      >
                        {Object.keys(gradeScales[gradeScale]).map((grade) => (
                          <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Credits"
                      type="number"
                      value={subject.credits}
                      onChange={(e) => handleChange(index, 'credits', parseInt(e.target.value) || 0)}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <IconButton onClick={() => removeSubject(index)} color="error" size="large">
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        <Button startIcon={<AddIcon />} onClick={addSubject} variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Subject
        </Button>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Calculated CGPA: {calculateCGPA()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const SGPAToCGPA = ({ setSnackbar }) => {
  const [sgpa, setSGPA] = useState('');
  const [cgpa, setCGPA] = useState('');
  const [semesters, setSemesters] = useState('');
  const [result, setResult] = useState('');

  const convertSGPAtoCGPA = () => {
    if (!sgpa || !cgpa || !semesters) {
      setSnackbar({ open: true, message: 'Please fill in all fields', severity: 'error' });
      return;
    }
    const newCGPA = ((parseFloat(cgpa) * (parseInt(semesters) - 1) + parseFloat(sgpa)) / parseInt(semesters)).toFixed(2);
    setResult(newCGPA);
    setSnackbar({ open: true, message: 'SGPA converted to CGPA successfully!', severity: 'success' });
  };

  return (
    <Card elevation={3} sx={{ p: 2, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>SGPA to CGPA Converter</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Current CGPA"
              type="number"
              value={cgpa}
              onChange={(e) => setCGPA(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="SGPA"
              type="number"
              value={sgpa}
              onChange={(e) => setSGPA(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Number of Semesters"
              type="number"
              value={semesters}
              onChange={(e) => setSemesters(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={convertSGPAtoCGPA} fullWidth sx={{ mt: 2 }}>
          Convert SGPA to CGPA
        </Button>
        <Typography variant="h5" sx={{ mt: 2 }}>
          New CGPA: {result}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const MarksCalculator = ({ setSnackbar }) => {
  const [marks, setMarks] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [percentage, setPercentage] = useState('');

  const calculatePercentage = () => {
    if (!marks || !totalMarks) {
      setSnackbar({ open: true, message: 'Please fill in all fields', severity: 'error' });
      return;
    }
    const calculatedPercentage = ((parseFloat(marks) / parseFloat(totalMarks)) * 100).toFixed(2);
    setPercentage(calculatedPercentage);
    setSnackbar({ open: true, message: 'Percentage calculated successfully!', severity: 'success' });
  };

  return (
    <Card elevation={3} sx={{ p: 2, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Marks Percentage Calculator</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Marks Obtained"
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Marks"
              type="number"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={calculatePercentage} fullWidth sx={{ mt: 2 }}>
          Calculate Percentage
        </Button>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Percentage: {percentage}%
        </Typography>
      </CardContent>
    </Card>
  );
};