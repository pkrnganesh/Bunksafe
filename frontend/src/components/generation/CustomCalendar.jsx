// components/CustomCalendar.js
import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const CustomCalendar = ({ selectedDate, onDateChange, highlightedDates }) => {
  const theme = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const isHighlighted = (date) => {
    return highlightedDates.some((d) => d.date === date);
  };

  const getHighlightColor = (date) => {
    const highlighted = highlightedDates.find((d) => d.date === date);
    return highlighted
      ? highlighted.value > 0
        ? "green"
        : theme.palette.error.main
      : "transparent";
  };

  return (
    <Box
      sx={{
        height: "75%",
        width: "40%",
        marginLeft: '15px',
        marginTop: '-160px',
        minWidth: "360px",
        backgroundColor: "white",
        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: theme.palette.primary.main }}
        >
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Typography>
        <Box>
          <Button onClick={previousMonth} sx={{ minWidth: "auto", p: 1 }}>
            <ArrowBackIosNewIcon />
          </Button>
          <Button onClick={nextMonth} sx={{ minWidth: "auto", p: 1 }}>
            <ArrowForwardIosIcon />
          </Button>
        </Box>
      </Box>
      <Grid container columns={7} sx={{ textAlign: "center" }}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <Grid item xs={1} key={day}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: theme.palette.text.secondary }}
            >
              {day}
            </Typography>
          </Grid>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <Grid item xs={1} key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = `${currentMonth.getFullYear()}-${String(
            currentMonth.getMonth() + 1
          ).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`;
          return (
            <Grid item xs={1} key={date} sx={{ p: 1 }}>
              <Button
                onClick={() => onDateChange(date)}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor:
                    date === selectedDate
                      ? theme.palette.primary.main
                      : "transparent",
                  color:
                    date === selectedDate
                      ? "white"
                      : theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor:
                      date === selectedDate
                        ? theme.palette.primary.dark
                        : theme.palette.action.hover,
                  },
                  position: "relative",
                }}
              >
                {index + 1}
                {isHighlighted(date) && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 2,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: getHighlightColor(date),
                    }}
                  />
                )}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CustomCalendar;
