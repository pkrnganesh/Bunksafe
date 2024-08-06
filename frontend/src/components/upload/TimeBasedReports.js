// // src/components/TimeBasedReports.js
// import React from 'react';
// import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';;

// const TimeBasedReports = () => {
//   const data = [
//     { percentage: '30%', totalDaysAttended: 20, daysRequired: 25, potentialSkipDays: 5 },
//     { percentage: '50%', totalDaysAttended: 30, daysRequired: 35, potentialSkipDays: 5 },
//     { percentage: '70%', totalDaysAttended: 40, daysRequired: 45, potentialSkipDays: 5 },
//   ];

//   return (
//     <>
//       <Typography variant="h6">Time-based Reports</Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Percentage</TableCell>
//             <TableCell>Total Days Attended</TableCell>
//             <TableCell>Days Required</TableCell>
//             <TableCell>Potential Skip Days</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row, index) => (
//             <TableRow key={index}>
//               <TableCell>{row.percentage}</TableCell>
//               <TableCell>{row.totalDaysAttended}</TableCell>
//               <TableCell>{row.daysRequired}</TableCell>
//               <TableCell>{row.potentialSkipDays}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </>
//   );
// };

// export default TimeBasedReports;
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Paper } from '@mui/material';

const TimeBasedReports = () => {
  const data = [
    { percentage: '30%', totalDaysAttended: 20, daysRequired: 25, potentialSkipDays: 5 },
    { percentage: '50%', totalDaysAttended: 30, daysRequired: 35, potentialSkipDays: 5 },
    { percentage: '70%', totalDaysAttended: 40, daysRequired: 45, potentialSkipDays: 5 },
    { percentage: '80%', totalDaysAttended: 40, daysRequired: 45, potentialSkipDays: 5 },
    { percentage: '90%', totalDaysAttended: 40, daysRequired: 45, potentialSkipDays: 5 }
  ];

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6">Time-based Reports</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Percentage</TableCell>
            <TableCell>Total Days Attended</TableCell>
            <TableCell>Days Required</TableCell>
            <TableCell>Potential Skip Days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.percentage}</TableCell>
              <TableCell>{row.totalDaysAttended}</TableCell>
              <TableCell>{row.daysRequired}</TableCell>
              <TableCell>{row.potentialSkipDays}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TimeBasedReports;
