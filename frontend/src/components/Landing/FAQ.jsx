import React, { useState } from 'react';
import { Typography, Grid, Button, ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import { Check } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

// Default image for the first plan
import DefaultImage from './index_banner.svg';

const Container = styled(motion.div)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f3f4f6 30%, #ffffff 100%)',
  borderRadius: '20px',
  padding: theme.spacing(6),
  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  color: 'black',
  overflow: 'hidden',
}));

const Card = styled(motion.div)(({ theme, isPopular }) => ({
  background: 'white',
  borderRadius: '20px',
  padding: theme.spacing(5),
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  color: isPopular ? 'black' : 'gray',
  border: isPopular ? `2px solid ${theme.palette.primary.main}` : 'none',
  transform: isPopular ? 'scale(1.05)' : 'scale(1)',
  zIndex: isPopular ? 10 : 1,
  '&:hover': {
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.05)',
  },
  position: 'relative',
  overflow: 'hidden',
}));

const CardImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '15px',
  marginBottom: '16px',
});

const ToggleGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: '20px',
  padding: '6px',
  marginBottom: theme.spacing(6),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  color: 'black',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}));

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      title: 'Free',
      price: { monthly: 0, annually: 0 },
      features: ['Basic features', 'Limited support'],
      image: DefaultImage, // Image for the first plan
    },
    {
      title: 'Premium',
      price: { monthly: 60, annually: 600 },
      features: ['Advanced features', 'Priority support', 'Unlimited integrations'],
      isPopular: true,
    },
  ];

  const handleBillingCycleChange = (event, newBillingCycle) => {
    if (newBillingCycle !== null) {
      setBillingCycle(newBillingCycle);
    }
  };

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
        <ToggleGroup
          value={billingCycle}
          exclusive
          onChange={handleBillingCycleChange}
          aria-label="billing cycle"
        >
          <StyledToggleButton value="monthly">Monthly</StyledToggleButton>
          <StyledToggleButton value="annually">Annually</StyledToggleButton>
        </ToggleGroup>
      </Box>
      <Grid container spacing={5}>
        {plans.map((plan, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              isPopular={plan.isPopular}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {plan.image && <CardImage src={plan.image} alt={`${plan.title} plan image`} />}
              <Typography variant="h5" gutterBottom>{plan.title}</Typography>
              <Typography variant="h4" gutterBottom>
                ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annually}
                <Typography component="span" variant="h6"> USD</Typography>
              </Typography>
              <Typography variant="body1" gutterBottom>Billed {billingCycle}</Typography>
              <Button
                variant="contained"
                color={plan.isPopular ? "primary" : "secondary"}
                fullWidth
                sx={{ my: 2 }}
              >
                {plan.title === 'Free' ? 'Get Started' : 'Buy Now'}
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
    </Container>
  );
};

export default Pricing;
