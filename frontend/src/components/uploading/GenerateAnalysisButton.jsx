// GenerateAnalysisButton.js
import React from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Send } from "@mui/icons-material";

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: "12px 24px",
  fontWeight: "bold",
  textTransform: "none",
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  color: "white",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    background: "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
    transform: "scale(1.05)",
  },
}));

const GenerateAnalysisButton = ({
  isGeneratingAnalysis,
  handleGenerateAnalysis,
  isMobile,
}) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <StyledButton
        variant="contained"
        size={isMobile ? "medium" : "large"}
        startIcon={isGeneratingAnalysis ? null : <Send />}
        onClick={handleGenerateAnalysis}
        style={{
          padding: isMobile ? "8px 16px" : "12px 24px",
          fontSize: isMobile ? "0.9rem" : "1rem",
        }}
      >
        {isGeneratingAnalysis ? (
          <Box display="flex" alignItems="center">
            <CircularProgress size={20} color="inherit" />
            <Box ml={1}>Generating...</Box>
          </Box>
        ) : (
          "Generate Analysis"
        )}
      </StyledButton>
    </motion.div>
  );
};

export default GenerateAnalysisButton;