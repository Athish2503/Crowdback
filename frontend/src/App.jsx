import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Components/Authentication/LoginPage";
import Register from "./Components/Authentication/Register";
import AuthoritiesLogin from "./Components/Authentication/AuthoritiesLogin";
import Dashboard from "./Components/Publics/Dashboard";
import AuthoritiesDashboard from "./Components/Authorities/AuthoritiesDashboard";
import FeedbackManagement from "./Components/Authorities/FeedbackManagement"; // Import FeedbackManagement
import ReportIssue from "./Components/Publics/ReportIssue";
import Welcome from "./Components/Welcome";
import UserHome from "./Components/Publics/UserHome";
import TicketStatus from "./Components/Publics/TicketStatus";
import UserProfile from "./Components/Publics/UserProfile";
import EventCalendar from "./Components/Authorities/EventCalendar";
import UserEvents from "./Components/Publics/UserEvents";

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
        <Route path="/feedback" element={<FeedbackManagement />} /> {/* Add FeedbackManagement route */}
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/my-ticket-status" element={<TicketStatus />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/event-calendar" element={<EventCalendar />} />
        <Route path="/user-events" element={<UserEvents />} />
      </Routes>
    </Router>
  );
};

export default App;