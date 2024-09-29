import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box, AppBar, Toolbar, Typography, TextField, Button, IconButton,
  Switch, Tooltip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, useMediaQuery, Snackbar, Alert, CssBaseline,
  Drawer, List, ListItem, ListItemIcon, ListItemText, Fab, Dialog,
  DialogTitle, DialogContent, DialogActions, LinearProgress, Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
  Save as SaveIcon,
  CloudUpload as CloudUploadIcon,
  School as SchoolIcon,
  EmojiEvents as EmojiEventsIcon,
  Timeline as TimelineIcon,
  Calculate as CalculateIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const gradePoints = {
  'A+': 10, 'A': 9, 'A-': 8, 'B+': 7, 'B': 6, 'B-': 5, 'C+': 4, 'C': 3, 'C-': 2, 'D': 1, 'F': 0
};

const ImmersiveCGPACalculator = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [subjects, setSubjects] = useState([
    { name: 'Subject 1', grade: 'A', credits: 3 },
    { name: 'Subject 2', grade: 'B+', credits: 3 },
  ]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [goalCGPA, setGoalCGPA] = useState(8.5);
  const [achievementDialogOpen, setAchievementDialogOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const savedSubjects = localStorage.getItem('cgpaSubjects');
    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cgpaSubjects', JSON.stringify(subjects));
  }, [subjects]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#BB86FC' : '#6200EE',
      },
      background: {
        default: darkMode ? '#121212' : '#f4f6f8',
        paper: darkMode ? '#1E1E1E' : '#ffffff',
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.3s ease',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: darkMode ? '#1E1E1E' : '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: darkMode ? '#555' : '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: darkMode ? '#777' : '#555',
            },
          },
        },
      },
    },
  });

  const addSubject = () => {
    setSubjects([...subjects, { name: `Subject ${subjects.length + 1}`, grade: 'A', credits: 3 }]);
    setSnackbar({ open: true, message: 'Subject added successfully!', severity: 'success' });
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
    setSnackbar({ open: true, message: 'Subject removed successfully!', severity: 'info' });
  };

  const handleChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const calculateCGPA = () => {
    const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
    const totalGradePoints = subjects.reduce((sum, subject) => sum + (gradePoints[subject.grade] * subject.credits), 0);
    return (totalGradePoints / totalCredits).toFixed(2);
  };

  const calculateProgress = () => {
    const currentCGPA = parseFloat(calculateCGPA());
    return Math.min((currentCGPA / goalCGPA) * 100, 100);
  };

  const checkAchievements = () => {
    const currentCGPA = parseFloat(calculateCGPA());
    if (currentCGPA >= goalCGPA) {
      setAchievementDialogOpen(true);
    }
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {['Dashboard', 'Subjects', 'Goals', 'Achievements'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 ? <SchoolIcon /> : index === 1 ? <TimelineIcon /> : index === 2 ? <CalculateIcon /> : <EmojiEventsIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Immersive CGPA Calculator
            </Typography>
            <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {drawer}
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h5" gutterBottom>Your Subjects</Typography>
                <AnimatePresence>
                  {subjects.map((subject, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Box display="flex" mb={2} flexDirection={isMobile ? 'column' : 'row'} alignItems="center">
                        <TextField
                          label={`Subject ${index + 1}`}
                          value={subject.name}
                          onChange={(e) => handleChange(index, 'name', e.target.value)}
                          variant="outlined"
                          size="small"
                          sx={{ mr: 2, mb: isMobile ? 1 : 0, flexGrow: 1 }}
                        />
                        <TextField
                          select
                          label="Grade"
                          value={subject.grade}
                          onChange={(e) => handleChange(index, 'grade', e.target.value)}
                          variant="outlined"
                          size="small"
                          sx={{ mr: 2, mb: isMobile ? 1 : 0, width: 100 }}
                          SelectProps={{
                            native: true,
                          }}
                        >
                          {Object.keys(gradePoints).map((grade) => (
                            <option key={grade} value={grade}>{grade}</option>
                          ))}
                        </TextField>
                        <TextField
                          label="Credits"
                          type="number"
                          value={subject.credits}
                          onChange={(e) => handleChange(index, 'credits', parseInt(e.target.value) || 0)}
                          variant="outlined"
                          size="small"
                          sx={{ mr: 2, mb: isMobile ? 1 : 0, width: 80 }}
                        />
                        <IconButton 
                          onClick={() => removeSubject(index)} 
                          color="error" 
                          size="small"
                          aria-label={`Remove subject ${index + 1}`}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Box>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <Button
                  startIcon={<AddIcon />}
                  onClick={addSubject}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Add Subject
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h5" gutterBottom>CGPA Overview</Typography>
                <Typography variant="h3" fontWeight="bold" color="primary">
                  {calculateCGPA()}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Your current CGPA
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={calculateProgress()} 
                  sx={{ mt: 2, mb: 1, height: 10, borderRadius: 5 }}
                />
                <Typography variant="body2" color="textSecondary">
                  {calculateProgress().toFixed(1)}% towards your goal CGPA of {goalCGPA}
                </Typography>
              </Paper>

              <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>Set CGPA Goal</Typography>
                <TextField
                  label="Goal CGPA"
                  type="number"
                  value={goalCGPA}
                  onChange={(e) => setGoalCGPA(parseFloat(e.target.value) || 0)}
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={checkAchievements}
                  fullWidth
                >
                  Check Progress
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Fab 
          color="primary" 
          aria-label="save" 
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => setSnackbar({ open: true, message: 'Progress saved successfully!', severity: 'success' })}
        >
          <SaveIcon />
        </Fab>
      </Box>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog open={achievementDialogOpen} onClose={() => setAchievementDialogOpen(false)}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <Typography>
            You've reached your CGPA goal of {goalCGPA}! Keep up the great work!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAchievementDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ImmersiveCGPACalculator;
