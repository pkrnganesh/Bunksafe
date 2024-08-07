// src/components/ViewEditTimetable.js
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Paper, Typography } from '@mui/material';

const ViewEditTimetable = () => {
  const [timetable, setTimetable] = useState([
    { day: 'Monday', subjects: ['Math', 'English', 'Python'] },
    { day: 'Monday', subjects: ['English', 'Maths', 'JS'] },
  ]);

  const handleSubjectChange = (dayIndex, subjectIndex, newValue) => {
    const newTimetable = [...timetable];
    newTimetable[dayIndex].subjects[subjectIndex] = newValue;
    setTimetable(newTimetable);
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>View/Edit Timetable</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Subjects</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timetable.map((row, dayIndex) => (
            <TableRow key={dayIndex}>
              <TableCell>{row.day}</TableCell>
              <TableCell>
                {row.subjects.map((subject, subjectIndex) => (
                  <TextField
                    key={subjectIndex}
                    value={subject}
                    onChange={(e) => handleSubjectChange(dayIndex, subjectIndex, e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Save Changes
        </Button>
        <Button variant="contained">Cancel</Button>
      </div>
    </Paper>
  );
};

export default ViewEditTimetable;