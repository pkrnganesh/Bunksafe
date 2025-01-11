import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Avatar,
  AvatarGroup,
  styled,
  Divider,
  keyframes
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

// Animation keyframes
const twinkle = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.7; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Styled components
const StyledGitHubButton = styled(Button)({
  backgroundColor: '#fff',
  color: '#24292e',
  textTransform: 'none',
  padding: '8px 16px',
  borderRadius: '6px',
  border: '1px solid rgba(27, 31, 36, 0.15)',
  fontWeight: 500,
  boxShadow: '0 1px 0 rgba(27, 31, 36, 0.04)',
  '&:hover': {
    backgroundColor: '#f3f4f6',
  },
  '& .MuiButton-startIcon': {
    marginRight: 8,
  },
});

const StarsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 40,
  position: 'relative',
  height: '120px',
});

const BackgroundStar = styled('span')(({ index }) => ({
  position: 'absolute',
  fontSize: '12px',
  color: 'rgba(255, 215, 0, 0.3)',
  animation: `${twinkle} ${2 + (index % 3)}s infinite ease-in-out ${index * 0.3}s`,
}));

const MainStarContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  animation: `${float} 6s infinite ease-in-out`,
  filter: 'drop-shadow(0 4px 6px rgba(255, 215, 0, 0.3))',
});

const MainStar = styled(FontAwesomeIcon)(({ size = 'medium' }) => ({
  fontSize: size === 'large' ? '64px' : '40px',
  color: '#FFD700',
  display: 'inline-block',
  textShadow: '0 0 10px rgba(255, 215, 0, 0.4)',
  transform: 'rotate(5deg)',
}));

const CustomDivider = styled(Divider)({
  height: '180px',
  margin: '0 60px',
});

const OpenSourceSection = () => {
  // Background stars positioning
  const backgroundStars = Array(15).fill(null).map((_, i) => ({
    top: Math.random() * 160 - 80,
    left: Math.random() * 160 - 80,
    delay: i * 0.2,
  }));

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 10 }}>
      {/* Previous Typography and Button components remain the same */}
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: '2.5rem', md: '3rem' },
          fontWeight: 500,
          mb: 2,
          fontFamily: "'Product Sans', 'Google Sans', sans-serif",
        }}
      >
        Proudly open-source
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: 'rgba(0, 0, 0, 0.6)',
          mb: 4,
          fontWeight: 400,
          fontSize: '1.25rem',
          maxWidth: '600px',
          mx: 'auto',
          lineHeight: 1.6,
          fontFamily: "'Product Sans', 'Google Sans', sans-serif",
        }}
      >
        Our source code is available on GitHub - feel free to read,
        review, or contribute to it however you want!
      </Typography>

      <StyledGitHubButton
        startIcon={<GitHubIcon />}
        variant="contained"
        href="#"
      >
        Star on Github
      </StyledGitHubButton>

      <CustomDivider sx={{ marginTop: '-166px' }} orientation="horizontal" />

      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center', width: '300px' }}>
          <StarsContainer>
            <Box sx={{ position: 'relative', width: '10px' }}>
              {backgroundStars.map((star, i) => (
                <BackgroundStar
                  key={i}
                  index={i}
                  sx={{
                    top: star.top,
                    left: star.left,
                  }}
                >
                  <FontAwesomeIcon icon={solidStar} />
                </BackgroundStar>
              ))}
              <MainStarContainer sx={{ position: 'relative',ml: '-70px' }}>
                <MainStar icon={solidStar} />
                <MainStar icon={solidStar} />
                <MainStar icon={solidStar} />
              </MainStarContainer>
            </Box>
          </StarsContainer>
          <Typography
            variant="h4"
            sx={{ 
              mt: 2, 
              fontWeight: 500,
              fontSize: '1.75rem',
              fontFamily: "'Product Sans', 'Google Sans', sans-serif",
            }}
          >
            19.3K Stars
          </Typography>
        </Box>

        <CustomDivider sx={{ marginTop: '-30px' }} orientation="vertical" />

        {/* Rest of the component remains the same */}
        <Box sx={{ textAlign: 'center', width: '300px' }}>
          <Box sx={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AvatarGroup
              max={8}
              sx={{
                '& .MuiAvatar-root': {
                  width: 48,
                  height: 48,
                  fontSize: '1rem',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
              }}
            >
              {Array(8).fill(null).map((_, index) => (
                <Avatar
                  key={index}
                  src={`/api/placeholder/40/40`}
                  alt={`Contributor ${index + 1}`}
                />
              ))}
            </AvatarGroup>
          </Box>
          <Typography
            variant="h4"
            sx={{ 
              mt: 2, 
              fontWeight: 500,
              fontSize: '1.75rem',
              fontFamily: "'Product Sans', 'Google Sans', sans-serif",
            }}
          >
            60+ Contributors
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default OpenSourceSection;
