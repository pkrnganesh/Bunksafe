 import React, { useState, Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AnimatePresence, motion } from 'framer-motion';

import { lightTheme, darkTheme } from '../components/Landing/theme';
import Header from '../components/Landing/Header';
import Hero from '../components/Landing/Hero';
import Herosection from './LandingPage.jsx';
import JoinTeamUI from '../components/Landing/JoinTeamUI';
import MeetingsActionComponent from '../components/Landing/MeetingsActionComponent';
import ReviewCarousel from '../components/Landing/ReviewCarousel';
import MerlinHero from '../components/Landing/MerlinHero';
import SecondFeature from '../components/Landing/SecondFeature';
import Features from '../components/Landing/Features';
import Pricing from '../components/Landing/Pricing';
import FAQ from '../components/Landing/FAQ';
import Team from '../components/Landing/Team';
import Footer from '../components/Landing/Footer';
import UsedBy from '../components/Landing/UsedBy.jsx';
import OpenSourceSection from '../components/Landing/OpenSourceSection.jsx';
import FeaturesGrid from '../components/Landing/FeaturesGrid.jsx';

 
function Landing() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ParallaxProvider>
        <AnimatePresence>
          <motion.div key="landing-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Container maxWidth="xl">
              <Suspense fallback={<div>Loading...</div>}>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <Hero />
                <FeaturesGrid />
                 <UsedBy />
                <MerlinHero />
                <SecondFeature />
                <MeetingsActionComponent />
                 <Features />
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