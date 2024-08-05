import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, useMediaQuery, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    transform: 'translateX(5px)',
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '40px',
  color: theme.palette.primary.main,
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontSize: '0.95rem',
    fontWeight: 500,
  },
}));

const CustomScrollbarBox = styled(Box)(({ theme }) => ({
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-track': {
    background: alpha(theme.palette.background.paper, 0.1),
  },
  '&::-webkit-scrollbar-thumb': {
    background: alpha(theme.palette.primary.main, 0.5),
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: alpha(theme.palette.primary.main, 0.7),
  },
}));

const Sidebar = ({ open, handleDrawerToggle, sections }) => {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  
    const handleScrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -90;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
      if (isSmallScreen) {
        handleDrawerToggle();
      }
    };
  
    return (
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={isSmallScreen ? open : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: 260,
          flexShrink: 0,
          '& .MuiDrawer-paper': { 
            width: 260, 
            boxSizing: 'border-box',
            top: { xs: 0, sm: 64 },
            marginTop: { xs: 0, sm: 3 },
            marginBottom: { xs: 0, sm: 3 },
            height: { xs: '100%', sm: 'calc(100% - 114px)' },
          },
        }}
      >
        <CustomScrollbarBox sx={{ overflow: 'auto' }}>
          <List>
            {sections.map((section, index) => (
              <StyledListItem
                button
                key={index}
                onClick={() => handleScrollToSection(section.title.toLowerCase().replace(/\s+/g, '-'))}
              >
                <StyledListItemIcon>{section.icon}</StyledListItemIcon>
                <StyledListItemText primary={section.title} />
              </StyledListItem>
            ))}
          </List>
        </CustomScrollbarBox>
      </Drawer>
    );
  };
  
  export default Sidebar;