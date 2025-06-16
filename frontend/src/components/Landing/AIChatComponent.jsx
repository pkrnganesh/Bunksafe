import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { InputBase } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import MicIcon from "@mui/icons-material/Mic";

const AIAddComponent = () => {

  // Dummy data for avatar images
  const dummyAvatars = [
    "data:image/jpeg;base64,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",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtI3gQxCeJM7U18XretpvwaXMSrYCXXO2Klg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThTsJIV7cHhEOtflLwkdbTi6Azf_WCcOsPuYAVWKfeRNUl7t-G-EAAUwsjMFXsxUko1uA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtkdSh4oQneredkRJxrLPLG1g3i51nZNUExEID0o4LfXEO5rXY4BO__oCBJHD3aoudEsg&usqp=CAU",
  ];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        bgcolor: "white",
        overflow: "hidden",
        pt: 6,
        pb: 6,
      }}
    >
      {/* Background gradient elements */}
      <Box
        sx={{
          position: "absolute",
          width: "40%",
          height: "40%",
          right: "-5%",
          top: "10%",
          background:
            "linear-gradient(135deg, rgba(228, 208, 255, 0.4), rgba(228, 208, 255, 0))",
          borderRadius: "50%",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: "30%",
          height: "30%",
          left: "10%",
          bottom: "5%",
          background:
            "linear-gradient(135deg, rgba(255, 222, 173, 0.5), rgba(255, 222, 173, 0))",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      {/* Main content container */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 4 },
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        {/* Heading */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 800,
            color: "#1a1a47",
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
            mb: 0,
            lineHeight: 1.1,
            fontFamily: "cursive",
          }}
        >
          AI chat{" "}
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              mx: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 5,
                mt: -12,
                width: 150,
                height: 50,
                backgroundColor: "#f2f2f2",
                borderRadius: 10,
              }}
            >
              <svg viewBox="0 0 100 40" width="100%" height="100%" mt="-10">
                <rect x="0" y="15" width="5" height="10" fill="#9c27b0">
                  <animate
                    attributeName="height"
                    values="10;30;10"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="10" y="15" width="5" height="10" fill="#9c27b0">
                  <animate
                    attributeName="height"
                    values="10;40;10"
                    dur="1s"
                    repeatCount="indefinite"
                    begin="0.1s"
                  />
                </rect>
                <rect x="20" y="15" width="5" height="10" fill="#9c27b0">
                  <animate
                    attributeName="height"
                    values="10;25;10"
                    dur="1s"
                    repeatCount="indefinite"
                    begin="0.2s"
                  />
                </rect>
                <rect x="30" y="15" width="5" height="10" fill="#9c27b0">
                  <animate
                    attributeName="height"
                    values="10;35;10"
                    dur="1s"
                    repeatCount="indefinite"
                    begin="0.3s"
                  />
                </rect>
                <rect x="40" y="15" width="5" height="10" fill="#9c27b0">
                  <animate
                    attributeName="height"
                    values="10;20;10"
                    dur="1s"
                    repeatCount="indefinite"
                    begin="0.4s"
                  />
                </rect>
                <rect x="50" y="15" width="5" height="10" fill="#9c27b0">
                  <animate
                    attributeName="height"
                    values="10;30;10"
                    dur="1s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </rect>
                <rect x="50" y="15" width="5" height="10" fill="#9c27b0">
                  <animate
                    attributeName="height"
                    values="10;30;10"
                    dur="1s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </rect>
              </svg>
            </Box>
          </Box>{" "}
          that feels
        </Typography>
        <Typography
          variant="h2"
          component="div"
          sx={{
            fontWeight: 800,
            color: "#1a1a47",
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
            lineHeight: 1.2,
            mb: 5,
            fontFamily: "cursive",
          }}
        >
          surprisingly{" "}
          <Box
            component="span"
            sx={{
              bgcolor: "rgba(228, 208, 255, 0.8)",
              px: { xs: 2, md: 3 },
              py: { xs: 0.5, md: 1 },
              borderRadius: 6,
              display: "inline-block",
            }}
          >
            human
          </Box>
        </Typography>

        {/* Features Area */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Left Feature */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              maxWidth: "280px",
              position: "relative",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: 2,
                width: "260px",
              }}
            >
              <AvatarGroup max={4}>
                {dummyAvatars.map((avatar, index) => (
                  <Avatar
                    key={index}
                    sx={{ width: 60, height: 60 }}
                    src={avatar}
                  />
                ))}
              </AvatarGroup>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#1a1a47",
                  fontSize: "2.05rem",
                  mb: 0.5,
                  fontFamily: "cursive",
                }}
              >
                90% Feels Like
              </Typography>
              <Typography
                sx={{
                  color: "#ff8a00",
                  fontWeight: 300,
                  fontSize: "1.9rem",
                  fontFamily: "cursive",
                }}
              >
                Human Voice
              </Typography>
            </Paper>

            <Box
              sx={{
                position: "relative",
                width: 100,
                height: 200,
                display: { xs: "none", md: "block" },
                ml: 10,
                "&::after": {
                  content: '""',
                  mt: -15,
                  zIndex: -1,
                  position: "absolute",
                  right: "0",
                  top: "100px",
                  width: "100px",
                  height: "100px",
                  border: "2px solid #ddd",
                  borderTop: "none",
                  borderRight: "none",
                  borderRadius: "0 0 0 50px",
                },
                "& .vertical": {
                  position: "absolute",
                  right: "0",
                  mt: -15,
                  top: "200px",
                  width: "2px",
                  height: "100px",
                  backgroundColor: "#ddd",
                },
              }}
            >
              <Box className="vertical" />
            </Box>
            <Box
              sx={{
                my: 3,
                mt: -2,
                ml: "102px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  justifyContent: { xs: "center", md: "flex-end" },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "#4caf50",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    mr: 2,
                  }}
                >
                  <ArrowUpwardIcon />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    fontSize: "3rem",
                    color: "#333",
                    fontFamily: "cursive",
                  }}
                >
                  89%
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "#555",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                More Efficient &<br />
                Effective
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              position: "relative",
              flex: 1,
              my: 3,
              maxWidth: { xs: "80%", md: "40%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 300,
                height: 400,
                perspective: "1000px",
                marginRight: "100px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "120%",
                  height: "120%",
                  background: "linear-gradient(135deg, #E3F2FD, #90CAF9)",
                  borderRadius: "30px",
                  transform: "rotateY(10deg)",
                  boxShadow: "20px 20px 50px rgba(0,0,0,0.15)",
                }}
              />
              <Box
                sx={{ position: "relative", width: "300px", height: "400px" }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#f5f5f7",
                    ml: "100px",
                    mt: "36px",
                    borderRadius: "20px",
                    padding: "20px",
                    boxSizing: "border-box",
                    fontFamily: "'Roboto', 'Arial', sans-serif",
                    zIndex: 1,
                    overflow: "hidden",
                  }}
                >
                  {/* Header */}
                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Box
                      sx={{
                        display: "inline-block",
                        bgcolor: "white",
                        borderRadius: "18px",
                        px: 2,
                        py: 1,
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                        AI assistant
                      </Typography>
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "cursive",
                        mb: 1,
                        background: "linear-gradient(135deg, black, #9c27b0)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        "& .purple": { color: "#9c27b0" },
                      }}
                    >
                      Greetings, <span className="purple">human!</span>
                      <br />
                      How may I <span className="purple">assist you</span>
                      <br />
                      today?
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "initial",
                      mb: 1,
                      overflow: "hidden",
                      height: "40px",
                      width: "600px",
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={
                        <Box
                          sx={{
                            bgcolor: "#f8e6ff",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 1,
                            width: 25,
                            height: 25,
                          }}
                        >
                          <EmailOutlinedIcon
                            sx={{ color: "#9c27b0", fontSize: "13px" }}
                          />
                        </Box>
                      }
                      sx={{
                        bgcolor: "#ffffff",
                        color: "#9c27b0",
                        border: "1px solid rgb(241, 116, 255)",
                        borderRadius: "13px",
                        mr: 0.5,
                        textTransform: "none",
                        fontSize: "10px",
                        boxShadow: "none",
                        "&:hover": { bgcolor: "#f0d4ff", boxShadow: "none" },
                      }}
                    >
                      <span style={{ color: "black" }}>Write an </span> &nbsp;
                      <span style={{ color: "#9c27b0" }}>email</span>
                    </Button>

                    <Button
                      variant="contained"
                      startIcon={
                        <Box
                          sx={{
                            bgcolor: "rgb(0, 191, 255)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 1,
                            width: 25,
                            height: 25,
                          }}
                        >
                          <EmojiEmotionsOutlinedIcon
                            sx={{ color: "#ffffff", fontSize: "13px" }}
                          />
                        </Box>
                      }
                      sx={{
                        bgcolor: "#ffffff",
                        color: "#2196f3",
                        border: "1px solid rgb(0, 191, 255)",
                        borderRadius: "13px",
                        mr: 0.5,
                        textTransform: "none",
                        fontSize: "10px",
                        boxShadow: "none",
                      }}
                    >
                      <span style={{ color: "black" }}>Tell me a </span> &nbsp;
                      <span style={{ color: "#2196f3" }}>fun</span>
                    </Button>

                    <Button
                      variant="contained"
                      startIcon={
                        <Box
                          sx={{
                            bgcolor: "rgb(116, 255, 158)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 1,
                            width: 25,
                            height: 25,
                          }}
                        >
                          <LightbulbOutlinedIcon
                            sx={{ color: "#ffffff", fontSize: "13px" }}
                          />
                        </Box>
                      }
                      sx={{
                        bgcolor: "#ffffff",
                        color: "#2196f3",
                        border: "1px solid rgb(116, 255, 158)",
                        borderRadius: "13px",
                        mr: 0.5,
                        textTransform: "none",
                        fontSize: "10px",
                        boxShadow: "none",
                      }}
                    >
                      <span style={{ color: "black" }}>Give me </span> &nbsp;
                      <span style={{ color: "#2196f3" }}>Ideas</span>
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "initial",
                      mb: 1,
                      ml: -4,
                      overflow: "hidden",
                      height: "40px",
                      width: "600px",
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={
                        <Box
                          sx={{
                            bgcolor: "#f8e6ff",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 1,
                            width: 25,
                            height: 25,
                          }}
                        >
                          <QuizOutlinedIcon
                            sx={{ color: "#9c27b0", fontSize: "13px" }}
                          />
                        </Box>
                      }
                      sx={{
                        bgcolor: "#ffffff",
                        color: "#9c27b0",
                        border: "1px solid rgb(241, 116, 255)",
                        borderRadius: "13px",
                        mr: 0.5,
                        textTransform: "none",
                        fontSize: "10px",
                        boxShadow: "none",
                        "&:hover": { bgcolor: "#f0d4ff", boxShadow: "none" },
                      }}
                    >
                      <span style={{ color: "black" }}>Help me out from</span>{" "}
                      &nbsp;
                      <span style={{ color: "#9c27b0" }}>attendance</span>
                    </Button>

                    <Button
                      variant="contained"
                      startIcon={
                        <Box
                          sx={{
                            bgcolor: "rgb(255, 222, 9)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 1,
                            width: 25,
                            height: 25,
                          }}
                        >
                          <FlightOutlinedIcon
                            sx={{ color: "#ffffff", fontSize: "13px" }}
                          />
                        </Box>
                      }
                      sx={{
                        bgcolor: "#ffffff",
                        color: "#2196f3",
                        border: "1px solid rgb(255, 222, 9)",
                        borderRadius: "13px",
                        mr: 0.5,
                        textTransform: "none",
                        fontSize: "10px",
                        boxShadow: "none",
                      }}
                    >
                      <span style={{ color: "black" }}>Schedule </span> &nbsp;
                      <span style={{ color: "rgb(134, 118, 14)" }}>
                        leave dates
                      </span>
                    </Button>

                    <Button
                      variant="contained"
                      startIcon={
                        <Box
                          sx={{
                            bgcolor: "rgb(116, 255, 158)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 1,
                            width: 25,
                            height: 25,
                          }}
                        >
                          <EmojiEmotionsOutlinedIcon
                            sx={{ color: "#ffffff", fontSize: "13px" }}
                          />
                        </Box>
                      }
                      sx={{
                        bgcolor: "#ffffff",
                        color: "#2196f3",
                        border: "1px solid rgb(116, 255, 158)",
                        borderRadius: "13px",
                        mr: 0.5,
                        textTransform: "none",
                        fontSize: "10px",
                        boxShadow: "none",
                      }}
                    >
                      <span style={{ color: "black" }}>Give me </span> &nbsp;
                      <span style={{ color: "#2196f3" }}>Ideas</span>
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "initial",
                      mb: 1,
                      overflow: "hidden",
                      height: "40px",
                      width: "600px",
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={
                        <Box
                          sx={{
                            bgcolor: "#d4f8d4",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 1,
                            width: 25,
                            height: 25,
                          }}
                        >
                          <ChatBubbleOutlineOutlinedIcon
                            sx={{ color: "#2e7d32", fontSize: "13px" }}
                          />
                        </Box>
                      }
                      sx={{
                        bgcolor: "#ffffff",
                        color: "#2e7d32",
                        border: "1px solid #66bb6a",
                        borderRadius: "13px",
                        mr: 0.5,
                        textTransform: "none",
                        fontSize: "10px",
                        boxShadow: "none",
                        "&:hover": { bgcolor: "#c8e6c9", boxShadow: "none" },
                      }}
                    >
                      <span style={{ color: "black" }}>Mark </span> &nbsp;
                      <span style={{ color: "#2e7d32" }}>Attendance</span>
                    </Button>

                    <Button
                      variant="contained"
                      startIcon={
                        <Box
                          sx={{
                            bgcolor: "#bbdefb",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 1,
                            width: 25,
                            height: 25,
                          }}
                        >
                          <SchoolOutlinedIcon
                            sx={{ color: "#1e88e5", fontSize: "13px" }}
                          />
                        </Box>
                      }
                      sx={{
                        bgcolor: "#ffffff",
                        color: "#1e88e5",
                        border: "1px solid #64b5f6",
                        borderRadius: "13px",
                        mr: 0.5,
                        textTransform: "none",
                        fontSize: "10px",
                        boxShadow: "none",
                      }}
                    >
                      <span style={{ color: "black" }}>View </span> &nbsp;
                      <span style={{ color: "#1e88e5" }}>Timetable</span>
                    </Button>

                    <Button
                      variant="contained"
                      startIcon={
                        <Box
                          sx={{
                            bgcolor: "#ffe0b2",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 1,
                            width: 25,
                            height: 25,
                          }}
                        >
                          <BarChartOutlinedIcon
                            sx={{ color: "#f57c00", fontSize: "13px" }}
                          />
                        </Box>
                      }
                      sx={{
                        bgcolor: "#ffffff",
                        color: "#f57c00",
                        border: "1px solid #ff9800",
                        borderRadius: "13px",
                        mr: 0.5,
                        textTransform: "none",
                        fontSize: "10px",
                        boxShadow: "none",
                      }}
                    >
                      <span style={{ color: "black" }}>Check </span> &nbsp;
                      <span style={{ color: "#f57c00" }}>Stats</span>
                    </Button>
                  </Box>

                  {/* Input Field */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "20px",
                      left: "20px",
                      right: "20px",
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "white",
                      borderRadius: "25px",
                      px: 2,
                      py: 1,
                    }}
                  >
                    <InputBase
                      placeholder="Message AI assistant"
                      sx={{ flex: 1, fontSize: "14px" }}
                    />
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #a64dff, #3399ff)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MicIcon sx={{ color: "white", fontSize: 20 }} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right Feature */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: { xs: "center", md: "right" },
              alignItems: { xs: "center", md: "flex-end" },
              maxWidth: 300,
              position: "relative",
            }}
          >
            <Paper
              sx={{
                mb: 2,
                p: 1,
                borderRadius: 2,
                px: 2,
                height: "80px",
                width: "250px",
              }}
            >
              <Box
                component="span"
                sx={{
                  bgcolor: "rgba(255, 138, 0, 0.1)",
                  width: 44,
                  height: 44,
                  padding: -22,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                🔥
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontWeight: 400,
                    mr: 1,
                    fontFamily: "cursive",
                    fontSize: "1.35rem",
                  }}
                >
                  Powered by GPT 4
                </Typography>
              </Box>
            </Paper>
            <Box
              sx={{
                position: "relative",
                width: 100,
                height: 200,
                ml: -20,
                mr: "200px",
                display: { xs: "none", md: "block" },
                "&::after": {
                  content: '""',
                  mt: -15,
                  zIndex: -1,
                  position: "absolute",
                  left: "0", // Move to the left instead of right
                  top: "100px",
                  width: "100px",
                  height: "100px",
                  border: "2px solid #ddd",
                  borderTop: "none",
                  borderLeft: "none", // Swap right with left
                  borderRadius: "0 0 50px 0", // Reverse the bend
                },
                "& .vertical": {
                  position: "absolute",
                  left: "0", // Move the vertical line to the left
                  mt: -15,
                  top: "200px",
                  width: "2px",
                  height: "100px",
                  backgroundColor: "#ddd",
                },
              }}
            >
              <Box className="vertical" />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  textAlign: { xs: "center", md: "left" },
                  color: "#333",
                  fontSize: "1.3rem",
                  lineHeight: 1.6,
                  fontWeight: 600,
                  fontFamily: "cursive",
                }}
              >
                Interacting with artificial intelligence used to feel difficult,
                overwhelming, and a bit robotic.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AIAddComponent;
