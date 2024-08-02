import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Paper,
  Box,
  IconButton,
  Tooltip,
  Slide,
  useMediaQuery,
  Fab,
  Zoom,
  Switch,
  Skeleton,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Brightness4,
  Brightness7,
  Menu,
  Info,
  Code,
  BugReport,
  Help,
  GitHub,
  AssignmentTurnedIn,
  Gavel,
  CopyAll,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const sections = [
  {
    title: 'Introduction',
    content: `Welcome to our cutting-edge project documentation! This comprehensive guide will walk you through 
    the ins and outs of our revolutionary software. Whether you're a seasoned developer or just starting out, 
    we've got you covered with detailed explanations, code snippets, and best practices.`,
    icon: <Info />,
  },
  {
    title: 'Getting Started',
    content: `Let's dive right in! To get started with our project, you'll need to set up your development 
    environment. Here's a quick example of how to install and initialize our package:`,
    icon: <AssignmentTurnedIn />,
    codeSnippet: `
npm install awesome-project
const awesomeProject = require('awesome-project');

awesomeProject.init({
  apiKey: 'your-api-key',
  environment: 'production'
});
    `,
  },
  {
    title: 'Core Concepts',
    content: `Our project is built on several key concepts that are crucial to understand. Let's explore 
    the main components and how they interact:`,
    icon: <Code />,
    codeSnippet: `
class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { awesomeness: 100 };
  }

  render() {
    return (
      <div>
        <h1>Awesomeness level: {this.state.awesomeness}</h1>
        <button onClick={() => this.setState({ awesomeness: this.state.awesomeness + 1 })}>
          Increase Awesomeness
        </button>
      </div>
    );
  }
}
    `,
  },
  {
    title: 'Advanced Features',
    content: `Once you've mastered the basics, it's time to explore our advanced features. These powerful 
    tools will take your development to the next level:`,
    icon: <BugReport />,
    codeSnippet: `
const advancedFeature = async (data) => {
  try {
    const result = await API.processData(data);
    return result.optimize().enhance();
  } catch (error) {
    console.error('Advanced feature failed:', error);
    throw new Error('Could not process data');
  }
};
    `,
  },
  {
    title: 'Best Practices',
    content: `To ensure you're getting the most out of our project, we've compiled a list of best practices. 
    Following these guidelines will help you write cleaner, more efficient code:`,
    icon: <Help />,
  },
  {
    title: 'Troubleshooting',
    content: `Encountering issues? Don't worry, we've got you covered. Here are some common problems and their solutions:`,
    icon: <BugReport />,
  },
  {
    title: 'Contributing',
    content: `We love contributions from our community! If you'd like to contribute to the project, please follow these steps:`,
    icon: <GitHub />,
  },
  {
    title: 'License',
    content: `This project is licensed under the MIT License. See the LICENSE file for details.`,
    icon: <Gavel />,
  },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 15px 20px rgba(0,0,0,0.05)',
  },
  backdropFilter: 'blur(10px)',
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
}));

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

const GlassMorphicBox = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(10px)',
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
}));

const CustomScrollbarBox = styled(Box)(({ theme }) => ({
  '&::-webkit-scrollbar': {
    width: '10px',
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

const CodeSnippet = ({ code, isDarkMode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ position: 'relative', mb: 2 }}>
      <SyntaxHighlighter 
        language="javascript" 
        style={isDarkMode ? atomDark : oneLight} 
        showLineNumbers
        customStyle={{
          borderRadius: '8px',
          fontSize: '0.9rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
      <IconButton
        onClick={handleCopy}
        sx={{ 
          position: 'absolute', 
          top: 8, 
          right: 8, 
          color: isDarkMode ? 'white' : 'black',
          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
          }
        }}
      >
        <CopyAll />
      </IconButton>
      {copied && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: 8,
            right: 48,
            color: isDarkMode ? 'white' : 'black',
            backgroundColor: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
            padding: '2px 8px',
            borderRadius: 4,
          }}
        >
          Copied!
        </Typography>
      )}
    </Box>
  );
};

const ScrollTop = ({ children }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={true}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
};

const Documentation = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  const createThemeCallback = (mode) => createTheme({
    palette: {
      mode,
      primary: {
        main: '#00d8ff',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#f5f5f5',
        paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '3rem',
        fontWeight: 700,
        marginBottom: '1.5rem',
        fontFamily: '"Poppins", sans-serif',
      },
      h2: {
        fontSize: '2.5rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: mode === 'dark' ? '#00d8ff' : '#0097b2',
        fontFamily: '"Poppins", sans-serif',
      },
      body1: {
        fontSize: '1.1rem',
        lineHeight: 1.7,
      },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: 260,
            backdropFilter: 'blur(10px)',
            backgroundColor: mode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            padding: '16px',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            backgroundColor: mode === 'dark' ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 10px 20px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            },
          },
        },
      },
    },
  });

  const theme = createThemeCallback(isDarkMode ? 'dark' : 'light');
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate content loading
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
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
              height: { xs: '100%', sm: 'calc(100% - 64px)' },
            },
          }}
        >
          <Toolbar />
          <CustomScrollbarBox sx={{ overflow: 'auto' }}>
            <List>
              {sections.map((section, index) => (
                <StyledListItem
                  button
                  key={index}
                  component="a"
                  href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => isSmallScreen && handleDrawerToggle()}
                >
                  <StyledListItemIcon>{section.icon}</StyledListItemIcon>
                  <StyledListItemText primary={section.title} />
                </StyledListItem>
              ))}
            </List>
          </CustomScrollbarBox>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, width: { sm: `calc(100% - 260px)` } }}>
          <Toolbar />
          <Container maxWidth="lg">
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
              <StyledPaper elevation={3}>
                {loading ? (
                  <>
                    <Skeleton variant="text" width="60%" height={60} />
                    {[...Array(5)].map((_, index) => (
                      <Box key={index} sx={{ mb: 6 }}>
                        <Skeleton variant="text" width="40%" height={40} />
                        <Skeleton variant="rectangular" height={100} sx={{ mt: 2 }} />
                      </Box>
                    ))}
                  </>
                ) : (
                  <>
                    <Typography variant="h1" component="h1" gutterBottom>
                      Project Documentation
                    </Typography>
                    {sections.map((section, index) => (
                      <Box
                        key={index}
                        id={section.title.toLowerCase().replace(/\s+/g, '-')}
                        sx={{ mb: 6 }}
                      >
                        <Typography variant="h2" component="h2" gutterBottom>
                          {section.title}
                        </Typography>
                        <Typography variant="body1" paragraph>
                          {section.content}
                        </Typography>
                        {section.codeSnippet && <CodeSnippet code={section.codeSnippet} isDarkMode={isDarkMode} />}
                      </Box>
                    ))}
                  </>
                )}
              </StyledPaper>
            </Slide>
          </Container>
        </Box>
      </Box>
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </ThemeProvider>
  );
};

export default Documentation;