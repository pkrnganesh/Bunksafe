import React, { useState, useRef } from 'react';
import { Box, Typography, CircularProgress, Snackbar, Alert, Grid, TextField } from '@mui/material';
import { CheckCircle, CloudUpload } from '@mui/icons-material';
import { motion } from 'framer-motion';
import {  UploadIcon } from './styles';

const UploadStep = ({ setAttendanceFile, setUploadComplete, handleNext, fromDate, setFromDate, toDate, setToDate, attendanceRequirement, setAttendanceRequirement }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setAttendanceFile(file);
        setIsUploading(true);
        setError('');
        setTimeout(() => {
          setIsUploading(false);
          setUploadComplete(true);
          setOpenSnackbar(true);
          setTimeout(() => {
            handleNext();
          }, 1000);
        }, 3000);
      } else {
        setError('Please upload a PDF or Word document for better analysis.');
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box>
      {/* <Box> */}
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Upload Your Data
        </Typography>
        {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}> */}
          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'primary.main',
              borderRadius: 4,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { backgroundColor: 'rgba(63, 81, 181, 0.04)' },
            }}
            onClick={handleUpload}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
            {isUploading ? (
              <CircularProgress size={100} />
            ) : openSnackbar ? (
              <CheckCircle sx={{ fontSize: 100, color: 'success.main' }} />
            ) : (
              <UploadIcon as={CloudUpload} />
            )}
            <Typography variant="body1" sx={{ mt: 2, fontWeight: 500 }}>
              {isUploading ? 'Uploading...' : openSnackbar ? 'Upload Complete!' : 'Click here to upload your attendance file'}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              Upload PDF or Word document for better analysis
            </Typography>
          </Box>

          <Grid item xs={12} sm={6}>
            <TextField
              label="From Date"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                // startAdornment: <DateRange color="primary" />,
              }}
              required
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
                // startAdornment: <DateRange color="primary" />,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Attendance Requirement"
              type="number"
              value={attendanceRequirement}
              onChange={(e) => setAttendanceRequirement(Math.max(0, Math.min(100, Number(e.target.value))))}
              InputProps={{
                endAdornment: '%',
                // startAdornment: <PercentOutlined color="primary" />,
              }}
              fullWidth
              required
              inputProps={{ min: 0, max: 100 }}
            />
          </Grid>
        {/* </motion.div> */}
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

      {/* </Box> */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Upload completed successfully!
        </Alert>
      </Snackbar>

      
    </Box>
  );
};

export default UploadStep;