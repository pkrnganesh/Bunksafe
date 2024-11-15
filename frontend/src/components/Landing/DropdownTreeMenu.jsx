import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DropdownTreeMenu = () => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      label: 'Product Features',
      items: [
        { label: 'Task Management' },
        { label: 'Collaboration' },
        { label: 'Reporting' },
      ],
    },
    {
      label: 'Pricing',
      items: [
        { label: 'Free' },
        { label: 'Pro' },
        { label: 'Enterprise' },
      ],
    },
    {
      label: 'Support',
      items: [
        { label: 'Documentation' },
        { label: 'Contact Us' },
        { label: 'FAQ' },
      ],
    },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => setOpen((prevOpen) => !prevOpen)}
        endIcon={
          <motion.div animate={{ rotate: open ? 180 : 0 }}>
            {open ? <ChevronDown /> : <ChevronRight />}
          </motion.div>
        }
      >
        Get free demo
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Box mt={2}>
              <List>
                {options.map((option, index) => (
                  <ListItem
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <ListItemText>
                      <Typography
                        variant="body1"
                        color={selectedOption === option.label ? 'primary' : 'inherit'}
                      >
                        {option.label}
                      </Typography>
                    </ListItemText>
                    {option.items.length > 0 && (
                      <Box ml={2}>
                        {open && selectedOption === option.label ? (
                          <ChevronDown size={20} />
                        ) : (
                          <ChevronRight size={20} />
                        )}
                      </Box>
                    )}
                  </ListItem>
                ))}
              </List>
              {selectedOption && (
                <List>
                  {options.find((option) => option.label === selectedOption).items.map((item, index) => (
                    <ListItem key={index} sx={{ pl: 4 }}>
                      <ListItemText>
                        <Typography variant="body2">{item.label}</Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default DropdownTreeMenu;