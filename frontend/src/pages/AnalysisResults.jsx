import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Grid, Typography, Chip, LinearProgress, useMediaQuery, Button, Card, CardContent, Fab, Container, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import { GetApp } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: { main: "#42daf5" },
    secondary: { main: "#FFD700" },
    background: { default: "#F5F7FF" },
    text: { primary: "#37474F", secondary: "#78909C" },
  },
  typography: { 
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 900, fontSize: '4rem', color: "#FFFFFF" },
    h2: { fontWeight: 700, fontSize: '2.5rem', color: "#37474F" },
    h3: { fontWeight: 600, fontSize: '2rem', color: "#37474F" },
    h4: { fontWeight: 600, fontSize: '1.75rem', color: "#37474F" },
    h5: { fontWeight: 600, fontSize: '1.5rem', color: "#37474F" },
    h6: { fontWeight: 600, fontSize: '1.25rem', color: "#37474F" },
    body1: { fontSize: '1.1rem', color: "#37474F" },
    body2: { fontSize: '0.975rem', color: "#78909C" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

const MotionCard = motion(Card);

const glassStyle = {
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  padding: '24px',
};

// const CustomCalendar = ({ selectedDate, onDateChange, highlightedDates }) => {
//   const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

//   const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
//   const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

//   const monthNames = ["January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const previousMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
//   };

//   const nextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
//   };

//   const isHighlighted = (date) => {
//     return highlightedDates.some(d => d.date === date);
//   };

//   const getHighlightColor = (date) => {
//     const highlighted = highlightedDates.find(d => d.date === date);
//     return highlighted ? (highlighted.value > 0 ? theme.palette.secondary.main : theme.palette.error.main) : 'transparent';
//   };

//   return (
//     <Box>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>{`${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}</Typography>
//         <Box>
//           <Button onClick={previousMonth} sx={{ minWidth: 'auto', p: 1 }}><ArrowBackIosNewIcon /></Button>
//           <Button onClick={nextMonth} sx={{ minWidth: 'auto', p: 1 }}><ArrowForwardIosIcon /></Button>
//         </Box>
//       </Box>
//       <Grid container columns={7} sx={{ textAlign: 'center' }}>
//         {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
//           <Grid item xs={1} key={day}>
//             <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>{day}</Typography>
//           </Grid>
//         ))}
//         {Array.from({ length: firstDayOfMonth }).map((_, index) => (
//           <Grid item xs={1} key={`empty-${index}`} />
//         ))}
//         {Array.from({ length: daysInMonth }).map((_, index) => {
//           const date = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(index + 1).padStart(2, '0')}`;
//           return (
//             <Grid item xs={1} key={date} sx={{ p: 1 }}>
//               <Button
//                 onClick={() => onDateChange(date)}
//                 sx={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: '50%',
//                   backgroundColor: date === selectedDate ? theme.palette.primary.main : 'transparent',
//                   color: date === selectedDate ? 'white' : theme.palette.text.primary,
//                   '&:hover': {
//                     backgroundColor: date === selectedDate ? theme.palette.primary.dark : theme.palette.action.hover,
//                   },
//                   position: 'relative',
//                 }}
//               >
//                 {index + 1}
//                 {isHighlighted(date) && (
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       bottom: 2,
//                       left: '50%',
//                       transform: 'translateX(-50%)',
//                       width: 6,
//                       height: 6,
//                       borderRadius: '50%',
//                       backgroundColor: getHighlightColor(date),
//                     }}
//                   />
//                 )}
//               </Button>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// };

const SkeletonCard = ({ height }) => (
  <Card sx={{ ...glassStyle, height }}>
    <CardContent>
      <Skeleton variant="text" width="60%" height={32} />
      <Skeleton variant="rectangular" width="100%" height={height - 80} sx={{ mt: 2 }} />
    </CardContent>
  </Card>
);

const AttendanceDashboard = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem('analysisResponse');
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

  const SummarySection = () => (
    loading ? (
      <SkeletonCard height={200} />
    ) : (
      <Card sx={{ ...glassStyle, height: '100%' }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}>Attendance Summary</Typography>
          <Grid container spacing={2}>
            {analysisData && (
              <>
                <Grid item xs={4}>
                  <Box sx={{
                    textAlign: 'center',
                    p: 1.5,
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    },
                  }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>{analysisData.Totaldays}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>Total Days</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{
                    textAlign: 'center',
                    p: 1.5,
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    },
                  }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>{analysisData.daysNeededToAttend}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>Days to Attend</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{
                    textAlign: 'center',
                    p: 1.5,
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    },
                  }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>{analysisData.daysCanSkip}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>Days Can Skip</Typography>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
    )
  );

  const SubjectsSection = () => (
    loading ? (
      <SkeletonCard height={300} />
    ) : (
      <MotionCard sx={{ ...glassStyle, height: '100%' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}>Subject-wise Attendance</Typography>
          <Grid container spacing={2}>
            {analysisData && Object.entries(analysisData.AttendanceRequirements.subjectRequirements).map(([subject, requirements]) => (
              <Grid item xs={12} sm={6} md={4} key={subject}>
                <Box sx={{
                  p: 1.5,
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ color: theme.palette.primary.main }}>{subject}</Typography>
                  <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>
                    Total: {requirements.total} | Required: {requirements.asperpercentage} | Minimum: {requirements.minimum40}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(requirements.asperpercentage / requirements.total) * 100} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      backgroundColor: theme.palette.grey[200],
                      '& .MuiLinearProgress-bar': {
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
    )
  );

  const TimetableSection = () => (
    loading ? (
      <SkeletonCard height={300} />
    ) : (
      <MotionCard sx={{ ...glassStyle, height: '100%' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}>Weekly Timetable</Typography>
          <Grid container spacing={2}>
            {analysisData && analysisData.timetableResponse && Object.entries(analysisData.timetableResponse.schedule).map(([day, subjects]) => (
              <Grid item xs={12} sm={6} md={4} key={day}>
                <Box sx={{
                  p: 1.5,
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 1 }}>{day}</Typography>
                  {subjects.map((subjectObj, index) => (
                    <Chip
                      key={index}
                      label={subjectObj.subject}
                      size="small"
                      sx={{
                        m: 0.3,
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.secondary.contrastText,
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.main,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </MotionCard>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #F5F7FF 0%, #C3CEFE 100%)",
        overflowX: 'hidden',
      }}>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={isMobile ? 2 : 3}>
            <Grid item xs={12} md={6} lg={4} sx={{marginBottom:'40px'}}>
              <SummarySection />
            </Grid>
            <Grid item xs={12} md={6} sx={{marginBottom:'40px'}}>
              <SubjectsSection />
            </Grid>
            <Grid item xs={12} sx={{marginBottom:'40px'}}>
              <TimetableSection />
            </Grid>
          </Grid>
        </Container>
        
        <Fab 
          color="primary" 
          aria-label="download" 
          sx={{ 
            position: 'fixed', 
            bottom: 16, 
            right: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onClick={handleDownload}
        >
          <GetApp />
          {!isMobile && (
            <Typography variant="caption" sx={{ fontWeight: 600 }}> </Typography>
          )}
        </Fab>
      </Box>
    </ThemeProvider>
  );
};

export default AttendanceDashboard;
