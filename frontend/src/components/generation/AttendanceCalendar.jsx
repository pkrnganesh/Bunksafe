import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  height: 300,
}));

const AttendanceCalendar = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Attendance Calendar
          </Typography>
          <Typography>No attendance data available</Typography>
        </CardContent>
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Attendance Calendar
        </Typography>
        <ResponsiveCalendar
          data={data}
          from={data[0].day}
          to={data[data.length - 1].day}
          emptyColor="#eeeeee"
          colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
        />
      </CardContent>
    </StyledCard>
  );
};

export default AttendanceCalendar;