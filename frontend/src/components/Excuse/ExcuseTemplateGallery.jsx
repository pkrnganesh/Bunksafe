import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, Typography, Card, CardContent, Grid, IconButton,
  List, ListItem, ListItemIcon, ListItemText, Divider,
  Badge, Paper, Chip, Button, useTheme, useMediaQuery, Drawer,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Star, History, Business, School, Home, 
  Groups, FlightTakeoff, Add, AutoAwesome,
  MenuBook, CardGiftcard, Menu as MenuIcon
} from '@mui/icons-material';

const CategoryListItem = styled(motion(ListItem))(({ theme, selected }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.3s',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    transform: 'translateX(5px)',
  },
  ...(selected && {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
  }),
}));

const TemplateCard = styled(motion(Card))(({ theme }) => ({
  cursor: 'pointer',
  height: '100%',
  borderRadius: '20px',
  transition: 'all 0.3s ease-in-out',
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 12px 20px -10px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

const PreviewBox = styled(Box)(({ theme }) => ({
  height: 120,
  backgroundColor: alpha(theme.palette.background.default, 0.6),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  overflow: 'hidden',
  position: 'relative',
}));

const categories = [
  { id: 'work', icon: <Business />, label: 'Professional', count: 145 },
  { id: 'academic', icon: <School />, label: 'Academic', count: 16 },
  { id: 'personal', icon: <Home />, label: 'Personal', count: 24 },
  { id: 'social', icon: <Groups />, label: 'Social Events', count: 29 },
  { id: 'travel', icon: <FlightTakeoff />, label: 'Travel Related', count: 48 }
];

const templateTypes = [
  { id: 1, title: 'Late to Work Pro', subtitle: 'Perfect for those unexpected delays', usage: '2.3k' },
  { id: 2, title: 'Deadline Extension+', subtitle: 'Academic emergency situations', usage: '1.8k' },
  { id: 3, title: 'Event Skip Master', subtitle: 'Gracefully decline social gatherings', usage: '985' },
  { id: 4, title: 'Meeting Reschedule', subtitle: 'Professional schedule conflicts', usage: '1.5k' },
  { id: 5, title: 'Project Delay Pro', subtitle: 'Handle timeline adjustments', usage: '756' },
  { id: 6, title: 'Family Emergency', subtitle: 'Sensitive situation handler', usage: '2.1k' },
];

const ExcuseTemplateGallery = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('work');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const CategoryList = () => (
    <Box sx={{ width: isMobile ? 250 : '90%', p: 2,border:'ActiveBorder' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
        Select Category
      </Typography>
      <List>
        <AnimatePresence>
          {categories.map((category) => (
            <CategoryListItem
              key={category.id}
              selected={selectedCategory === category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                if (isMobile) setDrawerOpen(false);
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ListItemIcon>
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.3 }}>
                  {category.icon}
                </motion.div>
              </ListItemIcon>
              <ListItemText primary={category.label} />
              <Chip 
                size="small"
                label={category.count}
                sx={{ 
                  backgroundColor: selectedCategory === category.id 
                    ? theme.palette.primary.main 
                    : theme.palette.grey[300],
                  color: selectedCategory === category.id 
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                }}
              />
            </CategoryListItem>
          ))}
        </AnimatePresence>
      </List>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`,
    }}>
      {isMobile && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      )}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {!isMobile && (
          <Paper 
            elevation={0} 
            sx={{ 
              width: 280, 
              borderRight: 1, 
              borderColor: 'divider',
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
              backdropFilter: 'blur(10px)',
              overflow: 'auto'
            }}
          >
            <CategoryList />
          </Paper>
        )}
        <Drawer
          anchor="left"
          open={isMobile && drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <CategoryList />
        </Drawer>
        <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ 
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            }}>
              {categories.find(c => c.id === selectedCategory)?.label} Templates
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              size={isMobile ? "small" : "medium"}
              sx={{ 
                borderRadius: '20px',
                boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.39)}`,
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.39)}`,
                }
              }}
            >
              {isMobile ? "New" : "Create Custom"}
            </Button>
          </Box>
          <Grid container spacing={3}>
            {templateTypes.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <TemplateCard 
                  onClick={() => onSelectTemplate(template.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AutoAwesome sx={{ color: theme.palette.primary.main, mr: 1, fontSize: '1.2rem' }} />
                      </motion.div>
                      <Typography variant="subtitle1" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        {template.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.875rem' }}>
                      {template.subtitle}
                    </Typography>
                    <PreviewBox>
                      <Typography color="text.disabled" sx={{ fontSize: '0.875rem' }}>
                        Template Preview
                      </Typography>
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(45deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
                        }}
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                      />
                    </PreviewBox>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Used {template.usage} times
                      </Typography>
                      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                        <IconButton size="small" color="primary">
                          <Star fontSize="small" />
                        </IconButton>
                      </motion.div>
                    </Box>
                  </CardContent>
                </TemplateCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ExcuseTemplateGallery;