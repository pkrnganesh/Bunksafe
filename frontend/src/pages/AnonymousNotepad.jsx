import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
  AppBar, Toolbar, Typography, Container, Paper, TextField, Button,
  Tab, Tabs, Box, IconButton, Snackbar, 
  
  useMediaQuery, useTheme, Drawer, List, ListItem, ListItemIcon, ListItemText,
  Divider, CircularProgress
} from '@mui/material';
import { 
  Save, Download, LockOpen, Visibility, VisibilityOff, Menu as MenuIcon,
  ExitToApp
} from '@mui/icons-material';
import { Alert } from '@mui/material';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

const AnonymousNotepad = () => {
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [showPassword, setShowPassword] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const quillRef = useRef();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const savedContent = localStorage.getItem('anonymousNotepadContent');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleContentChange = (value) => {
    setContent(value);
    localStorage.setItem('anonymousNotepadContent', value);
  };

  const handleCreate = () => {
    if (password) {
      setIsLoading(true);
      setTimeout(() => {
        const newUniqueId = 'uniqueID' + Math.random().toString(36).substr(2, 9);
        setUniqueId(newUniqueId);
        setIsCreated(true);
        showAlertMessage('Document created successfully!', 'success');
        setIsLoading(false);
      }, 1500);
    } else {
      showAlertMessage('Please set a password.', 'error');
    }
  };

  const handleCheck = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (checkPassword === 'password123') {
        setIsCreated(true);
        showAlertMessage('Document accessed successfully!', 'success');
      } else {
        showAlertMessage('Incorrect password. Please try again.', 'error');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('anonymousNotepadContent', content);
      showAlertMessage('Content saved successfully!', 'success');
      setIsLoading(false);
    }, 1500);
  };

  const handleExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'anonymous_notepad_content.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showAlertMessage('Content exported successfully!', 'success');
      setIsLoading(false);
    }, 1500);
  };

  const showAlertMessage = (message, severity = 'success') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setShowAlert(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    setIsCreated(false);
    setPassword('');
    setCheckPassword('');
    setContent('');
    localStorage.removeItem('anonymousNotepadContent');
    showAlertMessage('Logged out successfully', 'info');
  };

  const drawer = (
    <div>
      <List>
        <ListItem button onClick={handleSave}>
          <ListItemIcon><Save /></ListItemIcon>
          <ListItemText primary="Save" />
        </ListItem>
        <ListItem button onClick={handleExport}>
          <ListItemIcon><Download /></ListItemIcon>
          <ListItemText primary="Export" />
        </ListItem>
        <Divider />
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div style={{ height: '300vh', backgroundColor: 'white',width:'800px',marginTop:'100PX' }}> 
      <Container  sx={{ left:0, }}>
        {!isCreated ? (
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 3 }}>
              <Tab label="Create New" />
              <Tab label="Open Existing" />
            </Tabs>
            
            {tabValue === 0 && (
              <Box>
                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  label="Set Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCreate}
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <LockOpen />}
                >
                  {isLoading ? 'Creating...' : 'Create Document'}
                </Button>
              </Box>
            )}
            {tabValue === 1 && (
              <Box>
                <TextField
                  fullWidth
                  type="password"
                  label="Enter Password"
                  variant="outlined"
                  value={checkPassword}
                  onChange={(e) => setCheckPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCheck}
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <LockOpen />}
                >
                  {isLoading ? 'Accessing...' : 'Access Document'}
                </Button>
              </Box>
            )}
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <ReactQuill
              ref={quillRef}
              value={content}
              onChange={handleContentChange}
              modules={modules}
              style={{ 
                height: 'calc(100vh - 250px)', 
                marginBottom: '50px',
                backgroundColor: '#fff',
                color: '#424242'
              }}
            />
          </Paper>
        )}
      </Container>

      <Snackbar 
        open={showAlert} 
        autoHideDuration={3000} 
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowAlert(false)} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      
    </div>
  );
};

export default AnonymousNotepad;