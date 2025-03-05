import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientTypography = styled(Typography)(({ theme }) => ({
  fontSize: '200px',
  fontWeight: 900,
  letterSpacing: '0.1em',
  background: 'linear-gradient(135deg, #C471ED 0%, #f3f4f6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  [theme.breakpoints.down('md')]: {
    fontSize: '120px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '80px',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const BunkInLogo = () => {
  return (
    <LogoContainer>
      <GradientTypography variant="h1">
        BUNK IN
      </GradientTypography>
    </LogoContainer>
  );
};

export default BunkInLogo;