// components/SummarySection.js
import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import thinking from "../../images/thinking.svg";
import SkeletonCard from "./SkeletonCard";
import { motion } from 'framer-motion';


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
        minHeight: "310px",
        position: "relative",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: 2 }}>
      <motion.div
      initial={{ opacity: 0, y: -50 }}  // Start with opacity 0 and move up
      animate={{ opacity: 1, y: 0 }}    // Animate to full opacity and its original position
      transition={{ duration: 1, ease: "easeOut" }} // Add smooth easing and set duration
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 600, color: "white", mb: 2, zIndex: 2 }}
      >
        Attendance <br /> Summary
      </Typography>
    </motion.div>


        <Box
          component="img"
          src={thinking}
          alt="Person using the app"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          sx={{
            maxWidth: { xs: "60%", md: "300px" },
            position: "absolute",
            marginBottom: "20px",
            right: -60,
            marginTop: "-100px",
            zIndex: 3,
            transform: "translateY(-20%)",
          }}
        />
      </CardContent>

      <Box
        sx={{
          textAlign: "center",
          p: 2,
          borderRadius: "16px",
          color: "white",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px) rotateX(5deg)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
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
          background: "white",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          height: "100px",
        }}
      >
        {[
          {
            label: "Total Days",
            value: analysisData.Totaldays,
            color: "yellow",
            percentage: "100%",
          },
          {
            label: "Days to Attend",
            value: analysisData.daysNeededToAttend,
            color: "green",
            percentage: "75%",
          },
          {
            label: "Days Can Skip",
            value: analysisData.daysCanSkip,
            color: "red",
            percentage: "25%",
          },
        ].map((item, index) => (
          <Box
            key={index}
            sx={{
              borderRadius: "12px",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "baseline",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  mb: 0.5,
                  color: "black",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {item.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: item.color, ml: 1 }}
              >
                {item.percentage}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: "rgba(0,0,0,0.7)" }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default SummarySection;
