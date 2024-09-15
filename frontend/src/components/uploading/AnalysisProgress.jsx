import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { CloudUpload, DataUsage, CalendarToday, AssessmentOutlined, DoneAll } from '@mui/icons-material';

const GlassPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const ProgressCircle = styled(motion.div)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  border: '3px solid',
  borderColor: theme.palette.primary.main,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: theme.spacing(2),
}));

const steps = [
  { name: "Extracting Text", icon: CloudUpload },
  { name: "Processing Text", icon: DataUsage },
  { name: "Calculating Valid Days", icon: CalendarToday },
  { name: "Calculating Attendance", icon: AssessmentOutlined },
  { name: "Creating Calendar", icon: DoneAll },
];

const AnalysisProgress = ({ isGeneratingAnalysis }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isGeneratingAnalysis) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isGeneratingAnalysis]);

  return (
    <AnimatePresence>
      {isGeneratingAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <GlassPaper elevation={0}>
            <Typography variant="h5" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
              Generating Analysis
            </Typography>
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <ProgressCircle
                    animate={{
                      scale: index === currentStep ? [1, 1.2, 1] : 1,
                      rotate: index <= currentStep ? 360 : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: index === currentStep ? Infinity : 0,
                      repeatType: "reverse",
                    }}
                  >
                    <step.icon color={index <= currentStep ? "primary" : "disabled"} />
                  </ProgressCircle>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: index === currentStep ? 'bold' : 'normal',
                        color: index <= currentStep ? 'text.primary' : 'text.secondary',
                      }}
                    >
                      {step.name}
                    </Typography>
                    {index === currentStep && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4 }}
                        style={{
                          height: '2px',
                          background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)',
                          borderRadius: '2px',
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </motion.div>
            ))}
          </GlassPaper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnalysisProgress;