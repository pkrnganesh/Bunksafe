import React, { useState, useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

import {
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  IconButton,
  Tab,
  Tabs,
  SwipeableDrawer,
  useMediaQuery,
  Skeleton
} from "@mui/material";

const glassStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
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

const ClassScheduleSection = ({ analysisData, loading, theme }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [visibleRange, setVisibleRange] = useState([0, isMobile ? 4 : isTablet ? 6 : 9]);
  const [activeTab, setActiveTab] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  if (loading) return <SkeletonCard height={isMobile ? 400 : 500} />;

  // Generate dynamic colors for subjects
  const subjectColors = {};
  const subjects = Object.keys(analysisData.SubjectCountsdata);
  subjects.forEach((subject, index) => {
    const hue = (index * 137.5) % 360;  // Use golden angle approximation for color distribution
    subjectColors[subject] = `hsl(${hue}, 70%, 50%)`;
  });

  const data = Object.entries(analysisData.basicdata).map(([date, subjects]) => {
    const entry = { date };
    subjects.forEach(subject => {
      entry[subject] = 1;
    });
    return entry;
  });

  const visibleData = data.slice(visibleRange[0], visibleRange[1] + 1);

  const CustomBar = (props) => {
    const { x, y, width, height, fill } = props;
    return (
      <g>
        <defs>
          <linearGradient id={`gradientFill-${fill}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={fill} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={fill} stopOpacity={1}/>
          </linearGradient>
        </defs>
        <rect x={x} y={y} width={width} height={height} fill={`url(#gradientFill-${fill})`} rx={4} ry={4} />
        <rect x={x} y={y} width={width} height={height * 0.15} fill="rgba(255,255,255,0.3)" rx={4} ry={4} />
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card sx={{ p: 2, boxShadow: 3, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <CalendarTodayIcon sx={{ mr: 1, fontSize: 'small' }} />
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" sx={{ color: entry.fill, display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.fill, mr: 1 }} />
              {entry.name}
            </Typography>
          ))}
        </Card>
      );
    }
    return null;
  };

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
    setVisibleRange([newValue * (isMobile ? 5 : isTablet ? 7 : 10), (newValue + 1) * (isMobile ? 5 : isTablet ? 7 : 10) - 1]);
  };

  return (
    <Card sx={{ height: isMobile ? '400px' : '500px', overflow: 'hidden' }}>
      <CardContent sx={{ p: 3, height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarTodayIcon sx={{ mr: 1 }} />
            Class Schedule
          </Typography>
          <IconButton onClick={() => setInfoOpen(true)} size="small">
            <InfoIcon />
          </IconButton>
        </Box>
        <Tabs
          value={activeTab}
          onChange={handleChangeTab}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2 }}
        >
          {Array.from({ length: Math.ceil(data.length / (isMobile ? 5 : isTablet ? 7 : 10)) }, (_, i) => (
            <Tab key={i} label={`Week ${i + 1}`} />
          ))}
        </Tabs>
        <Box sx={{ height: isMobile ? '250px' : '300px' }} ref={scrollContainerRef}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={visibleData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis hide={true} />
              <Tooltip content={<CustomTooltip />} />
              {Object.keys(subjectColors).map((subject) => (
                <Bar key={subject} dataKey={subject} stackId="a" fill={subjectColors[subject]} shape={<CustomBar />}>
                  {visibleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={subjectColors[subject]} />
                  ))}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          {Object.entries(subjectColors).map(([subject, color]) => (
            <Chip
              key={subject}
              label={subject}
              size="small"
              sx={{
                backgroundColor: color,
                color: theme.palette.getContrastText(color),
              }}
            />
          ))}
        </Box>
      </CardContent>
      <InfoDrawer infoOpen={infoOpen} setInfoOpen={setInfoOpen} />
    </Card>
  );
};

const InfoDrawer = ({ infoOpen, setInfoOpen }) => (
  <SwipeableDrawer
    anchor="right"
    open={infoOpen}
    onClose={() => setInfoOpen(false)}
    onOpen={() => setInfoOpen(true)}
  >
    <Box sx={{ width: 250, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Info</Typography>
        <IconButton onClick={() => setInfoOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="body2">
        This chart shows your class schedule over time. Each color represents a different subject.
        Use the tabs to navigate between weeks or swipe on mobile devices.
      </Typography>
    </Box>
  </SwipeableDrawer>
);

export default ClassScheduleSection;