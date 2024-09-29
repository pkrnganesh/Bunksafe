// components/SubjectsSection.js
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  LinearProgress,
} from "@mui/material";
import SkeletonCard from "./SkeletonCard";
import { useTheme } from "@mui/material/styles";

const glassStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  padding: "24px",
};

const SubjectsSection = ({ analysisData, loading }) => {
  const maxSubjectsToShow = 4;
  const theme = useTheme();
  if (loading) {
    return <SkeletonCard height={400} />;
  }

  return (
    <Card
      sx={{
        ...glassStyle,
        height: "60%",
        width: "41%",
        position: "relative",
        overflow: "visible",
        // marginTop: "-120px",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, color: "white", mb: 2 }}
        >
          Student-wise Attendance
        </Typography>

        <Box
          sx={{
            maxHeight: 450,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.7)",
              },
            },
          }}
        >
          <Grid container spacing={2}>
            {analysisData &&
              Object.entries(
                analysisData.AttendanceRequirements.subjectRequirements
              )
                .slice(0, maxSubjectsToShow)
                .map(([subject, requirements]) => (
                  <Grid item xs={12} key={subject}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1.5,
                        borderRadius: "12px",
                        background: "white",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: theme.palette.primary.main, flex: 1 }}
                      >
                        {subject}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ flex: 1, textAlign: "center" }}
                      >
                        Total: {requirements.total} | Required:{" "}
                        {requirements.asperpercentage} | Minimum:{" "}
                        {requirements.minimum40}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={
                          (requirements.asperpercentage / requirements.total) *
                          100
                        }
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          flex: 1,
                          backgroundColor: theme.palette.grey[200],
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 3,
                            backgroundColor: theme.palette.secondary.main,
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SubjectsSection;
