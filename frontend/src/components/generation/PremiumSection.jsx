import React from "react";
import { Card, CardContent, Typography, Box,Button } from "@mui/material";
import { motion } from "framer-motion";
import crown from "../../images/crown.svg";
import SkeletonCard from "./SkeletonCard";

const glassStyle = {
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  padding: "24px",
};

const PremiumSection = ({ loading }) => {
  if (loading) {
    return <SkeletonCard height={300} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card
        sx={{
          ...glassStyle,
          height: "75%",
          maxHeight: "400px",
          width: "100%",
          maxWidth: "310px",
          marginTop: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          overflow: "visible",
          position: "relative",
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box
            component="img"
            src={crown}
            alt="crown"
            sx={{
              maxWidth: { xs: "60%", md: "60px" },
              position: "absolute",
              marginBottom: "20px",
              top: 0,
              left: "10px",
            }}
          />
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, color: "white", mb: 1 }}
          >
            Level-Up your Management with Premium
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              fontWeight: 300,
              fontFamily: "sans-serif",
              color: "#f2f2f2",
              mb: 2,
            }}
          >
            Get access to more features and improve your management, with our
            premium subscription.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "gold",
              color: "black",
              borderRadius: "20px",
              padding: "20px",
              fontWeight: "bold",
              width: "100%",
              marginTop: "30px",
              marginBottom: "-800px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#FFD700",
              },
            }}
          >
            Upgrade to Premium
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PremiumSection;

