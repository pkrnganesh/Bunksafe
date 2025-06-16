import React from "react";
import { Card, CardContent, Skeleton } from "@mui/material";

const glassStyle = {
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  padding: "24px",
};

const SkeletonCard = ({ height }) => (
  <Card sx={{ ...glassStyle, height }}>
    <CardContent>
      <Skeleton variant="text" width="60%" height={32} />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={height - 80}
        sx={{ mt: 2 }}
      />
    </CardContent>
  </Card>
);

export default SkeletonCard;
