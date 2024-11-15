import React from "react";
import { Typography, Button, Container, Box } from "@mui/material";
import Background2 from "./Bg.svg";
import lefttop from "../images/lefttop.png";
import righttop from "../images/righttop.png";
import downright from "../images/downright.png";
import downleft from "../images/downleft.png";
import logo from "../images/logo.png";

const Herosection = () => {
  const styles = {
    heroSection: {
      textAlign: "center",
      position: "relative",
      minHeight: "80vh",
      maxWidth: "80%",
      margin: "10vh auto 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: `url(${Background2})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "20px",
      border: "1px solid black",
      fontFamily: "'Roboto', sans-serif",
    },
    mainTitle: {
      fontSize: { xs: "2.1rem", md: "3rem" },
      color: "#1a1a1a",
      fontFamily: "'Bodoni Moda', serif",
    },
    subTitle: {
      color: "#666",
      fontSize: { xs: "2.1rem", md: "3rem" },
      marginBottom: "14px",
      fontFamily: "'Bodoni Moda', serif",
    },
    description: {
      color: "#666",
      marginBottom: "32px",
      maxWidth: "500px",
      fontFamily: "'Bodoni Moda', serif",
    },
    demoButton: {
      backgroundColor: "#0066ff",
      padding: "12px 24px",
      borderRadius: "8px",
      textTransform: "none",
      fontSize: "1rem",
      "&:hover": {
        backgroundColor: "#0052cc",
      },
      fontFamily: "'Georgia', 'Times New Roman', serif",
    },
    imageWrapper: {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "space-between",
      zIndex: -1,
    },
    imageContainer: {
      width: "25%",
      height: "25%",
      display: { xs: "none", md: "block" },
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  };

  return (
    <Box>
      <Container>
        <Box sx={styles.heroSection}>
          <img
            src={logo}
            alt="BunkSafe Logo"
            style={{ width: 100, height: 100 }}
          />
          <Typography variant="h1" sx={styles.mainTitle}>
            Master the art of missing
          </Typography>
          <Typography variant="h2" sx={styles.subTitle}>
            all in one place
          </Typography>
          <Typography variant="h6" sx={styles.description}>
            Efficiently manage your tasks and boost productivity.
          </Typography>
          <Button variant="contained" sx={styles.demoButton}>
            Get free demo
          </Button>
          <div style={{ position: "absolute", top: 35, left: 0 }}>
            <img
              src={lefttop}
              alt="Note Icon"
              style={{ width: 200, height: 200 }}
            />
          </div>
          <div style={{ position: "absolute", top: 35, right: 0 }}>
            <img
              src={righttop}
              alt="reminder"
              style={{ width: 200, height: 200 }}
            />
          </div>
          <div style={{ position: "absolute", bottom: -5, left: 40 }}>
            <img
              src={downleft}
              alt="ai"
              style={{ width: 200, height: 200 }}
            />
          </div>
          <div style={{ position: "absolute", bottom: -5, right: 40 }}>
            <img
              src={downright}
              alt="integrations"
              style={{ width: 200, height: 200 }}
            />
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default Herosection;