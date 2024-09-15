// FullWidthBox.js
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const FullWidthBox = styled(Box)(({ theme }) => ({
  width: "100vw",
  position: "relative",
  left: "50%",
  right: "50%",
  marginLeft: "-50vw",
  marginRight: "-50vw",
  marginTop: "-2vh",
  background: "linear-gradient(135deg, #42daf5 0%, #2196f3 100%)",
  overflow: "hidden",
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(20),
}));

export default FullWidthBox;