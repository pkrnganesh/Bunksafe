import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const CGPADisplay = ({ currentCGPA, goalCGPA }) => {
  const calculateProgress = () => Math.min((currentCGPA / goalCGPA) * 100, 100);

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h2" fontWeight="bold" color="primary">{currentCGPA.toFixed(2)}</Typography>
      <Typography variant="body1" color="text.secondary">Current CGPA</Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>Progress towards goal CGPA of {goalCGPA}</Typography>
        <Box sx={{ position: 'relative', height: 8, borderRadius: 4, bgcolor: 'rgba(98, 0, 238, 0.2)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${calculateProgress()}%` }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              height: '100%',
              borderRadius: 4,
              background: 'linear-gradient(90deg, #6200EE 0%, #BB86FC 100%)',
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 1 }}>{calculateProgress().toFixed(1)}%</Typography>
      </Box>
    </Box>
  );
};

export default CGPADisplay;
