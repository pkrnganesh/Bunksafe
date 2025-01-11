import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar,
  styled
} from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '280px',
  height: '380px',
  margin: '0 16px',
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  border: '1px solid #f5f5f5',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
  }
}));

const CarouselContainer = styled(Box)({
  display: 'flex',
  overflowX: 'hidden',
  position: 'relative',
  padding: '20px 0',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
});

const SlideWrapper = styled(Box)({
  display: 'flex',
  transition: 'transform 0.5s linear',
});

const Title = styled(Typography)({
  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  fontSize: '20px',
  fontWeight: 600,
  color: '#1a1a1a',
  marginBottom: '12px',
});

const Content = styled(Typography)({
  fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
  fontSize: '15px',
  lineHeight: 1.5,
  color: '#666666',
  marginBottom: '24px',
});

const UserName = styled(Typography)({
  fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
  fontSize: '14px',
  fontWeight: 500,
  color: '#1a1a1a',
});

const UserRole = styled(Typography)({
  fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
  fontSize: '13px',
  color: '#666666',
});

const reviews = [
  {
    id: 1,
    title: "An indispensable part of my academic toolkit.",
    content: "As a student, Merlin AI has been invaluable for my academic work. The tool's automatic summarization and advanced text analysis features have significantly boosted my productivity and understanding.",
    author: "Preston Bailey",
    role: "Extension user",
    avatar: "PB"
  },
  {
    id: 2,
    title: "Amazing support.",
    content: "The reason for gaining trust in Merlin lies in their communication approach. They are more honest in their communication than expected, and while they can't accommodate everything, they provide satisfaction with quick responses to users' demands. I give it 10/10!!",
    author: "10754148834486018",
    role: "AppSumo user",
    avatar: "10"
  },
  {
    id: 3,
    title: "Get straight A+s in uni.",
    content: "My Lil brother had an assignment for UNI, to use an AI to summarize a doc and display the key points using charts, PowerBI, etc. Everyone used ChatGPT, Gemini, nothing fancy. Lil bro used Merlin per my advise. He got an A+ and doesn't need to attend the finals from this project.",
    author: "Omar Alsharif",
    role: "Extension user",
    avatar: "OA"
  },
  // Duplicate reviews to create continuous scroll effect
  {
    id: 4,
    title: "An indispensable part of my academic toolkit.",
    content: "As a student, Merlin AI has been invaluable for my academic work. The tool's automatic summarization and advanced text analysis features have significantly boosted my productivity and understanding.",
    author: "Preston Bailey",
    role: "Extension user",
    avatar: "PB"
  },
  {
    id: 5,
    title: "Amazing support.",
    content: "The reason for gaining trust in Merlin lies in their communication approach. They are more honest in their communication than expected, and while they can't accommodate everything, they provide satisfaction with quick responses to users' demands. I give it 10/10!!",
    author: "10754148834486018",
    role: "AppSumo user",
    avatar: "10"
  },

  {
    id: 5,
    title: "Amazing support.",
    content: "The reason for gaining trust in Merlin lies in their communication approach. They are more honest in their communication than expected, and while they can't accommodate everything, they provide satisfaction with quick responses to users' demands. I give it 10/10!!",
    author: "10754148834486018",
    role: "AppSumo user",
    avatar: "10"
  }
];

const ReviewCarousel = () => {
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      if (!isPaused) {
        setPosition(prev => {
          const newPosition = prev - 0.5;
          // Reset position when enough slides have scrolled
          if (newPosition < -(380 + 32) * 3) { // Card width + margin * number of original slides
            return 0;
          }
          return newPosition;
        });
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  return (
    <CarouselContainer
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SlideWrapper
        sx={{
          transform: `translateX(${position}px)`,
        }}
      >
        {reviews.map((review) => (
          <StyledCard key={review.id}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
              <Title variant="h6">
                {review.title}
              </Title>
              <Content>
                {review.content}
              </Content>
              <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  sx={{ 
                    bgcolor: '#f5f5f5', 
                    color: '#666',
                    width: 32,
                    height: 32,
                    fontSize: '14px'
                  }}
                >
                  {review.avatar}
                </Avatar>
                <Box sx={{ ml: 1.5 }}>
                  <UserName>
                    {review.author}
                  </UserName>
                  <UserRole>
                    {review.role}
                  </UserRole>
                </Box>
              </Box>
            </CardContent>
          </StyledCard>
        ))}
      </SlideWrapper>
    </CarouselContainer>
  );
};

export default ReviewCarousel;