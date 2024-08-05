// App.js
import React, { useState, Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AnimatePresence, motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';

import { lightTheme, darkTheme } from '../components/Landing/theme';
import Header from '../components/Landing/Header';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import Pricing from '../components/Landing/Pricing';
import FAQ from '../components/Landing/FAQ';
import Team from '../components/Landing/Team';
import Footer from '../components/Landing/Footer';
import Background3D from '../components/Landing/Background3D';

function Landing() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ParallaxProvider>
        <AnimatePresence>
          <Canvas style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
            <Background3D />
          </Canvas>
          <Container maxWidth="xl">
            <Suspense fallback={<div>Loading...</div>}>
              <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <Hero />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Features />
                <Pricing />
                <FAQ />
                <Team />
              </motion.div>
              <Footer />
            </Suspense>
          </Container>
        </AnimatePresence>
      </ParallaxProvider>
    </ThemeProvider>
  );
}

export default Landing;