import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { CopyAll } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

export default CodeSnippet;