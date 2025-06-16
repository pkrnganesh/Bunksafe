import React from 'react';
import { Box, Typography, Container, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
 

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: 'white',
  position: 'relative',
  overflow: 'hidden',
  paddingTop: theme.spacing(10),
}));

const borderMove = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`;

const AnimatedContainer = styled(Box)({
position: 'relative',
display: 'inline-block',
padding: '2px',
borderRadius: '50px',
'&::before': {
  content: '""',
  position: 'absolute',
  inset: 0,
  borderRadius: '50px',
  padding: '2px',
  background: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ff00ff, #ffff00, #00ffff)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor',
  maskComposite: 'exclude',
  backgroundSize: '300% 300%',
  animation: `${borderMove} 3s linear infinite`
}
});

const Label = styled(Box)(({ theme }) => ({
padding: theme.spacing(1, 3),
borderRadius: '50px',
backgroundColor: theme.palette.background.paper,
color: theme.palette.text.primary,
fontSize: '0.875rem',
fontWeight: 500
}));

const BlueBadge = styled(motion.div)(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: '#007AFF',
  border: '4px solid rgb(96, 173, 255)',
  color: 'white',
  padding: theme.spacing(0.75, 2),
  borderRadius: theme.spacing(7),
  margin: theme.spacing(0, 1),
  fontSize: '0.9em',
  transformOrigin: 'center bottom',
}));

const   Hero = () => {
  

  return (
    <StyledBox>
      <Container maxWidth="" sx={{ textAlign: 'center',mt: 10 }}>
      <AnimatedContainer>
    <Label>
      For students who love living on the edge →
    </Label>
  </AnimatedContainer>

        <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 4 }}>
          <Typography variant="h1" sx={{ 
            fontSize: { xs: '3.5rem', md: '5rem' }, 
            fontWeight: 900, 
            lineHeight: 1.2,
            mb: 5
          }}>
            The smarter way to
            <BlueBadge
               initial="initial"
              animate="stamp"
              whileHover={{
                rotate: 3,
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <span role="img" aria-label="sparkle" style={{ color: '#FFD700', marginRight: 8 }}>
                ✨
              </span>
              Bunk Classes
            </BlueBadge>
          </Typography>

          <Typography variant="h5" sx={{ 
            color: 'black',
            maxWidth: '1000px',
            fontFamily: "Helvetica",
            mx: 'auto',
            mb: 4,
            mt: 2,
          }}>
             We've got your back! 
             Transform from a random class-skipper into a strategic absence artist! 
            Share anonymous notes,calculate grades, all while maintaining your reputation as the 
            "mysteriously" student.
            <br />          <br />
            <br />  <br />          <br />
            <br />  <br />          <br />
            <br />    
          </Typography>

        

        </Box>
      </Container>
    </StyledBox>
  );
};

export default Hero;