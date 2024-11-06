import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, Container, Typography, Button, Card, CardContent, TextField, 
  MenuItem, FormControl, InputLabel, Select, Alert, Stepper, Step, 
  StepLabel, useMediaQuery, useTheme, IconButton, Tooltip, Snackbar
} from '@mui/material';
import { 
  AutoAwesome, EmojiObjects, Security, Share, GetApp, 
  FileCopy, PictureAsPdf, Description
} from '@mui/icons-material';
import ExcuseTemplateGallery from "../components/Excuse/ExcuseTemplateGallery";

const categories = [
  { value: 'work', label: 'Work Related' },
  { value: 'social', label: 'Social Events' },
  { value: 'family', label: 'Family Matters' },
  { value: 'health', label: 'Health Related' },
];

const ExcuseGeneratorPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [category, setCategory] = useState('');
  const [recipient, setRecipient] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customDetails, setCustomDetails] = useState('');
  const [generatedExcuse, setGeneratedExcuse] = useState('');
  const [showGenerator, setShowGenerator] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const steps = ['Choose Template', 'Enter Details', 'Preview & Finish'];

  useEffect(() => {
    // Scroll-triggered animation for the hero section
    const heroSection = document.querySelector('.hero-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.5 });

    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  const handleNext = () => {
    if (activeStep === 1) {
      // Generate excuse based on inputs
      const excuse = `Dear ${recipient}, I regret to inform you that I won't be able to attend/complete [EVENT/TASK] due to ${customDetails}. This is related to a ${category} matter. I apologize for any inconvenience caused.`;
      setGeneratedExcuse(excuse);
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShare = () => {
    setSnackbarMessage('Sharing functionality not implemented in this demo.');
    setSnackbarOpen(true);
  };

  const handleDownload = (format) => {
    setSnackbarMessage(`Downloading as ${format.toUpperCase()} (not implemented in this demo).`);
    setSnackbarOpen(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedExcuse);
    setSnackbarMessage('Excuse copied to clipboard!');
    setSnackbarOpen(true);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ExcuseTemplateGallery
            onSelectTemplate={(templateId) => {
              setSelectedTemplate(templateId);
              handleNext();
            }}
          />
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="For whom?"
              placeholder="Enter recipient (e.g., Boss, Friend, Teacher)"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Custom Details"
              placeholder="Enter any specific details for your excuse"
              value={customDetails}
              onChange={(e) => setCustomDetails(e.target.value)}
            />
            <Alert severity="info">
              Tip: Be specific about who the excuse is for and include relevant details. This helps generate a more believable and appropriate excuse.
            </Alert>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Your Excuse is Ready!</Typography>
            <Card elevation={3} sx={{ 
              background: 'rgba(255, 255, 255, 0.7)', 
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}>
              <CardContent>
                <Typography variant="body1">{generatedExcuse}</Typography>
              </CardContent>
            </Card>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Tooltip title="Share">
                  <IconButton onClick={handleShare} color="primary">
                    <Share />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copy to clipboard">
                  <IconButton onClick={handleCopy} color="primary">
                    <FileCopy />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title="Download as PDF">
                  <IconButton onClick={() => handleDownload('pdf')} color="primary">
                    <PictureAsPdf />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download as DOCX">
                  <IconButton onClick={() => handleDownload('docx')} color="primary">
                    <Description />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download as TXT">
                  <IconButton onClick={() => handleDownload('txt')} color="primary">
                    <GetApp />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary">Customizations:</Typography>
              <Typography variant="body2" color="text.secondary">Template ID: {selectedTemplate}</Typography>
              <Typography variant="body2" color="text.secondary">Category: {category}</Typography>
              <Typography variant="body2" color="text.secondary">Recipient: {recipient}</Typography>
              <Typography variant="body2" color="text.secondary">Custom Details: {customDetails}</Typography>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  const HeroSection = () => (
    <Box
      className="hero-section"
      sx={{
        background: 'linear-gradient(45deg, #6B46C1 30%, #805AD5 90%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant={isMobile ? 'h4' : 'h2'} component="h1" gutterBottom>
            Excuse Generator
          </Typography>
          <Typography variant={isMobile ? 'body1' : 'h6'} paragraph>
            Create believable and customized excuses for any situation with our AI-powered Excuse Generator.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt: 4 }}>
            <FeatureItem icon={<AutoAwesome />} text="AI-Powered Excuses" />
            <FeatureItem icon={<EmojiObjects />} text="Customizable Templates" />
            <FeatureItem icon={<Security />} text="Discreet & Reliable" />
          </Box>
        </motion.div>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("/path/to/pattern.svg")',
          opacity: 0.1,
          zIndex: 0,
        }}
      />
    </Box>
  );

  const FeatureItem = ({ icon, text }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      <Typography variant="body1">{text}</Typography>
    </Box>
  );

  return (
    <Box >
      <HeroSection />
      {showGenerator && (
        <Container maxWidth="vlg" sx={{ mt: 4, mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stepper activeStep={activeStep} sx={{ mb: 4 }} orientation={isMobile ? 'vertical' : 'horizontal'}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            <Card elevation={1} sx={{ 
              background: 'rgba(255, 255, 255, 0.8)', 
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                  {steps[activeStep]}
                </Typography>
                {renderStepContent(activeStep)}
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              {activeStep > 0 && (
                <Button onClick={handleBack} variant="outlined">
                  Back
                </Button>
              )}
              {activeStep < steps.length - 1 && (
                <Button onClick={handleNext} variant="contained" color="primary">
                  {activeStep === steps.length - 2 ? 'Generate Excuse' : 'Next'}
                </Button>
              )}
            </Box>
          </motion.div>
        </Container>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ExcuseGeneratorPage;