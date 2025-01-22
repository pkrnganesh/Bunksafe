import React, { useState, Suspense } from 'react';
import { ThemeProvider, useTheme, CssBaseline, Container, GlobalStyles, useMediaQuery } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AnimatePresence, motion } from 'framer-motion';

import { lightTheme, darkTheme } from '../components/Landing/theme';
import Header from '../components/Landing/Header';
import Hero from '../components/Landing/Hero';
import FeaturesGrid from '../components/Landing/FeaturesGrid.jsx';
import UsedBy from '../components/Landing/UsedBy.jsx';
import MerlinHero from '../components/Landing/MerlinHero';
import SecondFeature from '../components/Landing/SecondFeature';
import Features from '../components/Landing/Features';
import MeetingsActionComponent from '../components/Landing/MeetingsActionComponent';
import JoinTeamUI from '../components/Landing/JoinTeamUI';
import Pricing from '../components/Landing/Pricing';
import FAQ from '../components/Landing/FAQ';
import Team from '../components/Landing/Team';
import ReviewCarousel from '../components/Landing/ReviewCarousel';
import OpenSourceSection from '../components/Landing/OpenSourceSection.jsx';
import Footer from '../components/Landing/Footer';

function Landing() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const currentTheme = useTheme();

  // Media Queries
  const isMobile = useMediaQuery(currentTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(currentTheme.breakpoints.between('sm', 'md'));

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            overflowX: 'hidden',
          },
          html: {
            overflowX: 'hidden',
          },
        }}
      />
      <ParallaxProvider>
        <AnimatePresence>
          <motion.div
            key="landing-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Container
              maxWidth="xl"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: isMobile ? '8px' : isTablet ? '12px' : '16px',
                width: '100%',
                maxWidth: '100vw', // Ensure no overflow
                overflowX: 'hidden',
              }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <Hero />
                <FeaturesGrid />
                <UsedBy />
                <MerlinHero />
                <SecondFeature />
                <Features />
                <MeetingsActionComponent />
                <JoinTeamUI />
                <Pricing />
                <FAQ />
                <Team />
                <ReviewCarousel />
                <OpenSourceSection />
                <Footer />
              </Suspense>
            </Container>
          </motion.div>
        </AnimatePresence>
      </ParallaxProvider>
    </ThemeProvider>
  );
}

export default Landing;
