// src/components/UploadData.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button } from '@mui/material';;

const UploadData = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Handle file upload logic here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed gray', padding: 20, textAlign: 'center' }}>
      <input {...getInputProps()} />
      <Typography>
        {isDragActive ? "Drop the files here" : "Drag and drop files here or click to browse"}
      </Typography>
      <Button variant="contained">Choose file</Button>
    </div>
  );
};

export default UploadData;

