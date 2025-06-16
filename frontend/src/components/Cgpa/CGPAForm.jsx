import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TextField, Select, MenuItem, Button, Paper } from '@mui/material';
import { gradeScales } from './calculations';

const CGPAForm = ({ subjects, setSubjects, gradeScale, setSnackbar }) => {
  const handleChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: `Subject ${subjects.length + 1}`, grade: 'A', credits: 3 }]);
    setSnackbar({ open: true, message: 'Subject added successfully!', severity: 'success' });
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
    setSnackbar({ open: true, message: 'Subject removed successfully!', severity: 'info' });
  };

  return (
    <motion.div
      key="cgpa-calculator"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>CGPA Calculator</Typography>
          <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Credits</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjects.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        value={subject.name}
                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={subject.grade}
                        onChange={(e) => handleChange(index, 'grade', e.target.value)}
                        variant="outlined"
                        size="small"
                        fullWidth
                      >
                        {Object.keys(gradeScales[gradeScale]).map((grade) => (
                          <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={subject.credits}
                        onChange={(e) => handleChange(index, 'credits', parseInt(e.target.value))}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => removeSubject(index)} color="secondary">Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={addSubject} variant="contained" color="primary" sx={{ mt: 2 }}>Add Subject</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CGPAForm;
