import React, { useState, useRef } from 'react';
import { Grid, Paper, Typography, Button, TextField, Container, Box, Stepper, Step, StepLabel, CircularProgress, Snackbar, IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { CloudUpload, Send, CheckCircle, Close, BarChart, DateRange, PercentOutlined } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 20,
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 30px 0 rgba(31, 38, 135, 0.5)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: '12px 24px',
  fontWeight: 'bold',
  textTransform: 'none',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
    transform: 'scale(1.05)',
  },
}));

const UploadIcon = styled(CloudUpload)(({ theme }) => ({
  fontSize: 100,
  color: theme.palette.primary.main,
  animation: `${float} 3s ease-in-out infinite`,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    background: theme.palette.primary.dark,
  },
}));

const UploadData = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [attendanceRequirement, setAttendanceRequirement] = useState(75);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [attendanceFile, setAttendanceFile] = useState(null);

  const fileInputRef = useRef(null);

  const steps = ['Upload Data', 'Set Parameters', 'Generate Analysis'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setAttendanceFile(event.target.files[0]);
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
      setOpenSnackbar(true);
      setTimeout(() => {
        handleNext();
      }, 1000);
    }, 3000);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleGenerateAnalysis = () => {
    console.log('Attendance File:', attendanceFile);
    console.log('From Date:', fromDate);
    console.log('To Date:', toDate);
    console.log('Attendance Requirement:', attendanceRequirement);
    // Perform analysis and generate report here
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" style={{ marginTop: '40px', marginBottom: '40px' }}>
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h3" gutterBottom align="center" style={{ fontWeight: 'bold', color: '#2196f3' }}>
            Attendance Analysis Generator
          </Typography>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Typography variant="subtitle1" gutterBottom align="center" style={{ marginBottom: '40px' }}>
            Optimize your attendance data with our advanced analysis tool
          </Typography>
        </motion.div>

        <Stepper activeStep={activeStep} alternativeLabel style={{ marginBottom: '40px' }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel StepIconComponent={() => (
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                  <StyledIconButton>
                    {index === 0 ? <CloudUpload /> : index === 1 ? <DateRange /> : <BarChart />}
                  </StyledIconButton>
                </motion.div>
              )}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <StyledPaper>
            {activeStep === 0 && (
              <Box>
                <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                  Upload Your Data
                </Typography>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Box
                    sx={{
                      border: '2px dashed #2196f3',
                      borderRadius: 4,
                      p: 4,
                      textAlign: 'center',
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.04)' },
                    }}
                    onClick={handleUpload}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    {isUploading ? (
                      <CircularProgress size={100} />
                    ) : uploadComplete ? (
                      <CheckCircle sx={{ fontSize: 100, color: 'success.main' }} />
                    ) : (
                      <UploadIcon />
                    )}
                    <Typography variant="body1" gutterBottom style={{ marginTop: '20px' }}>
                      {isUploading ? 'Uploading...' : uploadComplete ? 'Upload Complete!' : 'Click here to upload your attendance file'}
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                  Set Analysis Parameters
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="From Date"
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      InputProps={{
                        startAdornment: <DateRange color="primary" />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="To Date"
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      InputProps={{
                        startAdornment: <DateRange color="primary" />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      label="Attendance Requirement"
                      type="number"
                      value={attendanceRequirement}
                      onChange={(e) => setAttendanceRequirement(e.target.value)}
                      InputProps={{
                        endAdornment: '%',
                        startAdornment: <PercentOutlined color="primary" />,
                      }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeStep === 2 && (
              <Box textAlign="center">
                <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
                  Ready to Generate Analysis
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Click the button below to start generating your attendance analysis.
                </Typography>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <StyledButton
                    variant="contained"
                    size="large"
                    startIcon={<Send />}
                    style={{ marginTop: '20px' }}
                    onClick={handleGenerateAnalysis}
                  >
                    Generate Analysis
                  </StyledButton>
                </motion.div>
              </Box>
            )}

            <Box mt={4} display="flex" justifyContent="space-between">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1 || (activeStep === 0 && !uploadComplete)}
              >
                {activeStep === steps.length - 1 ? '' : 'Next'}
              </Button>
            </Box>
          </StyledPaper>
        </motion.div>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Upload completed successfully!"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </ThemeProvider>
  );
};

export default UploadData;