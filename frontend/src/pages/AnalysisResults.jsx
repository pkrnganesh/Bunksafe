import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ResultsGraph from "../components/generation/ResultsGraph";
import Aiassistance from "../components/generation/Aiassistance";
import CustomCalendar from "../components/generation/CustomCalendar";
import PremiumSection from "../components/generation/PremiumSection";
import SummarySection from "../components/generation/SummarySection";
import SubjectsSection from "../components/generation/SubjectsSection";
import TimetableSection from "../components/generation/TimetableSection";
import AttendanceAnalysisReport from "../components/generation/ReportActions";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import {
  Box,
  Grid,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#42daf5" },
    secondary: { main: "#FFD700" },
    background: { default: "#F5F7FF" },
    text: { primary: "#37474F", secondary: "#78909C" },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 900, fontSize: "4rem", color: "#FFFFFF" },
    h2: { fontWeight: 700, fontSize: "2.5rem", color: "#37474F" },
    h3: { fontWeight: 600, fontSize: "2rem", color: "#37474F" },
    h4: { fontWeight: 600, fontSize: "1.75rem", color: "#37474F" },
    h5: { fontWeight: 600, fontSize: "1.5rem", color: "#37474F" },
    h6: { fontWeight: 600, fontSize: "1.25rem", color: "#37474F" },
    body1: { fontSize: "1.1rem", color: "#37474F" },
    body2: { fontSize: "0.975rem", color: "#78909C" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "10px 20px",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

const AttendanceDashboard = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [highlightedDates, setHighlightedDates] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("analysisResponse");
 
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setAnalysisData(parsedData);
 
          if (parsedData && parsedData.Totaldays) {

            const highlightedDates = Object.keys(parsedData.basicdata).map(
              (date) => ({
                date,
                value: parsedData.basicdata[date].length,
              })
            );

            setHighlightedDates(highlightedDates);
            setLoading(false);
          } else {
            console.error("Parsed data is missing expected properties");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error parsing stored data:", error);
          setLoading(false);
        }
      } else {
        console.error("No analysis data found in localStorage");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDateToMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;
  };

  console.log(analysisData);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          background: "linear-gradient(135deg, #6e8efb, #a777e3)",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container
          maxWidth={false}
          disableGutters
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ display:'flex',justifyContent:'space-between',margin:'30px' }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "white", mb: 2 }}
            >
              Analysis Dashboard
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <AttendanceAnalysisReport analysisData={analysisData} />


            {analysisData && (
              <Typography
              variant="body2" // You can also use a variant with smaller font size like "body2"
              sx={{
                fontSize: "0.875rem", // Set the font size explicitly (you can reduce further if needed)
                fontWeight: 200,
                color: "white",
                mb: 2,
                borderRadius: 8,
                border: "1px solid white",
                display: "flex",
                alignItems: "center", // Align icon and text vertically
                padding: "4px 8px" // Add padding if you want a bit more space inside the box
              }}
            >
              <CalendarMonthIcon fontSize="small" />
              {`${formatDateToMonthYear(analysisData.fromDate)} to ${formatDateToMonthYear(analysisData.toDate)}`}
            </Typography>
            
            )}
            </Box>
          </Box>

          <Grid sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <SummarySection analysisData={analysisData} loading={loading} />
            <TimetableSection analysisData={analysisData} loading={loading} />
            <ResultsGraph
              analysisData={analysisData}
              loading={loading}
              theme={theme}
            />
          </Grid>

          <Grid sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <CustomCalendar
              selectedDate={selectedDate}
              onDateChange={(date) => setSelectedDate(date)}
              highlightedDates={highlightedDates}
            />
            <SubjectsSection analysisData={analysisData} loading={loading} />
            <PremiumSection loading={loading} />
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AttendanceDashboard;