// DateInputs.js
import React from "react";
import { Grid, TextField } from "@mui/material";
import { DateRange } from "@mui/icons-material";

const DateInputs = ({ fromDate, setFromDate, toDate, setToDate, isMobile }) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <br />
        <br />
        <TextField
          label="From Date"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          InputProps={{
            startAdornment: <DateRange color="primary" />,
          }}
          sx={{
            "& .MuiInputBase-root": {
              fontSize: isMobile ? "0.9rem" : "1rem",
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <br />
        <br />
        <TextField
          label="To Date"
          type="date"
          value={toDate}
          // DateInputs.js (continued)
          onChange={(e) => setToDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          InputProps={{
            startAdornment: <DateRange color="primary" />,
          }}
          sx={{
            "& .MuiInputBase-root": {
              fontSize: isMobile ? "0.9rem" : "1rem",
            },
          }}
        />
      </Grid>
    </>
  );
};

export default DateInputs;