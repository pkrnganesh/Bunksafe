// components/SummarySection.js
import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import thinking from "../../images/thinking.svg";
import SkeletonCard from "./SkeletonCard";

const glassStyle = {
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  padding: "24px",
};

const SummarySection = ({ analysisData, loading }) => {
  if (loading) {
    return <SkeletonCard height={200} />;
  }

  return (
    <Card
      sx={{
        ...glassStyle,
        height: "56%",
        width: "26%",
        position: "relative",
        background: "linear-gradient(to right, gold, white)",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, color: "black", mb: 2, zIndex: 2 }}
        >
          Attendance Summary
        </Typography>

        <Box
          component="img"
          src={thinking}
          alt="Person using the app"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          sx={{
            maxWidth: { xs: "60%", md: "350px" },
            position: "absolute",
            marginBottom: "20px",
            right: -60,
            marginTop: "-100px",
            zIndex: 3,
            transform: "translateY(-20%)",
          }}
        />

        <Grid container spacing={2}>
          {analysisData && (
            <>
              <Grid item xs={12}>
                {/* Existing content at the top */}
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>

      <Box
        sx={{
          textAlign: "center",
          p: 1.5,
          borderRadius: "12px",
          color: "white",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          position: "absolute",
          bottom: 10,
          margin: "auto",
          marginLeft: "-1%",
          marginBottom: "2%",
          width: "86%",
          backgroundColor: "black",
          height: "90px",
        }}
      >
        <div>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, mb: 0.5, color: "white" }}
            >
              {analysisData.Totaldays}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: "yellow" }}
            >
              100%
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Total Days
          </Typography>
        </div>
        <div>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 0.5, color: "white" }}
            >
              {analysisData.daysNeededToAttend}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "green" }}
            >
              75%
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Days to Attend
          </Typography>
        </div>
        <div>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 0.5, color: "white" }}
            >
              {analysisData.daysCanSkip}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "red" }}
            >
              40%
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Days Can Skip
          </Typography>
        </div>
      </Box>
    </Card>
  );
};

export default SummarySection;