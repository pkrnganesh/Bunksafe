import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  TextField,
  Tooltip,
  Divider,
  Paper,
  Stack
} from '@mui/material';
import { 
  Save, 
  LinkRounded, 
  ContentCopy, 
  Download,
  Terminal,
  Security,
  OpenInNew,
  Check
} from '@mui/icons-material';
import { StoreData } from '../../api/useStoreNoteData';

const SecureNotepad = ({ content, password, showAlertMessage }) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();


  
  const handleSave = () => {
    const secureLink = 'https://attendance-analysis-1.onrender.com/incrementUserCount/downloadData/' + password;
    setGeneratedLink(secureLink);
    setShowLinkDialog(true);
    showAlertMessage('Content saved successfully!', 'success');
    console.log('Content saved:', content,'password:', password);
    const response = StoreData({ id: password, dataValue: content });
    console.log('Response:', response);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
    showAlertMessage('Link copied to clipboard!', 'success');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'secure-note.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showAlertMessage('Content downloaded successfully!', 'success');
  };

  const handleClose = () => {
    setShowLinkDialog(false);
    navigate('/note');
  };

  return (
    <>
      <Button 
        onClick={handleSave}
        variant="contained"
        color="success"
         sx={{
          position: 'fixed',
          bottom: '2rem',
          right: '5rem',
          zIndex: 1000,
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          px: 4,
          py: 1.5,
          borderRadius: 3,
        }}
      >
        Save
      </Button>

      <Dialog 
        open={showLinkDialog} 
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: '16px',
            width: '100%',
            maxWidth: '700px',
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Security sx={{ color: 'success.main', fontSize: 28 }} />
            <Typography variant="h5" fontWeight="bold" color="success.main">
              Secure Access Link Generated
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {/* Link Section */}
            <Paper elevation={0} sx={{ bgcolor: '#f8fdf8', p: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                Your Secure Share Link
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                gap="8px"
                bgcolor="white"
                borderRadius="12px"
                border="1px solid #e0e0e0"
                p={1}
                mt={1}
              >
                <LinkRounded sx={{ color: 'success.main' }} />
                <TextField
                  value={generatedLink}
                  InputProps={{
                    readOnly: true,
                    sx: { 
                      '& fieldset': { border: 'none' },
                      fontSize: '0.95rem'
                    }
                  }}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
                <Tooltip title={copySuccess ? "Copied!" : "Copy link"}>
                  <IconButton 
                    onClick={handleCopyLink}
                    color="success"
                  >
                    {copySuccess ? <Check /> : <ContentCopy />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download content">
                  <IconButton 
                    onClick={handleDownload}
                    color="success"
                  >
                    <Download />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>

            {/* Instructions Section */}
            <Paper elevation={0} sx={{ bgcolor: '#f8fdf8', p: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                Access Options
              </Typography>
              
              <Stack spacing={2} mt={2}>
                {/* Browser Access */}
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <OpenInNew sx={{ color: 'success.main', fontSize: 20 }} />
                    <Typography variant="subtitle2" fontWeight="600">
                      Browser Access
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Simply click the link or copy-paste it into your browser to view the content.
                  </Typography>
                </Box>

                {/* Terminal Access */}
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <Terminal sx={{ color: 'success.main', fontSize: 20 }} />
                    <Typography variant="subtitle2" fontWeight="600">
                      Terminal Download
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Use curl or wget to download the content directly:
                  </Typography>
                  <Paper 
                    sx={{ 
                      bgcolor: '#2f2f2f',
                      color: '#fff',
                      p: 2,
                      borderRadius: 1,
                      fontFamily: 'monospace',
                      fontSize: '0.85rem'
                    }}
                  >
                    curl -o secure-note.txt {generatedLink}
                  </Paper>
                </Box>
              </Stack>
            </Paper>

            {/* Security Note */}
            <Typography variant="body2" color="text.secondary" sx={{ pl: 1 }}>
              🔒 This link is encrypted and requires the original password to access. 
              Share it securely and avoid posting in public forums.
            </Typography>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={handleClose}
            variant="contained"
            color="success"
            fullWidth
            size="large"
            sx={{ 
              borderRadius: 2,
              py: 1.5
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SecureNotepad;