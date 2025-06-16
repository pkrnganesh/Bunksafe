import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Chip,
  Checkbox,
  FormControlLabel,
  Grid,
  Tooltip,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Coffee, Code } from "@mui/icons-material";

const JoinTeamUI = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    description: "",
    expertise: [],
    services: [],
    categories: [],
  });

  const services = [
    {
      title: "Workshops & analysis",
      description:
        "This is a standard part of every project. It allows us to onboard and provide most value.",
    },
    {
      title: "User research",
      description:
        "When you want to test your hypotheses or product live with real users.",
    },
    {
      title: "User experience design",
      description:
        "When you want to solve your user's problems and create an engaging experience.",
    },
  ];

  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [selectedStatements, setSelectedStatements] = React.useState([]);

  const categories = [
    "Technology",
    "HR-Tech",
    "CRM",
    "Automation",
    "Developer tools",
    "Operations",
    "Data Analytics",
    "Sales",
    "Project Management",
    "Finance",
  ];

  const [errors, setErrors] = useState({});

  // Fun validation messages
  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Even superheroes need emails! 📧";
        if (!/\S+@\S+\.\S+/.test(value))
          return "This email looks like it's wearing a disguise! 🎭";
        return "";
      case "description":
        if (!value)
          return "Tell us your story! Even Batman had an origin story 🦇";
        if (value.length < 10)
          return "A bit shy? We need more than a tweet! 🐤";
        return "";
      case "codeName":
        if (!value) return "Every legend needs a code name! 🦸‍♂️";
        return "";
      case "superpower":
        if (!value) return "Don't be modest, everyone has a superpower! ✨";
        return "";
      case "favLanguage":
        if (!value) return "Python? JavaScript? Binary? We won't judge! 🤖";
        return "";
      case "coffeePerDay":
        if (value && isNaN(value))
          return "That's not a number... had too much coffee? ☕";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleStatement = (statement) => {
    setSelectedStatements((prev) => {
      if (prev.includes(statement)) {
        return prev.filter((s) => s !== statement);
      }
      if (prev.length < 3) {
        return [...prev, statement];
      }
      return prev; // Prevent selecting more than three
    });
  };

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 1));

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <Box
            sx={{
              minWidth: "500px",
              mb: -10,
            }}
          >
            

            <Typography
              variant="h4"
              sx={{
                color: "#1E293B",
                fontWeight: 600,
                fontSize: "28px",
                mb: 2,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Tell us about yourself
            </Typography>

            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 3 }}
              InputProps={{
                placeholder: "bruce.wayne@wayne.enterprises",
              }}
            />

            <TextField
              fullWidth
              label="Your Origin Story"
              name="description"
              multiline
              rows={7}
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              sx={{ mb: 3 }}
              InputProps={{
                placeholder: "Once upon a time, in a coffee-filled room...",
              }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Tooltip title="What makes you unique?">
                <TextField
                  fullWidth
                  label="Superpower"
                  name="superpower"
                  value={formData.superpower}
                  onChange={handleChange}
                  error={!!errors.superpower}
                  helperText={errors.superpower}
                  InputProps={{
                    startAdornment: (
                      <Code sx={{ mr: 1, color: "action.active" }} />
                    ),
                  }}
                />
              </Tooltip>

              <Tooltip title="Fuel measurement is important!">
                <TextField
                  fullWidth
                  label="Coffee Cups Per Day"
                  name="coffeePerDay"
                  type="number"
                  value={formData.coffeePerDay}
                  onChange={handleChange}
                  error={!!errors.coffeePerDay}
                  helperText={errors.coffeePerDay}
                  InputProps={{
                    startAdornment: (
                      <Coffee sx={{ mr: 1, color: "action.active" }} />
                    ),
                    inputProps: { min: 0, max: 99 },
                  }}
                />
              </Tooltip>
            </Box>

            {Object.values(errors).some((error) => error) && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Almost there! Fix these tiny glitches and you'll be ready to
                join the team! 🚀
              </Alert>
            )}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ minWidth: "500px", mb: -15 }}>
           

            <Typography
              variant="h4"
              sx={{
                color: "#1E293B",
                fontWeight: 600,
                fontSize: "28px",
                mb: 2,
                fontFamily: "Inter, sans-serif",
              }}
            >
              What services can we support you with?_
            </Typography>

            {services.map((service, idx) => (
              <Box
                key={idx}
                sx={{
                  p: 5,
                  mb: 2,
                  borderRadius: 2,
                  border: "1px solid #E2E8F0",
                  cursor: "pointer",
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",

                  "&:hover": { borderColor: "#0EA5E9" },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.services.includes(service.title)}
                      onChange={(e) => {
                        const newServices = e.target.checked
                          ? [...formData.services, service.title]
                          : formData.services.filter(
                              (s) => s !== service.title
                            );
                        setFormData({ ...formData, services: newServices });
                      }}
                    />
                  }
                  label={
                    <Box sx={{ ml: 2 }}>
                      <Typography sx={{ mt: 1, mb: 0.5 }}>
                        {service.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {service.description}
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            ))}
          </Box>
        );
      case 3:
        return (
          <Box sx={{ minWidth: "500px" }}>
           

            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontSize: "28px",
                mb: 1,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Tell us about your product_
            </Typography>

            <Typography sx={{ color: "#64748B", mb: 4 }}>
              Select all statements or categories that best describe your
              product. We will suggest additional options based on your answers.
            </Typography>

            {/* Categories Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Which categories best describe your app?
              </Typography>
              <Grid container spacing={1}>
                {categories.map((category) => (
                  <Grid item key={category}>
                    <Chip
                      label={category}
                      onClick={() => toggleCategory(category)}
                      variant={
                        selectedCategories.includes(category)
                          ? "filled"
                          : "outlined"
                      }
                      color={
                        selectedCategories.includes(category)
                          ? "primary"
                          : "default"
                      }
                      sx={{ cursor: "pointer" }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Statements Selection */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Select any statements that are true for your app
              </Typography>
              <Grid container spacing={2}>
                {[0, 1, 2].map((index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Paper
                      onClick={
                        selectedCategories[index]
                          ? () => toggleStatement(selectedCategories[index])
                          : undefined
                      }
                      variant="outlined"
                      sx={{
                        p: 2,
                        textAlign: "center",
                        cursor: selectedCategories[index]
                          ? "pointer"
                          : "default",
                        border: "2px dashed",
                        borderColor: selectedStatements.includes(
                          selectedCategories[index]
                        )
                          ? "primary.main"
                          : "grey.400",
                        backgroundColor: selectedStatements.includes(
                          selectedCategories[index]
                        )
                          ? "primary.light"
                          : "transparent",
                        color: selectedCategories[index]
                          ? "text.primary"
                          : "text.disabled",
                        "&:hover": {
                          borderColor: selectedCategories[index]
                            ? "primary.main"
                            : "grey.400",
                        },
                      }}
                    >
                      {selectedCategories[index] || ""}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        );
      case 4:
        return (
          <Box sx={{ minWidth: "500px" }}>
           
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontSize: "28px",
                mb: 4,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Review your application
            </Typography>
            <Box sx={{ p: 3, border: '1px solid #E2E8F0', borderRadius: 2 }}>
              {/* Thankyou */}
              <Typography variant="h6" gutterBottom> Thank you for applying! </Typography>
              
            </Box>

          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        border: "1px solidrgb(255, 200, 0)",
        borderRadius: 12,
        minHeight: "500px",
        backgroundColor: "#004d40",
      }}
    >
      <Box sx={{ p: 4, width: "50%", minWidth: "500px", mt: 15 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: "black",
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Join the Dream Team! 🚀
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: "text.secondary",
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          We're excited to learn more about you and help you achieve your
          wildest coding dreams!
        </Typography>
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            minWidth: "500px",
            p: 8,
            mt: -2,

            height: "700px",
          }}
        >
          <Box>
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                backgroundColor: "white",
                height: "625px",
                mt: -2,
                mr: -7,
                borderRadius: 12,
                p: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                {activeStep > 1 && (
                  <Button
                    onClick={handleBack}
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      minWidth: "48px",
                      width: "58px",
                      height: "28px",
                      borderRadius: "10%",
                      padding: 0,
                      mt: -2,
                      mr: 2,
                      color: "white",
                      backgroundColor: "#005d40",
                    }}
                  />
                )}
                <Typography
                  variant="p"
                  sx={{
                    fontWeight: 200,
                    fontSize: "18px",
                    mb: 2,

                    color: "#64748B",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Step {activeStep} of 4
                </Typography>
              </Box>
              {renderStepContent()}
              <Button
                onClick={handleNext}
                endIcon={activeStep !== 4 && "Next Step"}
                sx={{
                  minWidth: "98px",
                  borderRadius: "3%",
                  color: "white",
                  padding: 1,
                  backgroundColor: "#004d40",
                  width: "100%",
                  boxShadow: "none",
                  mt: 2,
                  mr: -10,
                  mb: -35,
                  onHover: {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {activeStep === 4 ? "" : ""}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default JoinTeamUI;
