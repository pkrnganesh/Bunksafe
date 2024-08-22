import React from 'react';
import { Box, Container, Typography, Grid, Link, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
// import JarIcon from './JarIcon'; // You'll need to create this custom icon component
// import SlackIcon from './SlackIcon'; // You'll need to create this custom icon component

const FooterPaper = styled(Paper)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: '20px',
  padding: theme.spacing(4),
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
  transform: 'translateY(-20px)',
}));

const DonateButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1E2330',
  color: '#ffffff',
  borderRadius: '8px',
  padding: '10px 20px',
  '&:hover': {
    backgroundColor: '#2C3340',
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#6B7280',
  textDecoration: 'none',
  '&:hover': {
    color: '#374151',
  },
}));

const FooterHeading = styled(Typography)(({ theme }) => ({
  color: '#FF3366',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const SocialIcon = styled('img')(({ theme }) => ({
  width: '24px',
  height: '24px',
  marginRight: theme.spacing(1),
}));

const Footer = () => {
  return (
    <FooterPaper elevation={0}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box display="flex" alignItems="center" mb={2}>
              {/* <JarIcon style={{ width: 40, height: 40, marginRight: 16 }} /> */}
              <Typography variant="h6" fontWeight="bold">
                Do you have designs to spare?
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" mb={2}>
              Donate your design and contribute to the community.
            </Typography>
            <DonateButton variant="contained">
              Donate now!
            </DonateButton>
          </Grid>
          <Grid item xs={12} md={3}>
            <FooterHeading variant="subtitle1">Explore</FooterHeading>
            <FooterLink href="#" variant="body2" display="block" mb={1}>Free designs</FooterLink>
            <FooterLink href="#" variant="body2" display="block" mb={1}>Latest designs</FooterLink>
            <FooterLink href="#" variant="body2" display="block" mb={1}>Most popular designs</FooterLink>
            <FooterLink href="#" variant="body2" display="block" mb={1}>Contributors</FooterLink>
          </Grid>
          <Grid item xs={12} md={3}>
            <FooterHeading variant="subtitle1">Site</FooterHeading>
            <FooterLink href="#" variant="body2" display="block" mb={1}>License</FooterLink>
            <FooterLink href="#" variant="body2" display="block" mb={1}>Articles</FooterLink>
            <FooterLink href="#" variant="body2" display="block" mb={1}>About</FooterLink>
            <FooterLink href="#" variant="body2" display="block" mb={1}>Support</FooterLink>
            <FooterLink href="#" variant="body2" display="block" mb={1}>Sponsor UI Design Daily</FooterLink>
          </Grid>
          <Grid item xs={12} md={3}>
            <FooterHeading variant="subtitle1">Follow Us</FooterHeading>
            <Box mb={2}>
              <SocialIcon src="/path-to-dribbble-icon.png" alt="Dribbble" />
              <SocialIcon src="/path-to-twitter-icon.png" alt="Twitter" />
              <SocialIcon src="/path-to-instagram-icon.png" alt="Instagram" />
            </Box>
            <Box display="flex" alignItems="center">
              {/* <SlackIcon style={{ width: 24, height: 24, marginRight: 8 }} /> */}
              <FooterLink href="#" variant="body2">Join our Slack channel</FooterLink>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
          <FooterLink href="#" variant="body2">Legal</FooterLink>
          <Typography variant="body2" color="textSecondary">
            © 2021 UI Design Daily All rights reserved
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            1384 Design files donated
          </Typography>
        </Box>
      </Container>
    </FooterPaper>
  );
};

export default Footer;