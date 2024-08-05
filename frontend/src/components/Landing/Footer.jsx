import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import { Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1">
          © 2024 Attendance Management System. All rights reserved.
        </Typography>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Link href="#" color="inherit">Contact Information</Link>
          </Grid>
          <Grid item>
            <Link href="#" color="inherit">Help/Support</Link>
          </Grid>
          <Grid item>
            <IconButton color="inherit" href="mailto:support@example.com">
              <Email />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;