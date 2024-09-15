// FileUploadArea.js
import React from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "@mui/icons-material";
import Lottie from "react-lottie";
import uploadAnimation from "../../animations/animation2.json";

const FileUploadArea = ({
  isUploading,
  uploadComplete,
  fileName,
  handleUpload,
  fileInputRef,
  handleFileChange,
  isMobile,
}) => {
  const uploadLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: uploadAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Box
        sx={{
          border: "2px dashed #2196f3",
          borderRadius: 4,
          p: isMobile ? 2 : 4,
          textAlign: "center",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(33, 150, 243, 0.04)",
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          margin: "0 auto",
          marginTop: isMobile ? "1rem" : 0,
          height: "200px",
        }}
        onClick={handleUpload}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <AnimatePresence>
          {isUploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Lottie options={uploadLottieOptions} height={200} width={200} />
            </motion.div>
          ) : uploadComplete ? (
            <motion.div
              key="complete"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            >
              <CheckCircle sx={{ fontSize: 100, color: "success.main" }} />
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Lottie options={uploadLottieOptions} height={200} width={200} />
            </motion.div>
          )}
        </AnimatePresence>
        <Typography variant="body1" gutterBottom style={{ marginTop: "20px" }}>
          {isUploading
            ? "Uploading..."
            : uploadComplete
            ? "Upload Complete!"
            : "Click or drag Timetable file here"}
        </Typography>
        {fileName && (
          <Typography variant="body2" color="textSecondary">
            {fileName}
          </Typography>
        )}
      </Box>
    </motion.div>
  );
};

export default FileUploadArea;