import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ClassScheduleSection from "../components/generation/ClassScheduleSection";
import ResultsGraph from '../components/generation/ResultsGraph'
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
} from "@mui/material";
import { motion } from "framer-motion";
import thinking from "../images/thinking.svg";
import crown from "../images/crown.svg";

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
  const [infoOpen, setInfoOpen] = useState(false);
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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

  

  const SummarySection = () =>
    loading ? (
      <SkeletonCard height={200} />
    ) : (
      <Card
        sx={{
          ...glassStyle,
          height: "32%",
          position: "relative",
          background: "linear-gradient(to right, gold, white)",
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
              bottom: 90,
              right: "10px", // You can adjust the positioning as needed
            }}
          />

          <Grid container spacing={2}>
            {analysisData && (
              <>
                {/* Other content of the summary section */}
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
              <Typography variant="body2" sx={{ fontWeight: 600, color: "green" }}>
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
              <Typography variant="body2" sx={{ fontWeight: 600, color: "green" }}>
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
              <Typography variant="body2" sx={{ fontWeight: 600, color: "green" }}>
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
  
    const SubjectsSection = () =>
      loading ? (
        <SkeletonCard height={300} />
      ) : (
        <MotionCard
          sx={{ ...glassStyle, height: "57%", width: "100%" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}
            >
              Subject-wise Attendance
            </Typography>
            <Grid container spacing={2}>
              {analysisData &&
                Object.entries(
                  analysisData.AttendanceRequirements.subjectRequirements
                ).map(([subject, requirements]) => (
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
                          (requirements.asperpercentage / requirements.total) * 100
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
          </CardContent>
        </MotionCard>
      );
    
    

  const PremiumSection = () =>
    loading ? (
      <SkeletonCard height={300} />
    ) : (
      <MotionCard
        sx={{
          ...glassStyle,
          height: "100%",
          width: "20%",
          backgroundColor: "#95CC81",
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
              backgroundColor: "white",
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
          <MotionCard
      sx={{ ...glassStyle, height: "80%", overflow: 'auto' }} // Add overflow
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
            <CardContent sx={{ p: 2 }}> {/* Matching the padding from SummarySection */}
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}
              >
                Weekly Timetable
              </Typography>
              <Grid container spacing={2}> {/* Matching the grid spacing from SummarySection */}
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
                            sx={{ fontWeight: 600, mb: 1, color: theme.palette.primary.main }}
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
                                "&:hover": { backgroundColor: theme.palette.secondary.main },
                              }}
                            />
                          ))}
                        </Box>
                      </Grid>
                    )
                  )}
              </Grid>
            </CardContent>
          </MotionCard>
        );
      
      

  
  
  // return (
  //   <ThemeProvider theme={theme}>
  //     <Box
  //       sx={{
  //         minHeight: "100vh",
  //         background: "linear-gradient(135deg, #F5F7FF 0%, #C3CEFE 100%)",
  //         overflowX: "hidden",
  //       }}
  //     >
  //       <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
  //         <Grid container spacing={isMobile ? 2 : 3}>
  //           {/* SummarySection and SubjectsSection in the same column */}
  //           <Grid item xs={12} md={6} lg={4} sx={{ marginBottom: "40px" }}>
  //             <SummarySection />
  //             <SubjectsSection />
  //             <ResultsGraph analysisData={analysisData} loading={loading} theme={theme}  />

  //           </Grid>

  
  //           <Grid item xs={12} md={6} sx={{ marginBottom: "40px" }}>
  //             <TimetableSection />
  //             <ClassScheduleSection analysisData={analysisData} loading={loading} theme={theme} />

  //           </Grid>
  
  //           <Grid item xs={12} sx={{ marginBottom: "40px" }}>
  //             {/* <ClassScheduleSection analysisData={analysisData} loading={loading} theme={theme} /> */}
  //           </Grid>
  //         </Grid>
  //       </Container>
  //     </Box>
  //   </ThemeProvider>
  // );
  

  return (
  <ThemeProvider theme={theme}>
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F5F7FF 0%, #C3CEFE 100%)",
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={isMobile ? 2 : 3}>
          {/* SummarySection and SubjectsSection in the same column */}
          <Grid item xs={12} md={6} lg={4} sx={{ marginBottom: "40px" }}>
            <SummarySection />
            <SubjectsSection />
          </Grid>
          <Grid item xs={12} md={6} sx={{ marginBottom: "40px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}> {/* Adjust width as needed */}
                <TimetableSection />
              </Grid>
              <Grid item xs={12} md={4}> {/* Adjust width as needed */}
                <ResultsGraph analysisData={analysisData} loading={loading} theme={theme} />
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: "40px" }}>
              <ClassScheduleSection
                analysisData={analysisData}
                loading={loading}
                theme={theme}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: "40px" }}>
              <PremiumSection />
            </Grid>
          </Grid>
        </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};


export default AttendanceDashboard;
