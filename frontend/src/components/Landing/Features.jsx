import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  styled
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import ExtensionIcon from '@mui/icons-material/Extension';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

// Styled components
const ComponentWrapper = styled(Paper)({
  border: '1px solid #E0E0E0',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: 'none'
});

const PurpleSection = styled(Box)({
  backgroundColor: '#E6E6FA', // Light purple color
  padding: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  minHeight: '500px'
});

const DeviceImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  transform: 'perspective(1000px) rotateY(-15deg)',
});

const PlatformButton = styled(Button)({
  backgroundColor: '#fff',
  color: '#000',
  textTransform: 'none',
  borderRadius: '20px',
  padding: '8px 16px',
  margin: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#f5f5f5',
  }
});

const StartButton = styled(Button)({
  backgroundColor: '#000',
  color: '#fff',
  textTransform: 'none',
  borderRadius: '20px',
  padding: '10px 20px',
  marginTop: '24px',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#333',
  }
});

const MerlinDevices = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <ComponentWrapper>
        <Grid container>
          {/* Left side with image */}
          <Grid item xs={12} md={6}>
            <PurpleSection>
              <DeviceImage
                src="/path-to-your-device-image.png"
                alt="Merlin on devices"
              />
            </PurpleSection>
          </Grid>

          {/* Right side with content */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 4, md: 6 } }}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 3,
                  fontFamily: "'Crimson Text', serif",
                  letterSpacing: '-0.02em'
                }}
              >
                On all your devices
              </Typography>

              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#666', 
                  mb: 4, 
                  lineHeight: 1.6,
                  fontWeight: 400,
                  fontSize: '1.1rem'
                }}
              >
                Work with Merlin across all devices with synced history, access to your custom prompts and chatbots and all the great Merlin magic - effortlessly!
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <PlatformButton startIcon={<LanguageIcon />}>
                  Web app
                </PlatformButton>
                <PlatformButton startIcon={<ExtensionIcon />}>
                  Chrome extension
                </PlatformButton>
                <PlatformButton startIcon={<AppleIcon />}>
                  iOS app
                </PlatformButton>
                <PlatformButton startIcon={<AndroidIcon />}>
                  Android app
                </PlatformButton>
              </Box>

              <StartButton
                endIcon={<ArrowOutwardIcon />}
                variant="contained"
              >
                Start using Merlin
              </StartButton>
            </Box>
          </Grid>
        </Grid>
      </ComponentWrapper>
    </Container>
  );
};

export default MerlinDevices;