import React, { useState } from 'react';
import { 
  AppBar, Toolbar as MuiToolbar, IconButton, Typography, Button, 
  Menu, MenuItem, Divider, Tooltip 
} from '@mui/material';
import { 
  Save, Download, ExitToApp, 
  Undo, Redo, FormatBold, FormatItalic, FormatUnderlined, MoreVert
} from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fff',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  padding: '8px 16px',
  borderRadius: '8px 8px 0 0',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
  },
  margin: '0 4px',
}));

const Toolbar = ({ content, setContent, showAlertMessage, handleLogout, setIsLoading }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);

  const handleMenuClose = () => setAnchorEl(null);
  const handleMoreMenuClose = () => setMoreAnchorEl(null);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      showAlertMessage('Content saved successfully!', 'success');
      setIsLoading(false);
    }, 1500);
    handleMenuClose();
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
    handleMenuClose();
  };

  return (
    <StyledAppBar position="static" elevation={1}>
      <MuiToolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1, color: '#333' }}>
          Anonymous Notepad
        </Typography>
        
        <Tooltip title="Undo">
          <StyledIconButton onClick={() => setContent(prevContent => prevContent.slice(0, -1))} color="black">
            <Undo />
          </StyledIconButton>
        </Tooltip>
        
        <Tooltip title="Redo">
          <StyledIconButton onClick={() => setContent(prevContent => prevContent + ' ')} color="black">
            <Redo />
          </StyledIconButton>
        </Tooltip>
        
        <Tooltip title="Bold">
          <StyledIconButton onClick={() => setContent(prevContent => `<strong>${prevContent}</strong>`)} color="black">
            <FormatBold />
          </StyledIconButton>
        </Tooltip>
        
        <Tooltip title="Italic">
          <StyledIconButton onClick={() => setContent(prevContent => `<em>${prevContent}</em>`)} color="black">
            <FormatItalic />
          </StyledIconButton>
        </Tooltip>
        
        <Tooltip title="Underline">
          <StyledIconButton onClick={() => setContent(prevContent => `<u>${prevContent}</u>`)} color="black">
            <FormatUnderlined />
          </StyledIconButton>
        </Tooltip>

        <Tooltip title="More Options">
          <StyledIconButton color="black" onClick={(e) => setMoreAnchorEl(e.currentTarget)}>
            <MoreVert />
          </StyledIconButton>
        </Tooltip>

        <Menu
          anchorEl={moreAnchorEl}
          open={Boolean(moreAnchorEl)}
          onClose={handleMoreMenuClose}
        >
          <MenuItem onClick={handleSave}>
            <Save sx={{ mr: 1 }} /> Save
          </MenuItem>
          <MenuItem onClick={handleExport}>
            <Download sx={{ mr: 1 }} /> Export
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ExitToApp sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </MuiToolbar>
    </StyledAppBar>
  );
};

export default Toolbar;
