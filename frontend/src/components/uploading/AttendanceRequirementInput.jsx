// AttendanceRequirementInput.js
import React from "react";
import { Grid, TextField } from "@mui/material";
import { PercentOutlined } from "@mui/icons-material";

const AttendanceRequirementInput = ({
  attendanceRequirement,
  setAttendanceRequirement,
  isMobile,
}) => {
  return (
    <Grid item xs={12}>
      <br />
      <br />
      <TextField
        label="Attendance Requirement"
        type="number"
        value={attendanceRequirement}
        onChange={(e) => setAttendanceRequirement(e.target.value)}
        InputProps={{
          endAdornment: "%",
          startAdornment: <PercentOutlined color="primary" />,
        }}
        fullWidth
        sx={{
          "& .MuiInputBase-root": {
            fontSize: isMobile ? "0.9rem" : "1rem",
          },
        }}
      />
    </Grid>
  );
};

export default AttendanceRequirementInput;