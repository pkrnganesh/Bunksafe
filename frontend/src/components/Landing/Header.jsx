import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useScrollTrigger,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const AnimatedContainer = styled(Container)(({ theme, compressed }) => ({
  maxWidth: compressed ? '85%' : '100%',
  width: compressed ? '76%' : '100%',
  transition: 'all 0.3s ease-in-out',
  margin: '0 auto',
  background: 'white',
  borderRadius: compressed ? '16px' : '0',
  boxShadow: compressed 
    ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
    : 'none',
}));

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  paddingTop: '1rem',
});

const LogoBox = styled(Box)({
  width: '40px',
  height: '40px',
  backgroundColor: '#000',
  borderRadius: '8px',
  marginRight: '8px',
});

const NavButton = styled(Button)(({ theme }) => ({
  color: '#555',
  textTransform: 'none',
  padding: '6px 12px',
  fontSize: '0.95rem',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#000',
  },
}));

const Header = () => {
  const [compressed, setCompressed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  });

  useEffect(() => {
    setCompressed(trigger);
  }, [trigger]);

  const navItems = ['Features', 'Pricing', 'Blog', 'Changelog', 'Careers', 'Demo'];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ my: 2 }}>
        <LogoBox />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Log in" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            sx={{ 
              textAlign: 'center',
              bgcolor: 'black',
              color: 'white',
              m: 2,
              borderRadius: 1,
              '&:hover': {
                bgcolor: '#333',
              }
            }}
          >
            <ListItemText primary="Sign up" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <StyledAppBar position="fixed">
      <AnimatedContainer compressed={compressed ? 1 : 0}>
        <Toolbar 
          disableGutters 
          sx={{ 
            padding: '0.75rem 1.5rem',
            minHeight: compressed ? '60px' : '70px',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <LogoBox />
          
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ml: 'auto' }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  '& .MuiDrawer-paper': { 
                    boxSizing: 'border-box', 
                    width: 240,
                  },
                }}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                mx: 'auto',
                marginLeft: '4rem'
              }}>
                {navItems.map((item) => (
                  <NavButton key={item}>
                    {item}
                  </NavButton>
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
                <NavButton>Log in</NavButton>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    textTransform: 'none',
                    borderRadius: '8px',
                    padding: '6px 16px',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  Sign up
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AnimatedContainer>
    </StyledAppBar>
  );
};

export default Header;  