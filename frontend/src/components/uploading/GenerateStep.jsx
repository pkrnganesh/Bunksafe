// import React from 'react';
// import { Box, Typography, CircularProgress } from '@mui/material';
// import { Send } from '@mui/icons-material';
// import { motion } from 'framer-motion';
// import { StyledPaper, StyledButton } from './styles';
// // import { Generateanalysis } from '../api/Generation';

// const GenerateStep = ({ attendanceFile, fromDate, toDate, attendanceRequirement }) => {
//   const [isGenerating, setIsGenerating] = React.useState(false);
//   const [generationComplete, setGenerationComplete] = React.useState(false);

//   const handleGenerateAnalysis = async () => {
//     if (!attendanceFile || !fromDate || !toDate || !attendanceRequirement) {
//       alert('Please ensure all fields are filled and a file is uploaded.');
//       return;
//     }

//     setIsGenerating(true);
//     console.log('Attendance File:', attendanceFile);
//     console.log('From Date:', fromDate);
//     console.log('To Date:', toDate);
//     console.log('Attendance Requirement:', attendanceRequirement);

//     try {
//       // Call the API to generate analysis
//     //   await Generateanalysis({ file: attendanceFile, percentage: attendanceRequirement, fromDate, toDate });
//       setGenerationComplete(true);
//     } catch (error) {
//       console.error('Error generating analysis:', error);
//       alert('An error occurred while generating the analysis. Please try again.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <StyledPaper>
//       <Box textAlign="center">
//         <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
//           Ready to Generate Analysis
//         </Typography>
//         <Typography variant="body1" sx={{ mb: 4 }}>
//           Click the button below to start generating your attendance analysis.
//         </Typography>
//         <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//           <StyledButton
//             variant="contained"
//             size="large"
//             startIcon={isGenerating ? <CircularProgress size={24} color="inherit" /> : <Send />}
//             onClick={handleGenerateAnalysis}
//             disabled={isGenerating}
//           >
//             {isGenerating ? 'Generating...' : 'Generate Analysis'}
//           </StyledButton>
//         </motion.div>
//         {generationComplete && (
//           <Typography variant="body1" color="success.main" sx={{ mt: 4, fontWeight: 500 }}>
//             Analysis generation complete! You can now download or view your results.
//           </Typography>
//         )}
//       </Box>
//     </StyledPaper>
//   );
// };

// export default GenerateStep;