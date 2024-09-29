import React from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

const CircularProgressChart = () => {
  const data = [
    { name: "Total Days", value: 40, color: "#00FFFF" },
    { name: "Days to Attend", value: 35, color: "#FFD700" },
    { name: "Days Can Skip", value: 5, color: "#FF7F50" },
  ];

  const totalDays = data.reduce((sum, item) => sum + item.value, 0);
  const size = 275;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2.8;
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

  const LegendItem = ({ color, name, value }) => (
    <motion.div
      className="flex items-center mb-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div
        className="w-4 h-4 rounded-full mr-2"
        style={{ backgroundColor: color }}
      />
      <Typography variant="body2" className="text-white" style={{ color }}>
        {name}: <span style={{ fontWeight: "bold" }}>{value}</span>
      </Typography>
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto">
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          height: "100%",
          width: "100%",
          overflow: "auto",
          padding: "20px",
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
              return createArc(
                startPercentage,
                cumulativePercentage,
                segment.color,
                index
              );
            })}

            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="24"
              fontWeight="bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              Analysis
              <tspan x="50%" dy="1.2em" fontSize="18">
                {totalDays}
              </tspan>
            </motion.text>
          </svg>
        </div>

        <div className="mt-6">
          {data.map((item, index) => (
            <div className="flex items-center justify-between" key={index}>
              <LegendItem
                key={index}
                color="white"
                name={item.name}
                value={item.value}
              />
              <div
                className="ml-4"
                style={{
                  backgroundColor: item.color,
                  color: "white",
                  width: "15px",
                  height: "15px",
                  borderRadius: "25%",
                }}
              />
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default CircularProgressChart;
