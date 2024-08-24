// import React from 'react';
// import { Box, Typography, Grid, TextField } from '@mui/material';
// import { DateRange, PercentOutlined } from '@mui/icons-material';
// import { StyledPaper } from './styles';

// const ParametersStep = ({ fromDate, setFromDate, toDate, setToDate, attendanceRequirement, setAttendanceRequirement }) => {
//   return (
//     <StyledPaper>
//       <Box>
//         <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
//           Set Analysis Parameters
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="From Date"
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//               fullWidth
//               InputProps={{
//                 startAdornment: <DateRange color="primary" />,
//               }}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="To Date"
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//               fullWidth
//               InputProps={{
//                 startAdornment: <DateRange color="primary" />,
//               }}
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField 
//               label="Attendance Requirement"
//               type="number"
//               value={attendanceRequirement}
//               onChange={(e) => setAttendanceRequirement(Math.max(0, Math.min(100, Number(e.target.value))))}
//               InputProps={{
//                 endAdornment: '%',
//                 startAdornment: <PercentOutlined color="primary" />,
//               }}
//               fullWidth
//               required
//               inputProps={{ min: 0, max: 100 }}
//             />
//           </Grid>
//         </Grid>
//       </Box>
//     </StyledPaper>
//   );
// };

// export default ParametersStep;