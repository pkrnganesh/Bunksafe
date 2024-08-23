import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

const UsedBy = () => {
  const companies = [
    { name: "Mozilla", image: require("../../universitieslogo/1.svg").default },
    { name: "Mozilla", image: require("../../universitieslogo/2.svg").default },
    { name: "Mozilla", image: require("../../universitieslogo/3.svg").default },
    { name: "Mozilla", image: require("../../universitieslogo/4.svg").default },
    { name: "Mozilla", image: require("../../universitieslogo/5.svg").default },
    { name: "Mozilla", image: require("../../universitieslogo/6.svg").default },
    { name: "Mozilla", image: require("../../universitieslogo/7.svg").default },
    { name: "Mozilla", image: require("../../universitieslogo/8.svg").default },
    { name: "Mozilla", image: require("../../universitieslogo/9.svg").default },
    { name: "Mozilla", image: require("../../universitieslogo/10.svg").default },
    { name: "Mozilla", image: require("../../universitieslogo/11.svg").default },
    { name: "Mozilla", image: require("../../universitieslogo/12.svg").default },

  ];

  // Keyframes for animations
  const fadeIn = keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const logoHover = keyframes`
    0% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-5px) rotate(3deg) scale(1.05);
    }
    100% {
      transform: translateY(0) rotate(0deg);
    }
  `;

  const logoSlide = keyframes`
    0% { transform: translateX(-100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  `;

  return (
    <Box
      sx={{
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "black",
          fontWeight: "bold",
          marginBottom: "40px",
          animation: `${fadeIn} 3s ease-in-out`,
          fontFamily: "'Poppins', sans-serif", // Stylish font
        }}
      >
        Trusted by over 4,000 students across top universities in India
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{
          animation: `${logoSlide} 4s ease-out`, // Initial slide-in animation for logos
        }}
      >
        {companies.map((company, index) => (
          <Grid item key={index}>
            <Box
              component="img"
              src={company.image}
              alt={company.name}
              sx={{
                maxWidth: "100px",
                maxHeight: "40px",
                filter: "grayscale(100%)",
                transition: "filter 0.3s ease, transform 0.5s ease",
                "&:hover": {
                  filter: "grayscale(0%)",
                  animation: `${logoHover} 1.5s ease-in-out infinite`, // 3D hover effect
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UsedBy;
