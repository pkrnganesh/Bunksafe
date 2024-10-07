import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const AlertMessage = ({ alertState, setAlertState }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertState(prev => ({ ...prev, open: false }));
  };

  return (
    <Snackbar
      open={alertState.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={alertState.severity} sx={{ width: '100%' }}>
        {alertState.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
