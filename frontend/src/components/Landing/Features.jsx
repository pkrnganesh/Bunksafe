import React from 'react';
import { Typography, Grid } from '@mui/material';
import { HowToReg, Group, BarChart } from '@mui/icons-material';
import { GlassBox, AnimatedCard } from './styles';

const Features = () => {
  const features = [
    { icon: HowToReg, title: 'Register', description: 'Create an account for your institution' },
    { icon: Group, title: 'Add Students', description: 'Import or manually add student data' },
    { icon: BarChart, title: 'Track & Analyze', description: 'Generate reports and gain insights' },
  ];

  return (
    <GlassBox
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="get-started"
    >
      <Typography variant="h4" gutterBottom align="center">
        How It Works
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <AnimatedCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <feature.icon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>{feature.title}</Typography>
              <Typography variant="body2">{feature.description}</Typography>
            </AnimatedCard>
          </Grid>
        ))}
      </Grid>
    </GlassBox>
  );
};

export default Features;