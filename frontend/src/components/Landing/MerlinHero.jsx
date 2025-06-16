import React from 'react';
import { Box, Typography, Button, Container, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ChatIcon from '@mui/icons-material/Chat';

// Styled Components
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#000000',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#222222',
  },
}));

const FeatureCard = styled(Paper)(({ theme, purple }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  height: '100%',
  backgroundColor: purple ? '#7952B3' : '#1A1A1A',
  color: '#ffffff',
}));

const ChatBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  borderRadius: '24px',
  padding: '8px 16px',
  marginBottom: theme.spacing(2),
}));

const MerlinHero = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 12 } }}>
        <Box sx={{ mb: 8 ,display: 'flex', flexDirection: 'row' }}>
            <Box>
          <Typography 
            variant="subtitle2" 
            sx={{ 
            mb: 1,
            color: 'text.secondary',
            fontSize: '0.875rem',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            padding: '4px 8px',
            borderRadius: '4px',
            width: 'fit-content'
            }}
          >
            BunkSafe Perimun 
          </Typography>
          
          <Typography 
            variant="h1" 
            sx={{ 
            fontWeight: 600,
            fontSize: { xs: '2.5rem', md: '3.75rem' },
            lineHeight: 1.2,
            mb: 2,
            fontFamily: 'Georgia'

            }}
          >
            One-click insights in realtime
          </Typography>
          </Box>

          <Box>
          <Typography 
            variant="h5" 
            sx={{ 
            color: 'text.secondary',
            fontWeight: 400,
            mb: 4,
            fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            Get summaries,deep-info and insights on attendance where you sturggle to find them.
          </Typography>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <StyledButton 
            endIcon={<ArrowOutwardIcon />}
            >
            Get the Reports
            </StyledButton>
          </motion.div>
          </Box>
        </Box>

        <Grid container spacing={4} sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid item xs={12} sm={6}>
            <FeatureCard purple elevation={0}>
            <ChatBadge>
              <ChatIcon sx={{ mr: 1, fontSize: '1rem' }} />
              <Typography variant="body2">
                Chat with this Webpage
              </Typography>
            </ChatBadge>
            
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                mb: 2
              }}
            >
              Don't switch tabs. Just ask
            </Typography>
            
            <Typography 
              variant="body1"
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.1rem'
              }}
            >
              Summarize, search, repurpose and create content out of any website you visit.
            </Typography>
            </FeatureCard>
          </Grid>

          {/* Dark Card */}
        <Grid item xs={12} md={6}>
          <FeatureCard elevation={0}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                mb: 2
              }}
            >
              Search better and get answers at a glance.
            </Typography>
            
            <Typography 
              variant="body1"
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.1rem'
              }}
            >
              Avoid spending time going through each search result on Google. Instead, get a summary and ask for specific details.
            </Typography>
          </FeatureCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MerlinHero;