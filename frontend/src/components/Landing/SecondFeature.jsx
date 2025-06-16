import React, { useState } from 'react';
import { 
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton 
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
 
const SecondFeature = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    
    { 
      title: "Turn words into infographics",
      description: "With Crafts, generate a variety of diagrams and interactive charts with just a prompt.",
      content: (
        <Box sx={{ 
          height: '100%', 
          bgcolor: '#1a1a1a',
          borderRadius: 1,
          p: 2,
          color: 'white'
        }}>
         
        </Box>
      )
    },
    
    { 
      title: "Turn words into infographics",
      description: "With Crafts, generate a variety of diagrams and interactive charts with just a prompt.",
      content: (
        <Box sx={{ 
          height: '100%', 
          bgcolor: '#1a1a1a',
          borderRadius: 1,
          p: 2,
          color: 'white'
        }}>
         
        </Box>
      )
    },
    { 
      title: "Turn words into infographics",
      description: "With Crafts, generate a variety of diagrams and interactive charts with just a prompt.",
      content: (
        <Box sx={{ 
          height: '100%', 
          bgcolor: '#1a1a1a',
          borderRadius: 1,
          p: 2,
          color: 'white'
        }}>
         
        </Box>
      )
    },
    {
      title: "Create working app snippets",
      description: "Prototype rapidly with React and Shadcn based app snippets and edit code on the fly.",
      content: (
        <Box sx={{ 
          height: '100%', 
          bgcolor: '#1a1a1a',
          borderRadius: 1,
          p: 2,
          color: 'white'
        }}>
         
        </Box>
      )
    },
    {
      title: "Use OpenAI v1 with realtime web",
      description: "Use chain-of-thought reasoning with realtime web sources to get a powerful research machine in your hands.",
      content: (
        <Box sx={{ 
          height: '100%', 
          bgcolor: '#1a1a1a',
          borderRadius: 1,
          p: 2,
          color: 'white'
        }}>
          
        </Box>
      )
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <Container maxWidth="lg">
       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 1 }}>
        <Button
          variant="outlined"
          sx={{
            borderRadius: '5px',
            borderColor: '#3B82F6',
            color: '#3B82F6',
            textTransform: 'none',
            height: '16px',
            padding: 1.3,
            fontWeight: 600,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          NEW · Merlin Chat
        </Button>
      </Box>

       <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontFamily: 'serif',
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          For those who build {'\u00A0'}<Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            bgcolor: 'black',
            color: 'white',
            textTransform: 'none',
            height:'26px',
            width:'121px',
            px: 1,
            py: 1,
            borderRadius: 1,
            '&:hover': {
              bgcolor: '#1a1a1a'
            }
          }}
        >
          Explore now
        </Button>
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'text.secondary',
            mb: 4,
            fontWeight: 400,
            fontSize: { xs: '1.2rem', md: '1.5rem' }
          }}
        >
          Research with realtime info, visualise insights and build products with words.
        </Typography>
       
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>  
        <Box>
          <IconButton 
            onClick={handlePrev}
            sx={{ 
              mr: 1,
              bgcolor: '#f2f2f2',
              color: 'black',
              '&:hover': { bgcolor: '#f3f3' }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          </Box>
        <Box sx={{ overflow: 'hidden' }}>
        <Box sx={{ 
          display: 'flex',
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: 'transform 0.3s ease-in-out'
        }}>
          <Grid container spacing={3} sx={{ flexWrap: 'nowrap' }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ flexShrink: 0 }}>
                 <Box 
                  sx={{
                    bgcolor: '#6B46C1',
                    borderRadius: 2,
                    height: '360px',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    },
                    transition: 'transform 0.2s'
                  }}
                >
                  {feature.content}
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box>
          <IconButton 
            onClick={handleNext}
            sx={{ 
             bgcolor: '#f2f2f2',
              color: 'black',
              '&:hover': { bgcolor: '#f3f3' }
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

       
    </Container>
  );
};

export default SecondFeature;