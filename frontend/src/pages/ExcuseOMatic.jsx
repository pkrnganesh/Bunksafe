import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline, Box, Container, Typography, Button, TextField, Grid, Card, CardContent, IconButton, Avatar, Chip, Divider, LinearProgress, Tooltip, Badge, Slider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ContentCopy, Favorite, Share, Add, Timeline, Language, Psychology, EmojiObjects, AccessTime, Brightness4, Brightness7
} from '@mui/icons-material';

const commonSettings = {
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 600, fontSize: '2rem' },
    h3: { fontWeight: 600, fontSize: '1.5rem' },
    h4: { fontWeight: 500, fontSize: '1.25rem' },
  },
  shape: { borderRadius: 12 },
};

const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'light',
    primary: { main: '#3f51b5' },
    secondary: { main: '#f2f29' },
    background: { default: '#ffffff', paper: 'rgba(255, 255, 255, 0.8)' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 30, backdropFilter: 'blur(6px)' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: '0 10px 40px 0 rgba(0,0,0,0.1)', borderRadius: 20, backdropFilter: 'blur(5px)' },
      },
    },
  },
});

const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'dark',
    primary: { main: '#bb86fc' },
    secondary: { main: '#03dac6' },
    background: { default: '#121212', paper: 'rgba(33, 33, 33, 0.8)' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 30, backdropFilter: 'blur(6px)' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: '0 10px 40px 0 rgba(0,0,0,0.3)', borderRadius: 20, backdropFilter: 'blur(5px)' },
      },
    },
  },
});

const EnhancedBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: 'linear-gradient(135deg, rgba(110, 142, 251, 0.8), rgba(167, 119, 227, 0.8))',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  color: theme.palette.common.white,
  backdropFilter: 'blur(10px)',
  boxShadow: theme.palette.mode === 'dark' ? '0 4px 30px rgba(0,0,0,0.5)' : '0 4px 30px rgba(0,0,0,0.2)',
}));

const InteractiveChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: '#fff',
  fontWeight: 'bold',
  '&:hover, &:focus': {
    opacity: 0.9,
    transform: 'scale(1.05)',
  },
  transition: 'transform 0.3s',
}));

const situations = [
  { id: 'school', label: 'Academic', color: '#4CAF50' },
  { id: 'work', label: 'Professional', color: '#FF9800' },
  { id: 'home', label: 'Personal', color: '#E91E63' },
  { id: 'event', label: 'Social', color: '#2196F3' },
];

const templates = [
  { id: 1, label: 'AI-Powered Apology', description: 'Utilizes advanced NLP for a sincere and contextual excuse', icon: <Psychology /> },
  { id: 2, label: 'Creative Narrative', description: 'Generates a captivating and unique storyline', icon: <EmojiObjects /> },
  { id: 3, label: 'Technical Jargon', description: 'Employs complex terminology for added credibility', icon: <Language /> },
  { id: 4, label: 'Time-Sensitive Excuse', description: 'Crafts an urgency-based explanation', icon: <AccessTime /> },
];

const ExcuseOMatic = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedSituation, setSelectedSituation] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [absurdityLevel, setAbsurdityLevel] = useState(50);
  const [customExcuse, setCustomExcuse] = useState('');
  const [generatedExcuse, setGeneratedExcuse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [likes, setLikes] = useState(0);
  const [excuseHistory, setExcuseHistory] = useState([]);
  const [aiConfidence, setAiConfidence] = useState(0);

  const handleGenerateExcuse = () => {
    setIsGenerating(true);
    setAiConfidence(0);
    
    setTimeout(() => {
      setGeneratedExcuse("I regret to inform you that I am unable to attend today's crucial meeting due to an unprecedented quantum entanglement event in my home office. While setting up for our video call, I inadvertently activated my experimental quantum computer, causing a localized space-time anomaly. Currently, I exist in a superposition of both attending and not attending the meeting. Colleagues passing by my office report hearing echoes of future presentations and witnessing ghostly PowerPoint slides flickering in mid-air. I'm working with leading physicists to resolve this situation and hope to collapse my waveform into a definite 'present' state soon. In the meantime, I've attached a probabilistic summary of my potential contributions to the meeting, calculated across multiple timelines.");
      
      setIsGenerating(false);
      setAiConfidence(98);
      setExcuseHistory(prev => [...prev, { situation: selectedSituation, absurdity: absurdityLevel }]);
    }, 3000);
  };

  useEffect(() => {
    if (aiConfidence > 0) {
      const timer = setInterval(() => {
        setAiConfidence(prev => {
          if (prev < 100) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [aiConfidence]);

  const pieData = excuseHistory.reduce((acc, curr) => {
    const situation = situations.find(s => s.id === curr.situation);
    const existingSlice = acc.find(slice => slice.name === situation?.label);
    if (existingSlice) {
      existingSlice.value += 1;
    } else if (situation) {
      acc.push({ name: situation.label, value: 1, color: situation.color });
    }
    return acc;
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h1" color="primary">
              Excuse-o-Matic Pro
            </Typography>
            <Box>
              <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                <IconButton sx={{ ml: 1 }} onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Card>
                <CardContent>
                  <Typography variant="h2" gutterBottom color="primary">
                    Craft Your Elite Alibi
                  </Typography>
                  <Box mb={3}>
                    <Typography variant="h3" gutterBottom>
                      Select Scenario
                    </Typography>
                    <Grid container spacing={2}>
                      {situations.map((situation) => (
                        <Grid item key={situation.id}>
                          <InteractiveChip
                            label={situation.label}
                            onClick={() => setSelectedSituation(situation.id)}
                            color={selectedSituation === situation.id ? "primary" : "default"}
                            style={{ fontSize: '1rem' }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  <Box mb={3}>
                    <Typography variant="h3" gutterBottom>
                      Select AI Template
                    </Typography>
                    <Grid container spacing={2}>
                      {templates.map((template) => (
                        <Grid item xs={12} sm={6} key={template.id}>
                          <Card 
                            onClick={() => setSelectedTemplate(template.id)}
                            sx={{ 
                              cursor: 'pointer', 
                              border: selectedTemplate === template.id ? '2px solid' : 'none',
                              borderColor: 'primary.main',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              transition: 'transform 0.3s',
                              '&:hover': { transform: 'scale(1.05)' },
                            }}
                          >
                            <CardContent>
                              <Box display="flex" alignItems="center" mb={1}>
                                {template.icon}
                                <Typography variant="h4" ml={1}>{template.label}</Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                {template.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  <Box mb={3}>
                    <Typography variant="h3" gutterBottom>
                      Calibrate Plausibility
                    </Typography>
                    <Slider
                      value={absurdityLevel}
                      onChange={(e, newValue) => setAbsurdityLevel(newValue)}
                      valueLabelDisplay="auto"
                      marks={[
                        { value: 0, label: 'Credible' },
                        { value: 50, label: 'Questionable' },
                        { value: 100, label: 'Outrageous' },
                      ]}
                      sx={{
                        color: 'secondary.main',
                        height: 8,
                        '& .MuiSlider-track': { border: 'none' },
                        '& .MuiSlider-thumb': {
                          height: 24,
                          width: 24,
                          backgroundColor: '#fff',
                          border: '2px solid currentColor',
                          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': { boxShadow: 'inherit' },
                          '&:before': { display: 'none' },
                        },
                        '& .MuiSlider-valueLabel': {
                          lineHeight: 1.2,
                          fontSize: 12,
                          background: 'unset',
                          padding: 0,
                          width: 32,
                          height: 32,
                          borderRadius: '50% 50% 50% 0',
                          backgroundColor: 'secondary.main',
                          transformOrigin: 'bottom left',
                          transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
                          '&:before': { display: 'none' },
                          '&.MuiSlider-valueLabelOpen': { transform: 'translate(50%, -100%) rotate(-45deg) scale(1)' },
                          '& > *': { transform: 'rotate(45deg)' },
                        },
                      }}
                    />
                  </Box>
                  <Box mb={3}>
                    <Typography variant="h3" gutterBottom>
                      Personalize
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      variant="outlined"
                      placeholder="Add custom details to enhance your excuse's uniqueness"
                      value={customExcuse}
                      onChange={(e) => setCustomExcuse(e.target.value)}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={handleGenerateExcuse}
                    startIcon={<Timeline />}
                    disabled={isGenerating}
                    sx={{ py: 1.5, fontSize: '1.1rem' }}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Elite Excuse'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card>
                <CardContent>
                  <Typography variant="h2" gutterBottom color="primary">
                    Your Magnum Opus
                  </Typography>
                  <AnimatePresence mode="wait">
                    {generatedExcuse ? (
                      <motion.div
                        key="excuse"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <EnhancedBox mb={3}>
                          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                            {generatedExcuse}
                          </Typography>
                        </EnhancedBox>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Typography variant="h4" mr={2}>AI Confidence:</Typography>
                          <Box flexGrow={1}>
                            <LinearProgress 
                              variant="determinate" 
                              value={aiConfidence} 
                              sx={{ height: 10, borderRadius: 5 }}
                            />
                          </Box>
                          <Typography variant="h4" ml={2}>{aiConfidence}%</Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box display="flex" justifyContent="space-around">
                          <Tooltip title="Copy to clipboard">
                            <IconButton color="primary" size="large">
                              <ContentCopy />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Like this excuse">
                            <IconButton 
                              color="secondary" 
                              size="large"
                              onClick={() => setLikes(prev => prev + 1)}
                            >
                              <Badge badgeContent={likes} color="secondary">
                                <Favorite />
                              </Badge>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Share your excuse">
                            <IconButton color="primary" size="large">
                              <Share />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          height="100%"
                          minHeight="300px"
                        >
                          <img src="/api/placeholder/300/200" alt="Placeholder" style={{ marginBottom: '20px' }} />
                          <Typography variant="h3" color="text.secondary" align="center">
                            Your brilliantly crafted excuse will appear here
                          </Typography>
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Box mt={6}>
            <Typography variant="h2" align="center" gutterBottom color="primary">
              Trending Excuses
            </Typography>
            <Grid container spacing={3}>
              {[1, 2, 3].map((i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" gutterBottom>
                        Top Excuse #{i}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </Typography>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Chip label={`Trending #${i}`} color="primary" />
                        <IconButton color="primary">
                          <Add />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          
          <Box mt={6} mb={4}>
            <Typography variant="h6" align="center" color="text.secondary">
              © 2024 Excuse-o-Matic Pro. Use responsibly. We are not liable for any consequences of your brilliant excuses.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ExcuseOMatic;
