import React from 'react';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { Save as SaveIcon, Refresh as RefreshIcon, Share as ShareIcon, Print as PrintIcon } from '@mui/icons-material';

const ActionSpeedDial = ({  setSnackbar }) => (
  <SpeedDial
    ariaLabel="SpeedDial basic example"
    sx={{ position: 'fixed', bottom: 16, right: 16 }}
    icon={<SpeedDialIcon />}
  >
    {/* <SpeedDialAction
      icon={<SaveIcon />}
      tooltipTitle="Save"
      onClick={handleSave}
    />
    <SpeedDialAction
      icon={<RefreshIcon />}
      tooltipTitle="Reset"
      onClick={handleReset}
    /> */}
    <SpeedDialAction
      icon={<ShareIcon />}
      tooltipTitle="Share"
      onClick={() => setSnackbar({ open: true, message: 'Sharing functionality coming soon!', severity: 'info' })}
    />
    <SpeedDialAction
      icon={<PrintIcon />}
      tooltipTitle="Print"
      onClick={() => window.print()}
    />
  </SpeedDial>
);

export default ActionSpeedDial;
