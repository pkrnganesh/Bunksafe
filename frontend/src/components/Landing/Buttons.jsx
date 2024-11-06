import React from 'react';
import { Card as MuiCard, CardContent, Typography, Grid, Box, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import SvgIcon from '@mui/material/SvgIcon';
import styled from 'styled-components';

// CustomCard (First card from the original code)
const CustomCard = () => {
  return (
    <MuiCard
      sx={{
        width: 210,
        height: 220, // Decrease the height
        backgroundColor: '#1b233d',
        padding: 1.5, // Adjusted padding
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 20px 0px',
        transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        position: 'relative',
        border: '2px solid #f0f0f0',
        clipPath: 'polygon(0 0, 75% 0, 100% 15%, 100% 100%, 0% 100%)', // Cuts the top-right corner
      }}
    >
      <CardContent sx={{ padding: '8px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
          <SvgIcon sx={{ fill: 'white' }}>
            {/* SVG path for your custom logo here */}
          </SvgIcon>
          <Box display="flex" gap={1}>
            <IconButton size="small">
              <FacebookIcon sx={{ color: 'white' }} />
            </IconButton>
            <IconButton size="small">
              <InstagramIcon sx={{ color: 'white' }} />
            </IconButton>
            <IconButton size="small">
              <TwitterIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="h6" color="white" gutterBottom>
          UNIVERSE OF UI
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="h5" color="white">
              2626
            </Typography>
            <Typography variant="body2" color="white">
              UI elements
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" color="white">
              100%
            </Typography>
            <Typography variant="body2" color="white">
              Free for use
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" color="white">
              38,631
            </Typography>
            <Typography variant="body2" color="white">
              Contributors
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </MuiCard>
  );
};

// BookCard (Second card from the new code)
const BookCard = () => {
  return (
    <StyledWrapper>
      <div className="book">
        <p>Hello</p>
        <div className="cover">
          <p>Hover Me</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .book {
    position: relative;
    border-radius: 10px;
    width: 200px;
    height: 232px;
    background-color: whitesmoke;
    box-shadow: 1px 1px 12px #000;
    transform: preserve-3d;
    perspective: 2000px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
  }

  .cover {
    top: 0;
    position: absolute;
    background-color: lightgray;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s;
    transform-origin: 0;
    box-shadow: 1px 1px 12px #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .book:hover .cover {
    transition: all 0.5s;
    transform: rotatey(-80deg);
  }

  p {
    font-size: 20px;
    font-weight: bolder;
  }
`;

// CardLayout to include both CustomCard and BookCard
const CardLayout = () => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <CustomCard />
      </Grid>
      <Grid item>
        <BookCard />
      </Grid>
    </Grid>
  );
};

export default CardLayout;
