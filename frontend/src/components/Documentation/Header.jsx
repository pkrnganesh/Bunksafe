import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Tooltip, Switch, useMediaQuery } from '@mui/material';
import { Menu, GitHub, Brightness7, Brightness4 } from '@mui/icons-material';

const Header = ({ isDarkMode, toggleTheme, handleDrawerToggle, scrolled }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <AppBar 
      position="fixed" 
      elevation={scrolled ? 4 : 0} 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: scrolled ? (isDarkMode ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)') : 'transparent',
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Project Docs
        </Typography>
        {!isSmallScreen && (
          <>
            <Button color="inherit" href="#">Docs</Button>
            <Tooltip title="GitHub Repository">
              <IconButton color="inherit" href="#" aria-label="github repository">
                <GitHub />
              </IconButton>
            </Tooltip>
          </>
        )}
        <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            color="default"
            icon={<Brightness7 />}
            checkedIcon={<Brightness4 />}
          />
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;