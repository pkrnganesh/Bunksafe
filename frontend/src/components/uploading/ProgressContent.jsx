import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Person, Group, Tune, CloudUpload, Rocket } from "@mui/icons-material";
import { motion, AnimatePresence } from 'framer-motion';

const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
    primary: {
      main: '#2196F3',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: '15px',
  padding: theme.spacing(3),
  maxWidth: 450,
  width: '100%',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
}));

const StepIcon = styled(motion.div)(({ color, status }) => ({
  backgroundColor: color,
  borderRadius: '50%',
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '20px',
  marginRight: '15px',
  opacity: status === 'current' ? 1 : 0.5,
}));

const StepContent = styled(Box)(({ status }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '15px',
  opacity: status === 'current' ? 1 : 0.5,
}));

const steps = [
  { label: "Extracting Text", icon: Person, color: '#FF6B6B', text: "We're extracting the content from your uploaded files." },
  { label: "Processing Text", icon: Group, color: '#4ECDC4', text: "Analyzing the extracted text to identify key information." },
  { label: "Calculating Valid Days", icon: Tune, color: '#45B7D1', text: "Determining the valid days based on the processed text." },
  { label: "Calculating Attendance", icon: CloudUpload, color: '#F9A825', text: "Crunching the numbers to calculate your attendance percentage." },
  { label: "Creating Calendar", icon: Rocket, color: '#6C63FF', text: "Finalizing your attendance calendar with all the details." },
];

const ProgressContent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setActiveStep((prevStep) => (prevStep + 1) % steps.length);
          return 0;
        }
        return Math.min(oldProgress + 25, 100);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const renderStep = (step, index) => {
    let status = 'next';
    if (index === activeStep) status = 'current';
    if (index < activeStep) status = 'completed';

    return (
      <StepContent key={index} status={status}>
        <StepIcon 
          color={step.color} 
          status={status}
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
        >
          <step.icon fontSize="small" />
        </StepIcon>
        <Box>
          <Typography variant="body1" fontWeight={status === 'current' ? "bold" : "normal"}>
            {step.label}
          </Typography>
        </Box>
      </StepContent>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <StyledBox>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary" align="center" mb={2}>
            Generating Analysis
          </Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4, mb: 2 }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeStep > 0 && renderStep(steps[activeStep - 1], activeStep - 1)}
              {renderStep(steps[activeStep], activeStep)}
              {activeStep < steps.length - 1 && renderStep(steps[activeStep + 1], activeStep + 1)}
            </motion.div>
          </AnimatePresence>
          <Typography variant="body2" align="center" mt={2} color="text.secondary">
            Step {activeStep + 1} of {steps.length}
          </Typography>
          <Typography variant="body1" align="center" mt={2} color="primary" fontWeight="medium">
            {steps[activeStep].text}
          </Typography>
        </StyledBox>
      </Box>
    </ThemeProvider>
  );
};

export default ProgressContent;
