// components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Switch, Tooltip, useMediaQuery } from '@mui/material';
import { School, GitHub, AttachMoney, Brightness7, Brightness4 } from '@mui/icons-material';

const Header = ({ darkMode, toggleDarkMode }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <AppBar position="fixed" color="transparent" elevation={0}>
      <Toolbar>
        <School sx={{ mr: 1, verticalAlign: 'middle' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Attendance Management System
        </Typography>
        {!isMobile && (
          <>
            <Button color="inherit">Docs</Button>
            <Button color="inherit" startIcon={<GitHub />}>Git</Button>
            <Button color="inherit" startIcon={<AttachMoney />}>Pricing</Button>
          </>
        )}
        <Tooltip title="Toggle Dark Mode">
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            icon={<Brightness7 />}
            checkedIcon={<Brightness4 />}
          />
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;