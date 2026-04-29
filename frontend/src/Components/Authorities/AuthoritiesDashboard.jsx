import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Bell, MessageSquare, Clock3, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import AuthoritiesSidebar from "./AuthoritiesSidebar";
import FeedbackManagement from "./FeedbackManagement";
import "react-toastify/dist/ReactToastify.css";

function AuthoritiesDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [feedbackCount, setFeedbackCount] = useState({
    totalFeedback: 0,
    inProgressFeedback: 0,
    completedFeedback: 0,
    resolvedFeedback: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authoritiesToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchFeedbackCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-feedback-count');
        console.log(response.data);
        setFeedbackCount(response.data);
      } catch (error) {
        console.error('Error fetching feedback count:', error);
      }
    };

    fetchFeedbackCount();
    const interval = setInterval(fetchFeedbackCount, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authoritiesToken");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <AuthoritiesSidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
      <div className="flex-1 p-4 lg:p-8">
        {activeTab === "overview" && (
          <>
            <div className="flex justify-between items-center mb-4 lg:mb-8">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Dashboard Overview</h1>
              <div className="flex items-center gap-2 lg:gap-4">
                <Button variant="light" className="flex items-center gap-2">
                  <Bell size={20} />
                  <Badge bg="danger">3</Badge>
                </Button>
              </div>
            </div>
            <Row className="mb-4 lg:mb-8">
              <Col xs={12} md={4} className="mb-4 md:mb-0">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-700">Total Feedback</h3>
                      <MessageSquare className="text-blue-500" size={24} />
                    </div>
                    <h4 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{feedbackCount.totalFeedback}</h4>
                    <p className="text-sm text-green-600">+12% from last month</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} className="mb-4 md:mb-0">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-700">In Progress</h3>
                      <Clock3 className="text-blue-500" size={24} />
                    </div>
                    <h4 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{feedbackCount.inProgressFeedback}</h4>
                    <p className="text-sm text-green-600">Average response time: 2.5 hours</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-700">Resolved</h3>
                      <Users className="text-blue-500" size={24} />
                    </div>
                    <h4 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{feedbackCount.resolvedFeedback}</h4>
                    <p className="text-sm text-green-600">+8% from last month</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
        {activeTab === "feedback" && <FeedbackManagement />}
      </div>
      <ToastContainer />
    </div>
  );
}

export default AuthoritiesDashboard;