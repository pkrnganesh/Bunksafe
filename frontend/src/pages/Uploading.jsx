import React, { useState, useRef } from 'react';
import { Grid, Paper, Typography, Button, TextField, Container, Box, CircularProgress, Snackbar, IconButton, useMediaQuery } from '@mui/material';
import { styled, keyframes, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudUpload, Send, CheckCircle, Close, DateRange, PercentOutlined, WavingHand } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Generateanalysis } from '../api/Generation';
import Header from "../components/Landing/Header";
import Lottie from 'react-lottie';
import uploadAnimation from '../animations/animation2.json';


const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const FullWidthBox = styled(Box)(({ theme }) => ({
  width: '100vw',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  marginTop: '-2vh',
  background: 'linear-gradient(135deg, #42daf5 0%, #2196f3 100%)',
  overflow: 'hidden',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(20),
}));

const SvgCurve = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '150px',
  overflow: 'hidden',
  lineHeight: 0,
  transform: 'translateY(1px)',
  '& svg': {
    position: 'relative',
    display: 'block',
    width: 'calc(100% + 1.3px)',
    height: '100%',
  },
  '& .shape-fill': {
    fill: '#FFFFFF',
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 20,
  background: 'white',
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

const UploadData = () => {
  const [attendanceRequirement, setAttendanceRequirement] = useState(75);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [attendanceFile, setAttendanceFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);

  const fileInputRef = useRef(null);
  const theme = useTheme();

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
      setOpenSnackbar(true);
    }, 2000);
  };

  const handleGenerateAnalysis = () => {
    setIsGeneratingAnalysis(true);
    // Simulate API call
    setTimeout(() => {
      Generateanalysis({ file: attendanceFile, percentage: attendanceRequirement, fromDate, toDate });
      setIsGeneratingAnalysis(false);
      // Show success message or navigate to results page
    }, 3000);
  };

  const uploadLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: uploadAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };



  return (
    <ThemeProvider theme={theme}>
      <Header />
      <FullWidthBox>
        <Container maxWidth="lg" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography variant="h3" align="center" gutterBottom style={{ color: 'white', fontWeight: 'bold', marginBottom: '2rem' }}>
              Upload Your Attendance Data
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <StyledPaper>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Box
                      sx={{
                        border: '2px dashed #2196f3',
                        borderRadius: 4,
                        p: 4,
                        textAlign: 'center',
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.04)' },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onClick={handleUpload}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      <AnimatePresence>
                        {isUploading ? (
                          <motion.div
                            key="uploading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Lottie options={uploadLottieOptions} height={200} width={200} />
                          </motion.div>
                        ) : uploadComplete ? (
                          <motion.div
                            key="complete"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          >
                            <CheckCircle sx={{ fontSize: 100, color: 'success.main' }} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="upload"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Lottie options={uploadLottieOptions} height={200} width={200} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <Typography variant="body1" gutterBottom style={{ marginTop: '20px' }}>
                        {isUploading ? 'Uploading...' : uploadComplete ? 'Upload Complete!' : 'Click or drag Timetable file to upload'}
                      </Typography>
                      {fileName && (
                        <Typography variant="body2" color="textSecondary">
                          {fileName}
                        </Typography>
                      )}
                    </Box>
                  </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                  
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
                </Grid>
              </Grid>
              <Box mt={4} display="flex" justifyContent="center">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <StyledButton
                    variant="contained"
                    size="large"
                    startIcon={isGeneratingAnalysis ? null : <Send />}
                    onClick={handleGenerateAnalysis}
                    disabled={!uploadComplete || !fromDate || !toDate || isGeneratingAnalysis}
                  >
                    {isGeneratingAnalysis ? (
                      <Box display="flex" alignItems="center">
                        <CircularProgress size={24} color="inherit" />
                        <Box ml={1}>Generating...</Box>
                      </Box>
                    ) : (
                      'Generate Analysis'
                    )}
                  </StyledButton>
                </motion.div>
              </Box>
            </StyledPaper>
          </motion.div>
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
      </FullWidthBox>
     
    </ThemeProvider>
  );
};

export default UploadData;
