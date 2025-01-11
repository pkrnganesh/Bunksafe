import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Settings, 
  MessageCircle, 
  Briefcase, 
  HelpCircle 
} from 'lucide-react';

const CircularNavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { 
      icon: Globe, 
      label: 'Explore', 
      color: 'bg-teal-500',
      angle: 0 
    },
    { 
      icon: Briefcase, 
      label: 'Projects', 
      color: 'bg-indigo-500',
      angle: 72 
    },
    { 
      icon: MessageCircle, 
      label: 'Connect', 
      color: 'bg-pink-500',
      angle: 144 
    },
    // { 
    //   icon: Settings, 
    //   label: 'Settings', 
    //   color: 'bg-orange-500',
    //   angle: 216 
    // },
    // { 
    //   icon: HelpCircle, 
    //   label: 'Support', 
    //   color: 'bg-purple-500',
    //   angle: 288 
    // }
  ];

  const calculatePosition = (angle, radius = 120) => {
    const radian = angle * Math.PI / 180;
    return {
      transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`
    };
  };

  return (
    <div className="relative flex items-center justify-center min-h-[300px]">
      <motion.button 
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="z-50 bg-gradient-to-br from-blue-600 to-purple-700 text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-xl transition-all"
      >
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="absolute">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  rotate: 0 
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: item.angle 
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0,
                  rotate: 0 
                }}
                style={calculatePosition(item.angle)}
                className={`absolute w-20 h-20 rounded-full flex items-center justify-center ${item.color} shadow-lg cursor-pointer`}
                transition={{ 
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                  delay: index * 0.1
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center text-white flex flex-col items-center">
                  <item.icon size={32} strokeWidth={2} />
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CircularNavMenu;