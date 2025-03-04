import { useState } from "react";
import { Row, Col, Card, Button, Nav, Table, Badge } from "react-bootstrap";
import {
  BarChart3,
  MessageSquare,
  Clock,
  Users,
  Bell,
  Settings,
  LogOut,
  AlertCircle,
  CheckCircle,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthoritiesDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Sample data for demonstration
  const recentFeedback = [
    { id: 1, type: "Issue", status: "Urgent", message: "Bus delay on Route 42", time: "5m ago" },
    { id: 2, type: "Suggestion", status: "New", message: "Add more buses during peak hours", time: "15m ago" },
    { id: 3, type: "Complaint", status: "In Progress", message: "AC not working in bus #123", time: "1h ago" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authoritiesToken");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white shadow-lg fixed lg:relative h-full lg:h-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Authority Dashboard</h2>
        </div>
        <Nav className="flex-column p-4">
          <Nav.Link
            className={`mb-3 flex items-center gap-2 ${activeTab === "overview" ? "text-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("overview")}
          >
            <BarChart3 size={20} /> Overview
          </Nav.Link>
          <Nav.Link
            className={`mb-3 flex items-center gap-2 ${activeTab === "feedback" ? "text-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("feedback")}
          >
            <MessageSquare size={20} /> Feedback Management
          </Nav.Link>
          <Nav.Link
            className={`mb-3 flex items-center gap-2 ${activeTab === "realtime" ? "text-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("realtime")}
          >
            <Clock size={20} /> Real-time Reports
          </Nav.Link>
          <Nav.Link
            className={`mb-3 flex items-center gap-2 ${activeTab === "users" ? "text-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={20} /> User Management
          </Nav.Link>
          <hr className="my-4" />
          <Nav.Link className="mb-3 flex items-center gap-2 text-gray-600">
            <Settings size={20} /> Settings
          </Nav.Link>
          <Nav.Link className="mb-3 flex items-center gap-2 text-gray-600" onClick={handleLogout}>
            <LogOut size={20} /> Logout
          </Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-0 lg:ml-64">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <Button variant="light" className="flex items-center gap-2">
              <Bell size={20} />
              <Badge bg="danger">3</Badge>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <Row className="mb-8">
          <Col md={4} className="mb-4 md:mb-0">
            <Card className="h-100">
              <Card.Body>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Total Feedback</h3>
                  <MessageSquare className="text-blue-500" size={24} />
                </div>
                <h4 className="text-3xl font-bold text-gray-900 mb-2">1,234</h4>
                <p className="text-sm text-green-600">+12% from last month</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4 md:mb-0">
            <Card className="h-100">
              <Card.Body>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Response Rate</h3>
                  <Clock3 className="text-blue-500" size={24} />
                </div>
                <h4 className="text-3xl font-bold text-gray-900 mb-2">92%</h4>
                <p className="text-sm text-green-600">Average response time: 2.5 hours</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100">
              <Card.Body>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
                  <Users className="text-blue-500" size={24} />
                </div>
                <h4 className="text-3xl font-bold text-gray-900 mb-2">5,678</h4>
                <p className="text-sm text-green-600">+8% from last month</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Feedback Table */}
        <Card className="mb-8">
          <Card.Header className="bg-white">
            <h3 className="text-xl font-semibold text-gray-800">Recent Feedback</h3>
          </Card.Header>
          <Card.Body>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Message</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentFeedback.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>
                      <Badge
                        bg={feedback.type === "Issue" ? "danger" : feedback.type === "Suggestion" ? "info" : "warning"}
                      >
                        {feedback.type}
                      </Badge>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {feedback.status === "Urgent" ? (
                          <AlertCircle size={16} className="text-red-500" />
                        ) : feedback.status === "In Progress" ? (
                          <Clock3 size={16} className="text-yellow-500" />
                        ) : (
                          <CheckCircle size={16} className="text-blue-500" />
                        )}
                        {feedback.status}
                      </div>
                    </td>
                    <td>{feedback.message}</td>
                    <td>{feedback.time}</td>
                    <td>
                      <Button variant="outline-primary" size="sm">
                        Respond
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Quick Actions */}
        <Row>
          <Col md={6}>
            <Card>
              <Card.Header className="bg-white">
                <h3 className="text-xl font-semibold text-gray-800">Quick Actions</h3>
              </Card.Header>
              <Card.Body>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline-primary" className="flex items-center gap-2 justify-center">
                    <MessageSquare size={20} />
                    View All Feedback
                  </Button>
                  <Button variant="outline-success" className="flex items-center gap-2 justify-center">
                    <Clock size={20} />
                    Real-time Reports
                  </Button>
                  <Button variant="outline-info" className="flex items-center gap-2 justify-center">
                    <Users size={20} />
                    Manage Users
                  </Button>
                  <Button variant="outline-secondary" className="flex items-center gap-2 justify-center">
                    <Settings size={20} />
                    System Settings
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AuthoritiesDashboard;