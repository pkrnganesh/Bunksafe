import React from 'react';
import { Card, CardContent, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const CGPAHistory = ({ cgpaHistory }) => (
  <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', mb: 3 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>CGPA History</Typography>
      <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>CGPA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cgpaHistory.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.cgpa.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
);

export default CGPAHistory;
