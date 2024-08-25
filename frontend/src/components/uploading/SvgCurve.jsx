// SvgCurve.js
import { styled } from "@mui/material/styles";

const SvgCurve = styled("div")({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "150px",
  overflow: "hidden",
  lineHeight: 0,
  transform: "translateY(1px)",
  "& svg": {
    position: "relative",
    display: "block",
    width: "calc(100% + 1.3px)",
    height: "100%",
  },
  "& .shape-fill": {
    fill: "#FFFFFF",
  },
});

export default function SvgCurveComponent() {
  return (
    <SvgCurve>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C150,50 350,0 600,50 C850,100 1050,50 1200,0 L1200,120 L0,120 Z"
          className="shape-fill"
        />
      </svg>
    </SvgCurve>
  );
}