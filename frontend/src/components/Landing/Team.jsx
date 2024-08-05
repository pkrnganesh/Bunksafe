import React from 'react';
import { Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { GlassBox } from './styles';

const Team = () => {
  const teamMembers = [
    {
      name: 'Alice Smith',
      role: 'Co-Founder & CEO',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      name: 'Bob Johnson',
      role: 'CTO',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Charlie Lee',
      role: 'Lead Developer',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
  ];

  return (
    <GlassBox
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Meet the Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar src={member.avatar} sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }} />
                <Typography variant="h6" gutterBottom>{member.name}</Typography>
                <Typography variant="body2" color="textSecondary">{member.role}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </GlassBox>
  );
};

export default Team;