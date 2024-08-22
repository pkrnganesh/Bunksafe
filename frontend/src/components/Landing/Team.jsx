import React from 'react';
import { Typography, Grid, Card, CardContent, Avatar, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Facebook, LinkedIn, Twitter } from '@mui/icons-material';

const GlassBox = styled(Box)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  padding: '40px 20px',
  borderRadius: '15px',
  // boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
});

// const TeamCard = styled(Card)({
//   borderRadius: '15px',
//   transition: 'transform 0.3s ease',
//   '&:hover': {
//     transform: 'translateY(-10px)',
//     boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
//   },
// });

const SocialIcons = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
  '& svg': {
    margin: '0 5px',
    cursor: 'pointer',
    color: '#5f6368',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#0077b5', // Change to the primary color
    },
  },
});

const teamMembers = [
  {
    name: 'Alice Smith',
    role: 'Co-Founder & CEO',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    socials: {
      facebook: '#',
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Bob Johnson',
    role: 'CTO',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    socials: {
      facebook: '#',
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Charlie Lee',
    role: 'Lead Developer',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    socials: {
      facebook: '#',
      linkedin: '#',
      twitter: '#',
    },
  },
];

const Team = () => {
  return (
    <GlassBox
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
        Meet the Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} md={4} key={index}>
            {/* <TeamCard> */}
              <CardContent sx={{ textAlign: 'center', padding: '30px' }}>
                <Avatar src={member.avatar} sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#222' }}>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.role}
                </Typography>
                <SocialIcons>
                  <a href={member.socials.facebook}><Facebook /></a>
                  <a href={member.socials.linkedin}><LinkedIn /></a>
                  <a href={member.socials.twitter}><Twitter /></a>
                </SocialIcons>
              </CardContent>
            {/* </TeamCard> */}
          </Grid>
        ))}
      </Grid>
    </GlassBox>
  );
};

export default Team;
