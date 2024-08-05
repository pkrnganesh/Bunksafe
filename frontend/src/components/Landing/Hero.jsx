// components/Hero.js
import React from 'react';
import { Box, Typography, Fab } from '@mui/material';
import { HowToReg } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import TypewriterEffect from './TypewriterEffect';

const Hero = () => {
  return (
    <Parallax speed={-10}>
      <Box sx={{ pt: 8, pb: 6, textAlign: 'center', position: 'relative', height: '100vh' }}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            <TypewriterEffect text="Attendance Management System" />
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Efficiently manage attendance and improve student performance
          </Typography>
          <Fab
            variant="extended"
            color="primary"
            sx={{ mt: 2 }}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#get-started"
          >
            <HowToReg sx={{ mr: 1 }} />
            LET'S GET STARTED
          </Fab>
        </Box>
      </Box>
    </Parallax>
  );
};

export default Hero;