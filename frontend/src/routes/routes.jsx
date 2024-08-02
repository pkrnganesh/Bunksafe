import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Landing.jsx";
import React from "react";


export function HomeRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
