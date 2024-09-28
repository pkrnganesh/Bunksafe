import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ResultsGraph from "../components/generation/ResultsGraph";
import Aiassistance from "../components/generation/Aiassistance";
import {
  Box,
  Grid,
  Typography,
  Chip,
  LinearProgress,
  useMediaQuery,
  Card,
  CardContent,
  Container,
  Skeleton,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import thinking from "../images/thinking.svg";
import crown from "../images/crown.svg";
import { blue } from "@mui/material/colors";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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

const MotionCard = motion(Card);

const glassStyle = {
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  padding: "24px",
};

const SkeletonCard = ({ height }) => (
  <Card sx={{ ...glassStyle, height }}>
    <CardContent>
      <Skeleton variant="text" width="60%" height={32} />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={height - 80}
        sx={{ mt: 2 }}
      />
    </CardContent>
  </Card>
);

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
  
            // Extract highlighted dates from basicdata
            const highlightedDates = Object.keys(parsedData.basicdata).map(date => ({
              date,
              value: parsedData.basicdata[date].length, // You can customize the value based on your requirement
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
  
  const CustomCalendar = ({ selectedDate, onDateChange, highlightedDates }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
  
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
  
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    const previousMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
      );
    };
  
    const nextMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
      );
    };
  
    const isHighlighted = (date) => {
      return highlightedDates.some((d) => d.date === date);
    };
  
    const getHighlightColor = (date) => {
      const highlighted = highlightedDates.find((d) => d.date === date);
      return highlighted
        ? highlighted.value > 0
          ? "green"
          : theme.palette.error.main
        : "transparent";
    };
  
    return (
      <Box
      sx={{ height: "75%", width: "40%", marginLeft: '15px', marginTop: '-160px',minWidth:"360px",
      backgroundColor: "white", boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)", borderRadius: "16px", padding: "24px",  }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
          
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, color: theme.palette.primary.main }}
          >
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Typography>
          <Box>
            <Button onClick={previousMonth} sx={{ minWidth: "auto", p: 1 }}>
              <ArrowBackIosNewIcon />
            </Button>
            <Button onClick={nextMonth} sx={{ minWidth: "auto", p: 1 }}>
              <ArrowForwardIosIcon />
            </Button>
          </Box>
        </Box>
        <Grid container columns={7} sx={{ textAlign: "center" }}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <Grid item xs={1} key={day}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: theme.palette.text.secondary }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <Grid item xs={1} key={`empty-${index}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const date = `${currentMonth.getFullYear()}-${String(
              currentMonth.getMonth() + 1
            ).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`;
            return (
              <Grid item xs={1} key={date} sx={{ p: 1 }}>
                <Button
                  onClick={() => onDateChange(date)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor:
                      date === selectedDate
                        ? theme.palette.primary.main
                        : "transparent",
                    color:
                      date === selectedDate
                        ? "white"
                        : theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor:
                        date === selectedDate
                          ? theme.palette.primary.dark
                          : theme.palette.action.hover,
                    },
                    position: "relative",
                  }}
                >
                  {index + 1}
                  {isHighlighted(date) && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 2,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: getHighlightColor(date),
                      }}
                    />
                  )}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };
  

  const SummarySection = () =>
    loading ? (
      <SkeletonCard height={200} />
    ) : (
      <Card
        sx={{
          ...glassStyle,
          height: "56%",
          width: "26%",
          position: "relative",
          background: "linear-gradient(to right, gold, white)",
          overflow: "visible", // Allow the image to overflow outside
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, color: "black", mb: 2, zIndex: 2 }}
          >
            Attendance Summary
          </Typography>

          <Box
            component="img"
            src={thinking}
            alt="Person using the app"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            sx={{
              maxWidth: { xs: "60%", md: "300px" },
              position: "absolute",
              marginBottom: "20px",
              right: -60,
              marginTop: "-100px",
              zIndex: 3, // Bring the image to the front
              transform: "translateY(-20%)", // Adjust the position to move it outside
            }}
          />

          <Grid container spacing={2}>
            {analysisData && (
              <>
                <Grid item xs={12}>
                  {/* Existing content at the top */}
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>

        <Box
          sx={{
            textAlign: "center",
            p: 1.5,
            borderRadius: "12px",
            color: "white",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            },
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            position: "absolute",
            bottom: 10,
            margin: "auto",
            marginLeft: "-1%",
            marginBottom: "2%",
            width: "86%",
            backgroundColor: "black",
            height: "90px",
          }}
        >
          <div>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, mb: 0.5, color: "white" }}
              >
                {analysisData.Totaldays}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "green" }}
              >
                100%
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Total Days
            </Typography>
          </div>
          <div>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 0.5, color: "white" }}
              >
                {analysisData.daysNeededToAttend}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "green" }}
              >
                100%
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Days to Attend
            </Typography>
          </div>
          <div>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 0.5, color: "white" }}
              >
                {analysisData.daysCanSkip}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "green" }}
              >
                100%
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Days Can Skip
            </Typography>
          </div>
        </Box>
      </Card>
    );

  const SubjectsSection = () => {
    const maxSubjectsToShow = 5; // Set the max number of subjects to show at once

    return loading ? (
      <SkeletonCard height={300} />
    ) : (
      <MotionCard
        sx={{
          ...glassStyle,
          height: "120%",
          width: "26%",
          minWidth:"550px",
          position: "relative",
          marginLeft: "15px",
          marginTop: "-160px",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, color: "black", mb: 2 }}
          >
            Student-wise Attendance
          </Typography>

          <Box
            sx={{
              maxHeight: 450, // Adjust height to show 5 subjects
              overflowY: "auto", // Enable vertical scrolling
              // Custom scrollbar styles
              "&::-webkit-scrollbar": {
                width: "8px", // Width of the scrollbar
              },
              "&::-webkit-scrollbar-track": {
                background: "rgba(255, 255, 255, 0.2)", // Scrollbar track color
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(0, 0, 0, 0.5)", // Scrollbar thumb color
                borderRadius: "10px",
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.7)", // Darker on hover
                },
              },
            }}
          >
            <Grid container spacing={2}>
              {analysisData &&
                Object.entries(
                  analysisData.AttendanceRequirements.subjectRequirements
                )
                  .slice(0, maxSubjectsToShow) // Limit to max 5 subjects
                  .map(([subject, requirements]) => (
                    <Grid item xs={12} key={subject}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          p: 1.5,
                          borderRadius: "12px",
                          background: "rgba(255, 255, 255, 0.6)",
                          backdropFilter: "blur(10px)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ color: theme.palette.primary.main, flex: 1 }}
                        >
                          {subject}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ flex: 1, textAlign: "center" }}
                        >
                          Total: {requirements.total} | Required:{" "}
                          {requirements.asperpercentage} | Minimum:{" "}
                          {requirements.minimum40}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={
                            (requirements.asperpercentage /
                              requirements.total) *
                            100
                          }
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            flex: 1,
                            backgroundColor: theme.palette.grey[200],
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 3,
                              backgroundColor: theme.palette.secondary.main,
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
            </Grid>
          </Box>
        </CardContent>
      </MotionCard>
    );
  };

  const PremiumSection = () =>
    loading ? (
      <SkeletonCard height={300} />
    ) : (
      <MotionCard
        sx={{
          ...glassStyle,
          height: "75%",
          width: "17%",
          marginRight: "15px",
          marginTop: "10px",
          backgroundColor: "white",
          overflow: "visible", // Allow the image to overflow outside
          minWidth:"230px",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
<CardContent sx={{ p: 2 }}>
          <Box
            component="img"
            src={crown}
            alt="crown"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            sx={{
              maxWidth: { xs: "60%", md: "60px" },
              position: "absolute",

              marginBottom: "20px",
              top: 0,
              left: "10px",
            }}
          />
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, color: "black", mb: 1 }}
          >
            Level-Up your Managment with Premium
          </Typography>
          <Typography
            variant="p"
            gutterBottom
            sx={{
              fontWeight: 300,
              fontFamily: "sans-serif",
              color: "black",
              mb: 2,
            }}
          >
            Get access to more features and improve your management, with our
            premium subscription.
          </Typography>
          <button
            style={{
              backgroundColor: "gold",
              color: "black",
              borderRadius: "20px",
              padding: "20px",
              border: "none",
              fontWeight: "bold",
              width: "100%",
              marginTop: "30px",
              marginBottom: "-800px",

              cursor: "pointer",
            }}
          >
            Upgrade to Premium
          </button>
        </CardContent>
        </MotionCard>
    );

  const TimetableSection = () =>
    loading ? (
      <SkeletonCard height={300} />
    ) : (
      <Card
        sx={{
          ...glassStyle,
          height: "56%",
          width: "41%",
          position: "relative",
          background: "white",
          overflow: "visible", // Allow the image to overflow outside
        }}
      >
        <CardContent sx={{ p: 2 }}>
          {" "}
          {/* Matching the padding from SummarySection */}
          {/* <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}
          >
            Weekly Timetable
          </Typography> */}
          <Grid container spacing={2}>
            {" "}
            {/* Matching the grid spacing from SummarySection */}
            {analysisData?.timetableResponse?.schedule &&
              Object.entries(analysisData.timetableResponse.schedule).map(
                ([day, subjects]) => (
                  <Grid item xs={12} sm={6} md={4} key={day}>
                    <Box
                      sx={{
                        p: 1.5, // Increased padding for better spacing
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.6)",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          color: theme.palette.primary.main,
                        }}
                      >
                        {day}
                      </Typography>
                      {subjects.map((subjectObj, index) => (
                        <Chip
                          key={index}
                          label={subjectObj.subject}
                          size="small"
                          sx={{
                            m: 0.3, // Slightly increased margin for a more balanced look
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.secondary.contrastText,
                            fontWeight: 500,
                            "&:hover": {
                              backgroundColor: theme.palette.secondary.main,
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                )
              )}
          </Grid>
        </CardContent>
      </Card>
    );

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
              <SummarySection />

              <TimetableSection />
              <ResultsGraph
                analysisData={analysisData}
                loading={loading}
                theme={theme}
              />
            </Grid>

            <Grid sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <SubjectsSection />
              <Box>
                <CustomCalendar
                  selectedDate={selectedDate}
                  onDateChange={(date) => setSelectedDate(date)}
                  highlightedDates={highlightedDates}
                />
                <Aiassistance analysisData={analysisData} loading={loading} />
              </Box>
              <PremiumSection />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AttendanceDashboard;
