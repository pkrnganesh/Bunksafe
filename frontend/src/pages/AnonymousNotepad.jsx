import React, { useState } from 'react';
import { Container, Paper, Box } from '@mui/material';
import AuthComponent from '../components/AnonymousNotepad/AuthComponent';
import Editor from '../components/AnonymousNotepad/Editor';
import Toolbar from '../components/AnonymousNotepad/Toolbar';
import AlertMessage from '../components/AnonymousNotepad/AlertMessage';
import SecureNotepad from '../components/AnonymousNotepad/SecureNotepad';
import { useLocalStorage } from '../components/AnonymousNotepad/useLocalStorage';

const AnonymousNotepad = () => {
  const [content, setContent] = useLocalStorage('anonymousNotepadContent', '');
  const [isCreated, setIsCreated] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showAlertMessage = (message, severity = 'success') => {
    setAlertState({ open: true, message, severity });
  };

  const handleLogout = () => {
    setIsCreated(false);
    setContent('');
    setPassword('');
    showAlertMessage('Logged out successfully', 'info');
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
        {!isCreated ? (
          <AuthComponent
            setIsCreated={setIsCreated}
            showAlertMessage={showAlertMessage}
            isLoading={isLoading}
            setContent={setContent}
            setIsLoading={setIsLoading}
            setPassword={setPassword}
          />
        ) : (
          <Box>
            <Toolbar
              content={content}
              setContent={setContent}
              showAlertMessage={showAlertMessage}
              handleLogout={handleLogout}
            />
           
            <Editor content={content} setContent={setContent} />
            <SecureNotepad
              content={content}
              password={password}
              showAlertMessage={showAlertMessage}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Box>
        )}
      </Paper>
      <AlertMessage alertState={alertState} setAlertState={setAlertState} />
    </Container>
  );
};

export default AnonymousNotepad;
