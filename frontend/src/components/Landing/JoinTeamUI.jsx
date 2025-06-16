import React, { useState, useRef, useEffect } from "react";
import { MailOutline } from "@mui/icons-material";
import { Box, Typography, Container } from '@mui/material';

const JoinT = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const hiddenInputRef = useRef(null);
  const textPathRef = useRef(null);

  // Handle input changes and update both hidden input and visible curved text
  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  // Focus the hidden input when clicking on the wrapper
  const handleWrapperClick = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  };

  return (
    <Box sx={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff'
        }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          component="h1"
          sx={{ 
            fontWeight: 'bold',
            mb: 2,
            color: '#111827'
          }}
        >
          Build the Future Together
        </Typography>

        <Typography 
          variant="h5"
          sx={{ 
            color: '#6b7280',
            mb: 4 
          }}
        >
          Connect, collaborate, and create with developers worldwide. Turn this Innovative idea into impactful open source solution.
        </Typography>

        <style>
          {`
            .input-container {
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
            }

            .email-wrapper {
              position: relative;
              width: 456px;
              height: 109px;
              cursor: text;
            }

            .inputFocus, .curvedInputBg {
              position: absolute;
              width: 100%;
              height: auto;
              top: 0;
              left: 0;
            }

            .hiddenInput {
              position: absolute;
              opacity: 0;
              pointer-events: none;
            }

            .curved-text-container {
              position: absolute;
              width: 70%;
              height: 40px;
              top: 30%;
              left: 15%;
              z-index: 2;
            }

            .curved-text {
              width: 100%;
              height: 100%;
            }

            .curved-text text {
              font-size: 16px;
              fill: #333;
            }

            .placeholder-text {
              fill: #888;
              font-family: Arial, sans-serif;
            }

            .input-text {
              fill: #000;
              font-family: Arial, sans-serif;
            }

            .submitButton {
              cursor: pointer;
              width: 137px;
              height: 68px;
              position: absolute;
              right: 10px;
              bottom: 26px;
              transition: 0.3s ease-in-out;
              z-index: 3;
            }

            .submitButton:hover {
              transform: scale(1.05);
            }

            .submitButton text {
              font-size: 16px;
              fill: white;
              font-family: Arial, sans-serif;
              font-weight: bold;
            }

            .submitButton path {
              fill: #1463FF;
            }

            .mailIcon {
              position: absolute;
              left: 26px;
              top: 30%;
              color: #1463FF;
              z-index: 2;
            }
          `}
        </style>

        <form action="" method="GET" onSubmit={(e) => e.preventDefault()}>
          <div className="input-container">
            {/* Email Input Wrapper */}
            <div className="email-wrapper" onClick={handleWrapperClick}>
              {/* Background and Border */}
              <svg className="inputFocus" viewBox="0 0 456 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.43237 15.6418L8.43368 15.6329C9.13435 10.8624 11.6904 6.56142 15.5459 3.66587C19.4004 0.77108 24.2419 -0.484754 29.0174 0.171545C161.062 18.2015 294.944 18.2017 426.988 0.172129C431.765 -0.488186 436.609 0.767202 440.464 3.66448C444.32 6.56264 446.874 10.8684 447.567 15.642L447.569 15.6507L455.81 72.9492C456.155 75.3147 456.029 77.7252 455.439 80.0419C454.85 82.3586 453.807 84.5357 452.373 86.4479C450.938 88.3601 449.139 89.9697 447.08 91.1839C445.02 92.3981 442.741 93.1929 440.374 93.5225L440.361 93.5243C299.448 112.831 156.562 112.831 15.6493 93.5243L15.6414 93.5232C13.2722 93.1954 10.9914 92.4019 8.9304 91.1885C6.86936 89.9751 5.06885 88.3658 3.6326 86.4534C2.19635 84.541 1.15274 82.3632 0.561897 80.0457C-0.0284018 77.7303 -0.155133 75.321 0.188963 72.9565C0.189283 72.9543 0.189603 72.9521 0.189923 72.9499L8.43237 15.6418Z"
                  fill="#C2C6FF" fillOpacity="0.5"
                />
              </svg>

              <svg className="curvedInputBg" viewBox="0 0 447 99" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.3651 11.5007C9.83594 8.29498 11.5535 5.40494 14.1441 3.45936C16.7347 1.51379 19.9887 0.670093 23.1982 1.11185C155.784 19.216 290.216 19.216 422.802 1.11185C426.011 0.6675 429.265 1.51042 431.855 3.4567C434.444 5.40298 436.159 8.29462 436.625 11.5007L444.868 68.812C445.099 70.3946 445.015 72.0073 444.62 73.5572C444.225 75.1071 443.528 76.5636 442.568 77.8429C441.608 79.1222 440.405 80.199 439.028 81.0112C437.65 81.8235 436.125 82.3551 434.541 82.5756C294.169 101.808 151.831 101.808 11.4589 82.5756C9.87405 82.3563 8.34829 81.8255 6.96952 81.0138C5.59076 80.2021 4.38624 79.1255 3.42538 77.8461C2.46453 76.5667 1.76634 75.1098 1.37104 73.5592C0.975749 72.0087 0.891171 70.3953 1.12218 68.812L9.3651 11.5007Z"
                  fill="white" 
                  stroke="#333FFF"
                />
              </svg>

              {/* Mail Icon */}
              <MailOutline className="mailIcon" fontSize="large" />

              {/* Hidden Input Field for Form Submission */}
              <input
                type="email"
                name="email"
                className="hiddenInput"
                value={email}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                ref={hiddenInputRef}
                required
              />

              {/* Curved Text Display */}
              <div className="curved-text-container">
                <svg className="curved-text" viewBox="0 0 320 40" preserveAspectRatio="none">
                  <defs>
                    {/* Define a gentle curve for the text to follow */}
                    <path id="textPath" d="M0,20 Q160,30 320,20" fill="none" />
                  </defs>
                  
                  {/* Display placeholder text when empty */}
                  {!email && !isFocused && (
                    <text className="placeholder-text">
                      <textPath href="#textPath" ref={textPathRef} startOffset="5%">
                        Your email address
                      </textPath>
                    </text>
                  )}
                  
                  {/* Display actual input text */}
                  {email && (
                    <text className="input-text">
                      <textPath href="#textPath" startOffset="5%">
                        {email}
                      </textPath>
                    </text>
                  )}
                </svg>
              </div>

              {/* Get Started Button */}
              <svg className="submitButton" viewBox="0 0 137 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M128.82 4.83682C128.507 2.66273 126.499 1.14832 124.322 1.4379C86.7692 6.4322 49.0939 9.97774 11.2959 12.0745C9.38473 12.1805 7.81325 13.6216 7.5475 15.5172L0.919677 62.7932C0.571779 65.2747 2.56518 67.4617 5.06786 67.3366C47.5125 65.2148 89.8474 61.3479 132.073 55.736C134.275 55.4432 135.812 53.4068 135.495 51.2074L128.82 4.83682Z"
                  fill="#1463FF"
                />
                <text x="25" y="35" fontSize="16" fill="white" fontFamily="Arial" fontWeight="bold">
                  Get Started
                </text>
              </svg>
            </div>
          </div>
        </form>
      </Container>
    </Box>
  );
};

export default JoinT;