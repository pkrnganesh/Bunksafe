import React from 'react';
import { Box, Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const NavigationButtons = ({ activeStep, steps, handleBack, handleNext, uploadComplete }) => {
  return (
    <Box mt={4} display="flex" justifyContent="space-between">
      <Button
        startIcon={<ArrowBack />}
        disabled={activeStep === 0}
        onClick={handleBack}
        variant="outlined"
        sx={{ borderRadius: 2 }}
      >
        Back
      </Button>
      <Button
        endIcon={<ArrowForward />}
        variant="contained"
        color="primary"
        onClick={handleNext}
        disabled={activeStep === steps.length - 1 || (activeStep === 0 && !uploadComplete)}
        sx={{ borderRadius: 2 }}
      >
        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </Box>
  );
};

export default NavigationButtons;