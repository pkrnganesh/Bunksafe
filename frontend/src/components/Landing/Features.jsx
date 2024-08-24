import React from 'react';
import { Box, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import thought from './thought.svg';
import { motion } from 'framer-motion';

const StyledCard = styled(motion(Card))(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const NumberCircle = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(110, 142, 251, 0.3)',
}));

const Background = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'white', // Update the background color to white
  zIndex: -1,
});

const AnimatedShape = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: 'rgba(110, 142, 251, 0.1)',
  borderRadius: '50%',
}));




const Features = () => {
  const theme = useTheme();

  const steps = [
    { number: 1, title: 'Input Timetable', description: 'Easily enter your semester timetable and attendance requirements using our user-friendly interface.' },
    { number: 2, title: 'Track Attendance', description: 'Monitor your attendance in real-time with our advanced tracking system.' },
    { number: 3, title: 'Get Reminders', description: 'Receive personalized reminders to help you stay on top of your attendance goals.' },
    { number: 4, title: 'Optimize Schedule', description: 'Adjust your schedule dynamically to ensure you meet your attendance targets effortlessly.' },
  ];

  const shapes = [
    { size: 300, left: '-5%', top: '20%' },
    { size: 200, right: '-5%', bottom: '10%' },
    { size: 150, left: '50%', top: '-5%' },
  ];

  return (
    <Box sx={{ 
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      py: 10,
      px: 4,
    }}>
      <Background />
      {shapes.map((shape, index) => (
        <AnimatedShape
          key={index}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.left,
            right: shape.right,
            top: shape.top,
            bottom: shape.bottom,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <Grid container spacing={6} alignItems="center">
       
        <Grid item xs={12} md={7}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography variant="h2" gutterBottom fontWeight="bold" sx={{ color: '#333', mb: 2 }}>
              How Bunksafe Works
            </Typography>
            <Typography variant="h5" sx={{ color: '#666', mb: 6 }}>
              Revolutionizing timetable analysis and scheduling with cutting-edge algorithms.
            </Typography>
          </motion.div>
          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} key={step.number}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <StyledCard
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <NumberCircle>{step.number}</NumberCircle>
                      <Typography variant="h5" gutterBottom fontWeight="bold" color="#333">
                        {step.title}
                      </Typography>
                      <Typography variant="body1" color="#666" sx={{ mt: 'auto' }}>
                        {step.description}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box 
              component="img" 
              src={thought}
              alt="Bunksafe Logo" 
              sx={{ width: '100%', height: 'auto', maxWidth: 500, mx: 'auto', display: 'block' }}
            />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Features;