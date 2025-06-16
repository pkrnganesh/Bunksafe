import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  styled,
  InputBase,
  ClickAwayListener
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const GradientBackground = styled(Box)({
   padding: '4rem 1rem',
  minHeight: '100vh',
});

const ActionButton = styled(Paper)(({ theme, isVisible }) => ({
  padding: '12px 24px',
  borderRadius: '50px',
  display: 'inline-flex',
  color: 'white',
  alignItems: 'center',
  backgroundColor: 'rgba(216, 200, 200, 0.9)',
  margin: '8px',
  cursor: 'pointer',
   transition: 'all 0.3s ease',
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
  '&:hover': {
    transform: isVisible ? 'translateY(-2px)' : 'translateY(-20px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}));

const SearchInput = styled(InputBase)(({ isFocused }) => ({
  padding: '12px 24px',
  borderRadius: '5px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  width: '400px',
  maxWidth: '90%',
  boxShadow: isFocused 
    ? '0 4px 20px rgba(0, 0, 0, 0.15)' 
    : '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  position: 'relative',
  zIndex: 2,
  '& input': {
    padding: '0',
  },
}));

const MeetingsActionComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const actionItems = [
    'Write a follow up email',
    'What questions did they have?',
    'List action items',
    "What's their budget?",
    'List their objections',
    'Schedule meeting',
   
  ];

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setIsFocused(false);
  };

  return (
    <GradientBackground>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center',mb: '-340px' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: '#004d40',
              mb: 2,
            }}
          >
            Put your meetings to work
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              color: '#546e7a',
              mb: 4,
              fontWeight: 400,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Granola has GPT-4 built in, so it can help you do your post-meeting action items
          </Typography>

          <Box 
            sx={{ 
              position: 'relative',
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '20%',
                zIndex: 2,
              }}
            >
              <ClickAwayListener onClickAway={() => setIsFocused(false)}>
                <SearchInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  isFocused={isFocused}
                  placeholder="Ask about meeting"
                  endAdornment={<ArrowForwardIcon sx={{ color: '#004d40', mr: 1 }} />}
                />
              </ClickAwayListener>
            </Box>

            <Box
              sx={{
                position: 'absolute',
                top: '2%',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                 maxWidth: '900px',
                mx: 'auto',
                transition: 'all 0.3s ease',
                opacity: isFocused ? 0.3 : 1,
                transform: isFocused ? 'scale(0.95)' : 'scale(1)',
              }}
            >
              {actionItems.map((item, index) => (
                <ActionButton 
                  key={index} 
                  elevation={0}
                  isVisible={!isFocused || inputValue === item}
                  onClick={() => handleSuggestionClick(item)}
                >
                  <Typography
                    sx={{
                      color: '#37474f',
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </Typography>
                </ActionButton>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </GradientBackground>
  );
};

export default MeetingsActionComponent;