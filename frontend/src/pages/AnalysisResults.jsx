import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ResultsGraph from "../components/generation/ResultsGraph";
import Aiassistance from "../components/generation/Aiassistance";
import CustomCalendar from "../components/generation/CustomCalendar";
import PremiumSection from "../components/generation/PremiumSection";
import SummarySection from "../components/generation/SummarySection";
import SubjectsSection from "../components/generation/SubjectsSection";
import TimetableSection from "../components/generation/TimetableSection";

import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  Container,
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [highlightedDates, setHighlightedDates] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("analysisResponse");
      console.log("Stored data:", storedData);

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          console.log("Parsed data:", parsedData);

          if (parsedData && parsedData.Totaldays) {
            setAnalysisData(parsedData);

            const highlightedDates = Object.keys(parsedData.basicdata).map(date => ({
              date,
              value: parsedData.basicdata[date].length,
            }));

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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "white",
          overflowX: "hidden",
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={isMobile ? 2 : 3}>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "black", mb: 2 }}
              >
                Analysis Dashboard
              </Typography>
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
              <SubjectsSection analysisData={analysisData} loading={loading} />
              <Box>
                <CustomCalendar
                  selectedDate={selectedDate}
                  onDateChange={(date) => setSelectedDate(date)}
                  highlightedDates={highlightedDates}
                />
                <Aiassistance analysisData={analysisData} loading={loading} />
              </Box>
              <PremiumSection loading={loading} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AttendanceDashboard;