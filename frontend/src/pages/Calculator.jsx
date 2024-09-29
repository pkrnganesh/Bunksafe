import React, { useState } from "react";
import { ThemeProvider, createTheme, alpha } from "@mui/material/styles";
import {
  Box,
  AppBar,
  Typography,
  Snackbar,
  Alert,
  CssBaseline,
  LinearProgress,
  Grow,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
} from "@mui/material";
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Share as ShareIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import { CGPACalculator, SGPAToCGPA, MarksCalculator } from "./Tools";

const gradeScales = {
  3: { A: 3, B: 2, C: 1, F: 0 },
  5: { A: 5, B: 4, C: 3, D: 2, F: 0 },
  10: {
    "A+": 10,
    A: 9,
    "A-": 8,
    "B+": 7,
    B: 6,
    "B-": 5,
    "C+": 4,
    C: 3,
    "C-": 2,
    D: 1,
    F: 0,
  },
};

const  EnhancedCGPACalculator = () => {
  const [subjects, setSubjects] = useState([
    { name: "Subject 1", grade: "A", credits: 3 },
    { name: "Subject 2", grade: "B", credits: 3 },
  ]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [goalCGPA, setGoalCGPA] = useState(8.5);
  const [calculatorType, setCalculatorType] = useState("CGPA");
  const [cgpaHistory, setCGPAHistory] = useState([]);
  const [gradeScale, setGradeScale] = useState(10);

  const theme = useTheme();

  const customTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#6200EE",
      },
      background: {
        default: "#f4f6f8",
        paper: "#ffffff",
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          body {
            transition: all 0.3s linear;
          }
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background:  #f1f1f1"};
          }
          ::-webkit-scrollbar-thumb {
            background: "#888"};
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: "#555"};
          }
        `,
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(10px)",
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
          },
        },
      },
    },
  });

  const addSubject = () => {
    setSubjects([
      ...subjects,
      { name: `Subject ${subjects.length + 1}`, grade: "A", credits: 3 },
    ]);
    setSnackbar({
      open: true,
      message: "Subject added successfully!",
      severity: "success",
    });
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
    setSnackbar({
      open: true,
      message: "Subject removed successfully!",
      severity: "info",
    });
  };

  const handleChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const calculateCGPA = () => {
    const totalCredits = subjects.reduce(
      (sum, subject) => sum + subject.credits,
      0
    );
    const totalGradePoints = subjects.reduce(
      (sum, subject) =>
        sum + gradeScales[gradeScale][subject.grade] * subject.credits,
      0
    );
    return (totalGradePoints / totalCredits).toFixed(2);
  };

  const updateCGPAHistory = () => {
    const currentCGPA = parseFloat(calculateCGPA());
    setCGPAHistory([
      ...cgpaHistory,
      { date: new Date().toLocaleDateString(), cgpa: currentCGPA },
    ]);
  };

  const calculateProgress = () => {
    const currentCGPA = parseFloat(calculateCGPA());
    return Math.min((currentCGPA / goalCGPA) * 100, 100);
  };

  const handleSave = () => {
    setTimeout(() => {
      updateCGPAHistory();
      setSnackbar({
        open: true,
        message: "Progress saved successfully!",
        severity: "success",
      });
    }, 1000);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        ></AppBar>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: "auto",
            flex: "display",
            justifyContent: "space-between",
          }}
        >
          <Card sx={{ mb: 2, borderRadius: "15px" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                CGPA Overview
              </Typography>
              <Typography variant="h3" fontWeight="bold" color="primary">
                {calculateCGPA()}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Your current CGPA
              </Typography>
              <LinearProgress
                variant="determinate"
                value={calculateProgress()}
                sx={{
                  mt: 2,
                  mb: 1,
                  height: 10,
                  borderRadius: 5,
                  width: "10%",
                }}
              />
              <Typography variant="body2" color="textSecondary">
                {calculateProgress().toFixed(1)}% towards your goal CGPA of{" "}
                {goalCGPA}
              </Typography>
            </CardContent>

            <br />
            <FormControl variant="outlined" sx={{ minWidth: 120,margin:'10px' }}>
              <InputLabel>Calculator Type</InputLabel>
              <Select
                value={calculatorType}
                onChange={(e) => setCalculatorType(e.target.value)}
                label="Calculator Type"
              >
                <MenuItem value="CGPA">CGPA Calculator</MenuItem>
                <MenuItem value="SGPA">SGPA to CGPA</MenuItem>
                <MenuItem value="Marks">Marks Calculator</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              sx={{ minWidth: 120, margin: "10px" }}
            >
              <InputLabel>Grade Scale</InputLabel>
              <Select
                value={gradeScale}
                onChange={(e) => setGradeScale(e.target.value)}
                label="Grade Scale"
              >
                <MenuItem value={3}>3-point scale</MenuItem>
                <MenuItem value={5}>5-point scale</MenuItem>
                <MenuItem value={10}>10-point scale</MenuItem>
              </Select>
            </FormControl>
          </Card>
          {calculatorType === "CGPA" && (
            <CGPACalculator
              subjects={subjects}
              setSubjects={setSubjects}
              addSubject={addSubject}
              removeSubject={removeSubject}
              handleChange={handleChange}
              calculateCGPA={calculateCGPA}
              setSnackbar={setSnackbar}
              gradeScale={gradeScale}
            />
          )}
          {calculatorType === "SGPA" && (
            <SGPAToCGPA setSnackbar={setSnackbar} />
          )}
          {calculatorType === "Marks" && (
            <MarksCalculator setSnackbar={setSnackbar} />
          )}
        </Box>

        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            icon={<SaveIcon />}
            tooltipTitle="Save"
            onClick={handleSave}
          />
          <SpeedDialAction
            icon={<RefreshIcon />}
            tooltipTitle="Reset"
            onClick={() => {
              setSubjects([{ name: "Subject 1", grade: "A", credits: 3 }]);
              setSnackbar({
                open: true,
                message: "Data reset successfully!",
                severity: "info",
              });
            }}
          />
          <SpeedDialAction
            icon={<ShareIcon />}
            tooltipTitle="Share"
            onClick={() =>
              setSnackbar({
                open: true,
                message: "Sharing functionality coming soon!",
                severity: "info",
              })
            }
          />
          <SpeedDialAction
            icon={<PrintIcon />}
            tooltipTitle="Print"
            onClick={() => window.print()}
          />
        </SpeedDial>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default EnhancedCGPACalculator;
