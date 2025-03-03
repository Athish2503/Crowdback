import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Components/Authentication/LoginPage";
import Register from "./Components/Authentication/Register";
import Dashboard from "./Components/Dashboard";
import ReportIssue from "./Components/ReportIssue";
import Welcome from "./Components/Welcome";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register setIsFlipped={setIsFlipped} />} />
        <Route path="/login" element={<Login setIsFlipped={setIsFlipped} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/report-issue" element={isAuthenticated ? <ReportIssue /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;