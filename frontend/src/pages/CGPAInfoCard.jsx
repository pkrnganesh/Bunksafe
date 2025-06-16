import React from 'react';
import { motion } from 'framer-motion';

const CGPAInfoCard = ({ name, university, date, cgpa }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'linear-gradient(to bottom, #ffffff, #fff9c4)',
        borderRadius: '16px',
        padding: '20px',
        width: '300px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ marginBottom: '15px' }}>
        <h2 style={{ margin: 0, color: '#424242', fontSize: '18px', fontWeight: 'bold' }}>{name}</h2>
        <p style={{ margin: '5px 0 0', color: '#757575', fontSize: '14px' }}>{university}</p>
      </div>
      <p style={{ margin: '0 0 20px', color: '#9e9e9e', fontSize: '14px' }}>{date}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#424242' }}>{cgpa}</span>
        <span style={{
          backgroundColor: '#fff176',
          color: '#424242',
          padding: '5px 10px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: 'bold',
        }}>
          CGPA
        </span>
      </div>
    </motion.div>
  );
};

export default CGPAInfoCard;