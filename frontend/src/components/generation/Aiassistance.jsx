import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, Typography, Box, TextField, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Loader2, Send, Bot, User } from 'lucide-react';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const scrollbarStyle = {
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(200, 200, 200, 0.2)', // Lighter scrollbar track for better contrast
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(100, 100, 100, 0.5)', // Darker scrollbar thumb for better visibility
    borderRadius: '10px',
    '&:hover': {
      background: 'rgba(100, 100, 100, 0.7)',
    },
  },
};

const API_URL = process.env.REACT_APP_SERVER_URL;


const Aiassistance = ({ analysisData }) => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatHistory]);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setChatHistory(prev => [...prev, { type: 'user', content: question }]);

    try {
        const response = await axios.post(`${API_URL}/ai/attendance-management-advice`, {
        data: analysisData,
        question: question
      });
      
      setChatHistory(prev => [...prev, { type: 'ai', content: response.data }]);
    } catch (error) {
      console.error('Error getting AI advice:', error);
      setChatHistory(prev => [...prev, { type: 'ai', content: { advice: 'Sorry, I encountered an error while processing your request.' } }]);
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  const renderMessage = (message, index) => {
    const isUser = message.type === 'user';
    const Icon = isUser ? User : Bot;

    return (
      <MotionBox
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        sx={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-start', maxWidth: '80%' }}>
          <Box sx={{ 
            backgroundColor: isUser ? '#4a90e2' : '#2ecc71', 
            color: 'white', 
            p: 1, 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mr: isUser ? 0 : 1,
            ml: isUser ? 1 : 0,
          }}>
            <Icon size={20} />
          </Box>
          <Typography variant="body2" sx={{ 
            backgroundColor: isUser ? 'rgba(227, 242, 253, 0.7)' : 'rgba(240, 244, 195, 0.7)', 
            color: 'black',
            p: 2, 
            borderRadius: '15px', 
            borderTopRightRadius: isUser ? 0 : '15px',
            borderTopLeftRadius: isUser ? '15px' : 0,
            maxWidth: '100%',
            wordBreak: 'break-word'
          }}>
            {isUser ? message.content : (
              <>
                <strong>Advice:</strong> {message.content.advice}
                {message.content.keyPoints && (
                  <>
                    <br /><br />
                    <strong>Key Points:</strong>
                    <ul>
                      {message.content.keyPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </>
                )}
                {message.content.subjectSpecificRecommendations && (
                  <>
                    <br />
                    <strong>Subject-Specific Recommendations:</strong>
                    <ul>
                      {Object.entries(message.content.subjectSpecificRecommendations).map(([subject, recommendation]) => (
                        <li key={subject}><strong>{subject}:</strong> {recommendation}</li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </Typography>
        </Box>
      </MotionBox>
    );
  };

  return (
    <MotionCard
      sx={{ height: "40%", width: "41%", marginLeft: '15px', marginTop: '20px',minWidth: '400px', borderRadius: '10px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: "black", mb: 2, textAlign: 'center' }}>
          AI Assistance Chat
        </Typography>

        <Box sx={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          mb: 2, 
          pr: 1,
          maxHeight: '300px', // Set a max height for the chat box
          ...scrollbarStyle,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '10px',
          padding: '10px',
        }}>
          <AnimatePresence>
            {chatHistory.map((message, index) => renderMessage(message, index))}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
            sx={{ 
              mr: 1,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
              },
              '& .MuiOutlinedInput-input': {
                color: 'black', // Changed to black for better contrast
              },
            }}
          />
          <IconButton
            onClick={handleAskQuestion}
            disabled={loading}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "black", // Set to black to match the white card theme
              borderRadius: "50%",
              width: '50px',
              height: '50px',
              '&:hover': {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send />}
          </IconButton>
        </Box>
      </CardContent>
    </MotionCard>
  );
};

export default Aiassistance;
