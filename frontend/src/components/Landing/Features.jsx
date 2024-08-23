import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import thought from './thought.svg';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const StyledCard = styled(motion.div)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const NumberCircle = styled(Box)(({ theme }) => ({
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: '#A983FF',
  color: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const Features = () => {
  const steps = [
    { number: 1, title: 'Create your Account', description: 'Urna duis convallis convallis tellus interdum velit laoreet.' },
    { number: 2, title: 'Setup your Account', description: 'Urna duis convallis convallis tellus interdum velit laoreet.' },
    { number: 3, title: 'Start creating with Horizon', description: 'Urna duis convallis convallis tellus interdum velit laoreet.' },
    { number: 4, title: 'Team Management', description: 'Urna duis convallis convallis tellus interdum velit laoreet.' },
  ];

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Box sx={{ 
      color: 'white', 
      py: 8, 
      px: 4,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#1A0B2E",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#A983FF",
            },
            links: {
              color: "#A983FF",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <Grid container spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid item xs={12} md={5}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box 
              component="img" 
              src={thought}
              alt="Horizon Logo" 
              sx={{ width: '100%', height: 'auto', maxWidth: 600, mx: 'auto', display: 'block' }}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={7}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#A983FF' }}>
              How Bunksafe works?
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Urna duis convallis convallis tellus interdum velit laoreet pellentesque aliquam tortor consequat porta.
            </Typography>
          </motion.div>
          <Grid container spacing={3}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} key={step.number}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <StyledCard
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card>
                      <CardContent>
                        <NumberCircle>{step.number}</NumberCircle>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                          {step.title}
                        </Typography>
                        <Typography variant="body2">
                          {step.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Features;