import React from 'react';
import { Typography, Box, Slide, Skeleton, Paper } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import CodeSnippet from './CodeSnippet';

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

const Content = ({ loading, sections, isDarkMode }) => {
  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <StyledPaper elevation={3}>
        {loading ? (
          <>
            <Skeleton variant="text" width="60%" height={60} />
            {[...Array(5)].map((_, index) => (
              <Box key={index} sx={{ mb: 6 }}>
                <Skeleton variant="text" width="40%" height={40} />
                <Skeleton variant="rectangular" height={30} sx={{ mt: 2 }} />
                <Skeleton variant="rectangular" height={30} sx={{ mt: 2 }} />

              </Box>
            ))}
          </>
        ) : (
          <>
            {/* <Typography variant="h1" component="h1" gutterBottom>
              Project Documentation
            </Typography> */}
            
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
  );
};

export default Content;