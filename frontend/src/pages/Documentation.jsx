import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container,Toolbar } from '@mui/material';
import Header from '../components/Documentation/Header';
import Sidebar from '../components/Documentation/Sidebar';
import Content from '../components/Documentation/Content';
import ScrollTop from '../components/Documentation/ScrollTop';
import { sections, createThemeCallback } from '../utils/utils';
const Docs = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  const theme = createThemeCallback(isDarkMode ? 'dark' : 'light');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' ,mt: 3, mb: 3 }}>
        <Header 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
          handleDrawerToggle={handleDrawerToggle}
          scrolled={scrolled}
        />
        <Sidebar 
          open={open} 
          handleDrawerToggle={handleDrawerToggle}
          sections={sections}
          sx={{ mt: 389 }}
        />
        <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - 260px)` } }}>
          <Toolbar /> 
          <Container maxWidth="lg" > 
            <Content loading={loading} sections={sections} isDarkMode={isDarkMode} />
          </Container>
        </Box>
      </Box>
      <ScrollTop />
    </ThemeProvider>
  );
};

export default Docs;