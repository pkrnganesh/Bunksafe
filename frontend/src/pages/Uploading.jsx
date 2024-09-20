import React, { useState, useRef } from "react";
import {
  Container, Box, useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { CloudUpload, DataUsage, CalendarToday, AssessmentOutlined, DoneAll } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Landing/Header";
import FullWidthBox from "../components/uploading/FullWidthBox";
import SvgCurve from "../components/uploading/SvgCurve";
import UploadForm from "../components/uploading/UploadForm";
import AlertSnackbar from "../components/uploading/AlertSnackbar";
import ProgressContent from "../components/uploading/ProgressContent";
import { GenerateAnalysis } from "../api/Generation";

const timetableImage = require("../images/timetable.svg");
const timetableImage2 = require("../images/timetable2.svg");

const UploadData = () => {
  const [attendanceRequirement, setAttendanceRequirement] = useState(75);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [attendanceFile, setAttendanceFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [currentStep, setCurrentStep] = useState(0);

  const fileInputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const steps = [
    { name: "Extracting Text", icon: CloudUpload },
    { name: "Processing Text", icon: DataUsage },
    { name: "Calculating Valid Days", icon: CalendarToday },
    { name: "Calculating Attendance", icon: AssessmentOutlined },
    { name: "Creating Calendar", icon: DoneAll },
  ];

  const showAlert = (message, severity = "error") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAttendanceFile(file);
    setFileName(file.name);
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
    }, 100);
  };

  const handleGenerateAnalysis = async () => {
    if (!attendanceFile) {
      showAlert("Please upload a timetable file.");
      return;
    }
    if (!fromDate) {
      showAlert("Please select a start date.");
      return;
    }
    if (!toDate) {
      showAlert("Please select an end date.");
      return;
    }
    if (!attendanceRequirement) {
      showAlert("Please enter the attendance requirement.");
      return;
    }
  
    setIsGeneratingAnalysis(true);
    setShowProgressBar(true);
  
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1000);
  
    try {
      const response = await GenerateAnalysis({
        file: attendanceFile,
        percentage: attendanceRequirement,
        fromDate,
        toDate,
      });
  
      // Store the response in localStorage (or sessionStorage)
      localStorage.setItem('analysisResponse', JSON.stringify(response));
  
      setIsGeneratingAnalysis(false);
      setShowProgressBar(false);
      setCurrentStep(0);
      showAlert("Analysis generated successfully!", "success");
  
      // Navigate to /generation page
      window.location.href = '/generation'; // Alternatively, use React Router's navigate
  
    } catch (error) {
      console.error("Error generating analysis:", error);
      showAlert("Error generating analysis. Please try again.", "error");
    } finally {
      clearInterval(interval);
      setIsGeneratingAnalysis(false);
      setShowProgressBar(false);
      setCurrentStep(0);
    }
  };
  

  const handleCancelAnalysis = () => {
    setIsGeneratingAnalysis(false);
    setShowProgressBar(false);
    setCurrentStep(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <FullWidthBox>
        <Container maxWidth="lg" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
          </motion.div>
          {showProgressBar ? (
            <ProgressContent
              currentStep={currentStep}
              handleCancelAnalysis={handleCancelAnalysis}
            />
          ) : (
            <UploadForm
              isMobile={isMobile}
              isUploading={isUploading}
              uploadComplete={uploadComplete}
              fileName={fileName}
              handleUpload={handleUpload}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
              attendanceRequirement={attendanceRequirement}
              setAttendanceRequirement={setAttendanceRequirement}
              isGeneratingAnalysis={isGeneratingAnalysis}
              handleGenerateAnalysis={handleGenerateAnalysis}
            />
          )}
        </Container>
        <SvgCurve>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,50 350,0 600,50 C850,100 1050,50 1200,0 L1200,120 L0,120 Z"
              className="shape-fill"
            />
          </svg>
        </SvgCurve>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 0,
          }}
        >
          <img
            src={timetableImage.default}
            alt="Timetable"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 0,
            display: { xs: "none", sm: "block" },
          }}
        >
          <img
            src={timetableImage2.default}
            alt="Timetable"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      </FullWidthBox>
      <AlertSnackbar
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        onClose={handleAlertClose}
      />
    </ThemeProvider>
  );
};

export default UploadData;
