import React from 'react';
import { Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const Timetable = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Timetable
          </Typography>
          <Typography>No timetable data available</Typography>
        </CardContent>
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Timetable
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(data).map(([day, subjects]) => (
            <Grid item xs={12} key={day}>
              <Typography variant="subtitle1">{day}</Typography>
              {subjects.map((subject, index) => (
                <Chip key={index} label={subject} style={{ margin: '0.25rem' }} />
              ))}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default Timetable;