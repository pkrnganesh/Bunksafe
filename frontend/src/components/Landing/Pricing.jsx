import React from 'react';
import { Typography, Grid, Button, Box } from '@mui/material';
import { Check, Try } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const Container = styled(motion.div)(({ theme }) => ({
  borderRadius: '20px',
  padding: theme.spacing(4),
  color: 'black',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row', // Makes the layout horizontal
  justifyContent: 'space-between', // Aligns items
}));

const Card = styled(motion.div)(({ theme, isPopular }) => ({
  background: 'white',
  borderRadius: '15px',
  padding: theme.spacing(4),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  color: isPopular ? 'black' : 'gray',
  border: isPopular ? `2px solid ${theme.palette.primary.main}` : 'none',
  transform: isPopular ? 'scale(1.05)' : 'scale(1)',
  zIndex: isPopular ? 10 : 1,
  height: '400px', // Fixed height for both cards
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.05)',
  },
}));

const Pricing = () => {

  const plans = [
    {
      title: 'Free Trial', 
      features: ['Phishing simulation', 'Phishing awareness', '7 day trial'],
      
    },
    {
      title: 'Premium',
      features: ['Spear phishing simulation', 'Premium support','Phishing awareness', '7 day trial'],
    },
  ];

        return (
      <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Box sx={{ width: '60%' }}>
          <Grid container spacing={3}>
            {plans.map((plan, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  isPopular={plan.isPopular}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Typography variant="h5" gutterBottom>{plan.title}</Typography>
                  
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ 
                      my: 2, 
                      backgroundColor: plan.title === 'Premium' ? 'red' : '#42daf5',
                      color: 'white' // Ensure text color is readable
                    }}
                  >
                    {plan.title === 'Premium' ? 'Book Demo' : 'Try now'}
                  </Button>
                  {plan.features.map((feature, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Check sx={{ mr: 1, color: plan.isPopular ? 'primary.main' : 'gray' }} />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ width: '30%', textAlign: 'right', alignSelf: 'center' }}>
          <Typography variant="h3" gutterBottom>Let's get started</Typography>
          <Typography variant="subtitle1">
            We believe security should be accessible to every company, no matter the size.
          </Typography>
        </Box>
      </Container>
    );
};

export default Pricing;