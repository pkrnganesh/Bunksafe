import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Grid, Chip } from '@mui/material'; // Ensure you import these from MUI
import { useTheme } from '@mui/material/styles'; // Import useTheme for consistent theming

const CircularProgressChart = () => {
  const theme = useTheme(); // Use theme for consistent styling
  const data = [
    { name: 'Total Days', value: 20, color: '#FF9F9F' },
    { name: 'Days to Attend', value: 15, color: '#7CD7FF' },
    { name: 'Days Can Skip', value: 5, color: '#A5F3FC' },
  ];

  const totalDays = data.reduce((sum, item) => sum + item.value, 0);
  const size = 275;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2.2;
  const circumference = 2 * Math.PI * radius;

  const createArc = (startPercentage, endPercentage, color, index) => {
    const start = (startPercentage / 100) * circumference;
    const end = (endPercentage / 100) * circumference;

    return (
      <motion.circle
        key={index}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${end - start} ${circumference}`}
        strokeDashoffset={-start}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: -start }}
        transition={{ duration: 1, delay: index * 0.2 }}
      />
    );
  };

  let cumulativePercentage = 0;

  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto">
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.6)", // Pale white background
          borderRadius: "12px", // Rounded corners
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // Box shadow
          p: 2, // Padding to match CardContent
          height: "80%",
          width: "120%", // Width similar to MotionCard
          overflow: 'auto', // Overflow handling
        }}
      >
        <div className="relative">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="transform transition-transform duration-300 hover:scale-105"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {data.map((segment, index) => {
              const startPercentage = cumulativePercentage;
              cumulativePercentage += (segment.value / totalDays) * 100;
              return createArc(startPercentage, cumulativePercentage, segment.color, index);
            })}

            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#333"
              fontSize="24"
              fontWeight="bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              Total Days
              <br />
              {totalDays}
            </motion.text>
          </svg>
        </div>

        <div className="mt-6 space-y-3 w-full">
          {data.map((item, index) => {
            const percentage = ((item.value / totalDays) * 100).toFixed(1); // Calculate percentage
            return (
              <motion.div
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg" // Updated styles
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                style={{
                  borderRadius: '12px', // Customize border-radius
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  padding : '10px', // Customize shadow
                }}
              >
                <div className="flex items-center">
                  {/* Display color beside the text */}
                  <div
                    className="w-4 h-4 mr-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-800 font-semibold">
                    {item.name} {item.value}
                  </span>
                </div>

                {/* Display percentage */}
                <span className="text-gray-600 font-semibold">{percentage}%</span>
              </motion.div>
            );
          })}
        </div>
      </Box>
    </div>
  );
};

export default CircularProgressChart;
