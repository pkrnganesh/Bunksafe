import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/system';
import { Typography, Box, useTheme, alpha, Skeleton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Container = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(10px)',
  color:  '#A983FF',
  display: 'flex',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
}));

const QuestionList = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const Question = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:hover': {
    backgroundColor:  '#A983FF',
  },
}));

const AnswerContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  position: 'relative',
  minHeight: '300px',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: `0 5px 15px ${alpha(theme.palette.common.black, 0.2)}`,
}));

const AnswerImage = styled(motion.img)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const faqData = [
  {
    question: "Chat with AI on every website",
    image: "https://picsum.photos/seed/chat/600/400"
  },
  {
    question: "Chat with 20+ top AI models",
    image: "https://picsum.photos/seed/models/600/400"
  },
  {
    question: "Get AI response on every search",
    image: "https://picsum.photos/seed/search/600/400"
  },
  {
    question: "Chat with Websites",
    image: "https://picsum.photos/seed/websites/600/400"
  },
  {
    question: "Chat with Documents",
    image: "https://picsum.photos/seed/documents/600/400"
  },
];

const FAQ = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const theme = useTheme();

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleQuestionChange = (index) => {
    setSelectedQuestion(index);
    setImageLoading(true);
  };

  return (
    <Container>
      <QuestionList>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="#A983FF">
          Frequently Asked Questions
        </Typography>
        {faqData.map((item, index) => (
          <Question
            key={index}
            onClick={() => handleQuestionChange(index)}
            onHoverStart={() => handleQuestionChange(index)}
            animate={{
              backgroundColor: selectedQuestion === index ?   '#A983FF' : 'transparent',
            }}
          >
            <Typography 
              variant="body1" 
              fontWeight={selectedQuestion === index ? 'bold' : 'normal'}
              color={selectedQuestion === index ? 'white' : 'text.primary'}
            >
              {item.question}
            </Typography>
            <ArrowForwardIcon 
              sx={{ 
                opacity: selectedQuestion === index ? 1 : 0,
                color: '#A983FF',
                transition: 'opacity 0.2s'
              }} 
            />
          </Question>
        ))}
      </QuestionList>
      <AnswerContainer>
        <AnimatePresence mode="wait">
          {imageLoading && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
              sx={{ position: 'absolute', backgroundColor: theme.palette.action.hover }}
            />
          )}
          <AnswerImage
            key={selectedQuestion}
            src={faqData[selectedQuestion].image}
            alt={faqData[selectedQuestion].question}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onLoad={handleImageLoad}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        </AnimatePresence>
      </AnswerContainer>
    </Container>
  );
};

export default FAQ;