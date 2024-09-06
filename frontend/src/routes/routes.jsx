import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import StudentDashboard from "../pages/StudentDashboard";
import CareerGuidanceAI from "../pages/CareerGuidanceAI";
import React from "react";

export function HomeRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/ai" element={<CareerGuidanceAI />} />
      </Routes>
    </Router>
  );
}
