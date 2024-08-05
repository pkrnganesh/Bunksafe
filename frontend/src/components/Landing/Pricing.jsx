import React from 'react';
import { Typography, Grid, Fab } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { GlassBox, AnimatedCard } from './styles';

const Pricing = () => {
  const plans = [
    { title: 'Basic Plan', price: '$9.99/month', description: 'Assistant bot for timetable and timetable rescheduling' },
    { title: 'Premium Plan', price: '$19.99/month', description: 'All Basic features, daily attendance reminders, and live attendance tracking' },
  ];

  return (
    <GlassBox
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Pricing Plans
      </Typography>
      <Grid container spacing={4}>
        {plans.map((plan, index) => (
          <Grid item xs={12} md={6} key={index}>
            <AnimatedCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Typography variant="h6" gutterBottom>{plan.title}</Typography>
              <Typography variant="h4" gutterBottom>{plan.price}</Typography>
              <Typography variant="body2">{plan.description}</Typography>
              <Fab
                variant="extended"
                color="primary"
                sx={{ mt: 2 }}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#learn-more"
              >
                <AttachMoney sx={{ mr: 1 }} />
                Learn More
              </Fab>
            </AnimatedCard>
          </Grid>
        ))}
      </Grid>
    </GlassBox>
  );
};

export default Pricing;