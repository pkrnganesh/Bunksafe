import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SecurityIcon from "@mui/icons-material/Security";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import LockIcon from "@mui/icons-material/Lock";
import ExtensionIcon from "@mui/icons-material/Extension";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import SpeedIcon from "@mui/icons-material/Speed";
import MemoryIcon from "@mui/icons-material/Memory";

const FeatureCard = ({ title, description, icon }) => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      mb: -5,
      
      flexDirection: "column",
      boxShadow: "none",
      borderRadius: 2,
      backgroundColor: "transparent",
      p: 2,
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="center" mb={1}>
        {icon}
        <Typography variant="body1" sx={{fontFamily:'unset',fontWeight:600}} ml={1}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const FeatureGrid = () => {
  const features = [
    {
      title: "Universal Move",
      description:
        "Enable seamless integration of Move from both Sui and Aptos.",
      icon: <MoveToInboxIcon sx={{ color: "primary.main" }} />,
    },
    {
      title: "Automatic Inclusion",
      description:
        "Seamlessly interoperate transactions for efficiency and speed.",
      icon: <AutorenewIcon sx={{ color: "primary.main" }} />,
    },
    {
      title: "First Non-EVM",
      description:
        "A more secure contract platform for superchain interoperability.",
      icon: <SecurityIcon sx={{ color: "primary.main" }} />,
    },
    {
      title: "Direct Asset Exchange",
      description:
        "A secure contract platform for superchain interoperability beyond EVM constraints.",
      icon: <SyncAltIcon sx={{ color: "primary.main" }} />,
    },
    {
      title: "Shared Security Responsibility",
      description:
        "Enhance security with shared model, reducing vulnerabilities and increasing reliability.",
      icon: <LockIcon sx={{ color: "primary.main" }} />,
    },
    {
      title: "Modular Architecture",
      description:
        "Allow for flexible development where each part can be improved as needed.",
      icon: <ExtensionIcon sx={{ color: "primary.main" }} />,
    },
    {
      title: "Batched Transactions",
      description:
        "Reduce costs by processing transactions and in batches as a rollup",
      icon: <BatchPredictionIcon sx={{ color: "primary.main" }} />,
    },
    {
      title: "Optimized ZK Proof",
      description:
        "Enhance speed and parallel execution through optimized ZK computations at Move bytecode level.",
      icon: <SpeedIcon sx={{ color: "primary.main" }} />,
    },
    {
      title: "Parallel Execution",
      description:
        "Enable high scalability and performance through parallel transaction processing.",
      icon: <MemoryIcon sx={{ color: "primary.main" }} />,
    },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        mr: 8,
        ml: 8,
        mt: 2,
        background: "linear-gradient(180deg, #e3f2fd, #fce4ec, #ffffff)",
        borderRadius: 2,
        p: 2,
        overflow: "visible",
        position: "relative", // Ensure the parent box is positioned relatively
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        mb={2}
        sx={{justifyContent: "center", position: "relative", top: 0 }} // Ensure the top box is positioned correctly
        
      >
        <Box sx={{ width: "20%", height: "320px", mt: -27, overflow: "visible", position: "relative", top: 0 }}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: "none",
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              p: 2,
              mr: 2,
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="h6" component="h2">
                  Key Features
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ width: "40%", height: "320px", mt: -27, position: "relative", top: 0 }}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: "none",
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              p: 2,
              mr: 2,
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="h6" component="h2">
                  Key Features
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ width: "20%", height: "320px", mt: -27, position: "relative", top: 0 }}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: "none",
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              p: 2,
              mr: 2,
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="h6" component="h2">
                  Key Features
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={index < 3 ? 4 : 4} key={feature.title}>
            <FeatureCard {...feature} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureGrid;
