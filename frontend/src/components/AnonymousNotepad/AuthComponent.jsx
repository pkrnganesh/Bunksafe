import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
  IconButton,
  Typography,
  Container,
  Paper,
  Grid,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LockOpen, Visibility, VisibilityOff, Security } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

const AuthComponent = ({ setIsCreated, showAlertMessage, isLoading, setIsLoading }) => {
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCreate = () => {
    if (password) {
      setIsLoading(true);
      setTimeout(() => {
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

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh',display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="xl" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Secure Your Documents
            </Typography>
            <Typography variant="h5" paragraph sx={{ color: 'text.secondary', mb: 4 }}>
              Protect your files with powerful encryption. Set a password to create new documents or access existing ones.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" color="primary" startIcon={<Security />}>
                Learn More
              </Button>
              <Button variant="outlined" color="primary">
                How It Works
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 2, borderColor: 'primary', border: '1px solid' }}>
              <Tabs
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
                variant="fullWidth"
                sx={{ mb: 3 }}
              >
                <Tab label="Create New" />
                <Tab label="Open Existing" />
              </Tabs>
              
              {tabValue === 0 && (
                <Box component="form" noValidate>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Set Password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleCreate}
                    disabled={isLoading}
                    sx={{ py: 1.5 }}
                    startIcon={isLoading ? <CircularProgress size={20} /> : <LockOpen />}
                  >
                    {isLoading ? 'Creating...' : 'Create Document'}
                  </Button>
                </Box>
              )}
              
              {tabValue === 1 && (
                <Box component="form" noValidate>
                  <TextField
                    fullWidth
                    type="password"
                    label="Enter Password"
                    variant="outlined"
                    value={checkPassword}
                    onChange={(e) => setCheckPassword(e.target.value)}
                    sx={{ mb: 3 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleCheck}
                    disabled={isLoading}
                    sx={{ py: 1.5 }}
                    startIcon={isLoading ? <CircularProgress size={20} /> : <LockOpen />}
                  >
                    {isLoading ? 'Accessing...' : 'Access Document'}
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
     
    </Box>
  );
};

export default AuthComponent;