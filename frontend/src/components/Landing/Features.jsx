
import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import  thought from './thought.svg';
const StyledCard = styled(Card)(({ theme }) => ({
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

  return (
    <Box sx={{ 
      // bgcolor: '#1A0B2E', 
      color: 'white', 
      py: 8, 
      px: 4,
      // backgroundImage: 'linear-gradient(45deg, #1A0B2E 0%, #2C1250 100%)',
    }}>
      <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={5}>
        <Box 
        component="img" 
        src={thought}
        alt="Horizon Logo" 
        sx={{ width: '100%', height: 'auto', maxWidth: 600, mx: 'auto', display: 'block' }}
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: 'black' }}>
        How Horizon works?
        </Typography>
        <Typography variant="subtitle1" paragraph>
        Urna duis convallis convallis tellus interdum velit laoreet pellentesque aliquam tortor consequat porta.
        </Typography>
        <Grid container spacing={3}>
        {steps.map((step) => (
          <Grid item xs={12} sm={6} key={step.number}>
          <StyledCard>
            <CardContent>
            <NumberCircle>{step.number}</NumberCircle>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              {step.title}
            </Typography>
            <Typography variant="body2">
              {step.description}
            </Typography>
            </CardContent>
          </StyledCard>
          </Grid>
        ))}
        </Grid>
      </Grid>
      </Grid>
    </Box>
    );
};

export default Features;