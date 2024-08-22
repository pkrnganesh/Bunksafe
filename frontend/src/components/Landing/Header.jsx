// components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Switch, Tooltip, useMediaQuery } from '@mui/material';
import { School, GitHub, AttachMoney, Brightness7, Brightness4 } from '@mui/icons-material';
import { styled } from '@mui/system';

const Header = ({ darkMode, toggleDarkMode }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // Custom styles
  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    color: darkMode ? '#FFFFFF' : '#000000',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  }));

  const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    color: darkMode ? '#E0E0E0' : '#333333',
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: darkMode ? 'rgba(51, 51, 51, 0.5)' : 'rgba(240, 240, 240, 0.5)',
    },
  }));

  return (
    <StyledAppBar position="fixed" elevation={0}>
      <Toolbar>
        <School sx={{ mr: 2, verticalAlign: 'middle', color: darkMode ? '#FFCA28' : '#3F51B5' }} />
        <StyledTypography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Attendance Management System
        </StyledTypography>
        {!isMobile && (
          <>
            <StyledButton color="inherit">Docs</StyledButton>
            <StyledButton color="inherit" startIcon={<GitHub />}>Git</StyledButton>
          </>
        )}
        <Tooltip title="Toggle Dark Mode">
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            icon={<Brightness7 />}
            checkedIcon={<Brightness4 />}
            sx={{ ml: 1 }}
          />
        </Tooltip>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
