// UploadForm.js
import React from "react";
import { Grid, Paper, Box,Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import FileUploadArea from "./FileUploadArea";
import DateInputs from "./DateInputs";
import AttendanceRequirementInput from "./AttendanceRequirementInput";
import GenerateAnalysisButton from "./GenerateAnalysisButton";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 20,
  height: "330px",
  background: "white",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 30px 0 rgba(31, 38, 135, 0.5)",
  },
  "@media (max-width: 600px)": {
    height: "100%",
  },
}));

const UploadForm = ({
  isMobile,
  isUploading,
  uploadComplete,
  fileName,
  handleUpload,
  fileInputRef,
  handleFileChange,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  attendanceRequirement,
  setAttendanceRequirement,
  isGeneratingAnalysis,
  handleGenerateAnalysis,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >

     
      <StyledPaper
        style={{
        //   padding: isMobile ? theme.spacing(2) : theme.spacing(4),
        }}
      >
           <Typography
              variant={isMobile ? "h4" : "p"}
              align="left"
              gutterBottom
              style={{
                color: "black",
                fontWeight: "bold",
                marginBottom: "2rem",
                marginLeft: "2rem",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Upload Your Semester Info
            </Typography>
        <Grid container spacing={isMobile ? 2 : 4}>
          <Grid item xs={12} md={6}>
            <FileUploadArea
              isUploading={isUploading}
              uploadComplete={uploadComplete}
              fileName={fileName}
              handleUpload={handleUpload}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              isMobile={isMobile}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={isMobile ? 2 : 3}>
              <DateInputs
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                isMobile={isMobile}
              />
              <AttendanceRequirementInput
                attendanceRequirement={attendanceRequirement}
                setAttendanceRequirement={setAttendanceRequirement}
                isMobile={isMobile}
              />
            </Grid>
          </Grid>
        </Grid>
        <Box mt={4} display="flex" justifyContent="center">
          <GenerateAnalysisButton
            isGeneratingAnalysis={isGeneratingAnalysis}
            handleGenerateAnalysis={handleGenerateAnalysis}
            isMobile={isMobile}
          />
        </Box>
      </StyledPaper>
    </motion.div>
  );
};

export default UploadForm;