// // src/components/SubjectWiseReports.js
// import React from 'react';
// import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';;

// const SubjectWiseReports = () => {
//   const data = [
//     { subject: 'Subject 1', totalClasses: 30, attendedClasses: 25, requiredClasses: 40, minimumClassesToPass: 15 },
//     { subject: 'Subject 2', totalClasses: 35, attendedClasses: 30, requiredClasses: 40, minimumClassesToPass: 10 },
//     { subject: 'Subject 3', totalClasses: 40, attendedClasses: 35, requiredClasses: 40, minimumClassesToPass: 5 },
//   ];

//   return (
//     <>
//       <Typography variant="h6">Subject-wise Reports</Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Subject</TableCell>
//             <TableCell>Total Classes</TableCell>
//             <TableCell>Attended Classes</TableCell>
//             <TableCell>Required Classes</TableCell>
//             <TableCell>Minimum Classes to Pass</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row, index) => (
//             <TableRow key={index}>
//               <TableCell>{row.subject}</TableCell>
//               <TableCell>{row.totalClasses}</TableCell>
//               <TableCell>{row.attendedClasses}</TableCell>
//               <TableCell>{row.requiredClasses}</TableCell>
//               <TableCell>{row.minimumClassesToPass}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </>
//   );
// };

// export default SubjectWiseReports;
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Paper } from '@mui/material';

const SubjectWiseReports = () => {
  const data = [
    { subject: 'Subject 1', totalClasses: 30, attendedClasses: 25, requiredClasses: 40, minimumClassesToPass: 15 },
    { subject: 'Subject 2', totalClasses: 35, attendedClasses: 30, requiredClasses: 40, minimumClassesToPass: 10 },
    { subject: 'Subject 3', totalClasses: 40, attendedClasses: 35, requiredClasses: 40, minimumClassesToPass: 5 },
  ];

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6">Subject-wise Reports</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell>Total Classes</TableCell>
            <TableCell>Attended Classes</TableCell>
            <TableCell>Required Classes</TableCell>
            <TableCell>Minimum Classes to Pass</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.totalClasses}</TableCell>
              <TableCell>{row.attendedClasses}</TableCell>
              <TableCell>{row.requiredClasses}</TableCell>
              <TableCell>{row.minimumClassesToPass}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default SubjectWiseReports;
