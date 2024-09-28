// components/TimetableSection.js
import React from "react";
import { Card, CardContent, Typography, Grid, Box, Chip } from "@mui/material";
import SkeletonCard  from "./SkeletonCard";
import { useTheme } from "@mui/material/styles";

const glassStyle = {
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  padding: "24px",
};

const TimetableSection = ({ analysisData, loading }) => {
    const theme = useTheme();
  if (loading) {
    return <SkeletonCard height={300} />;
  }

  return (
    <Card
      sx={{
        ...glassStyle,
        height: "56%",
        width: "41%",
        position: "relative",
        background: "white",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {analysisData?.timetableResponse?.schedule &&
            Object.entries(analysisData.timetableResponse.schedule).map(
              ([day, subjects]) => (
                <Grid item xs={12} sm={6} md={4} key={day}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.6)",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {day}
                    </Typography>
                    {subjects.map((subjectObj, index) => (
                      <Chip
                        key={index}
                        label={subjectObj.subject}
                        size="small"
                        sx={{
                          m: 0.3,
                          backgroundColor: theme.palette.secondary.light,
                          color: theme.palette.secondary.contrastText,
                          fontWeight: 500,
                          "&:hover": {
                            backgroundColor: theme.palette.secondary.main,
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              )
            )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TimetableSection;
