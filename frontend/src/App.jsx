import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Components/Authentication/LoginPage";
import Register from "./Components/Authentication/Register";
import AuthoritiesLogin from "./Components/Authentication/AuthoritiesLogin";
import Dashboard from "./Components/Dashboard";
import AuthoritiesDashboard from "./Components/AuthoritiesDashboard";
import ReportIssue from "./Components/ReportIssue";
import Welcome from "./Components/Welcome";
import UserHome from "./Components/Publics/UserHome";
import TicketStatus from "./Components/Publics/TicketStatus";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthoritiesAuthenticated, setIsAuthoritiesAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }

    const authoritiesToken = localStorage.getItem("authoritiesToken");
    if (authoritiesToken) {
      setIsAuthoritiesAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/authorities-login" element={<AuthoritiesLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/authorities-dashboard" element={<AuthoritiesDashboard />} />
        <Route path="/report-issue" element={<ReportIssue/>} />
        {/* <Route path="/user-home" element={isAuthenticated ? <UserHome /> : <Navigate to="/" />} /> */}
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/my-ticket-status" element={<TicketStatus/>} />
      </Routes>
    </Router>
  );
};

export default App;