import React, { useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, TextField, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const HolidaysList = ({ holidays: initialHolidays }) => {
  const [holidays, setHolidays] = useState(initialHolidays);
  const [newHoliday, setNewHoliday] = useState('');

  const handleAddHoliday = () => {
    if (newHoliday.trim() !== '') {
      setHolidays([...holidays, newHoliday]);
      setNewHoliday('');
    }
  };

  const handleDeleteHoliday = (index) => {
    const updatedHolidays = holidays.filter((_, i) => i !== index);
    setHolidays(updatedHolidays);
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Holidays
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={newHoliday}
          onChange={(e) => setNewHoliday(e.target.value)}
          placeholder="Add new holiday"
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddHoliday}
          fullWidth
        >
          Add Holiday
        </Button>
        <List>
          {holidays.map((holiday, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteHoliday(index)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={holiday} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </StyledCard>
  );
};

export default HolidaysList;