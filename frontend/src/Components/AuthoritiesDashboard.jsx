import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Nav, Table, Badge, Modal, Form } from "react-bootstrap";
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
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function AuthoritiesDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [feedbackData, setFeedbackData] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({ email: "", subject: "", message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("authoritiesToken");
        const response = await axios.get("http://localhost:5000/api/get-feedback", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbackData(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };    

    fetchFeedback();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authoritiesToken");
    if (!token) {
      navigate("/");
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("authoritiesToken");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put("http://localhost:5000/api/update-feedback-status", { id, status });
      setFeedbackData((prevData) =>
        prevData.map((feedback) => (feedback._id === id ? { ...feedback, status } : feedback))
      );
      toast.success("Status updated successfully!");
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleSendEmail = async () => {
    try {
      console.log("Sending email with data:", emailData);
      const response = await axios.post("http://localhost:5000/api/send-email", emailData);
      console.log("Email response:", response.data);
      toast.success("Email sent successfully!");
      setShowEmailModal(false);
    } catch (error) {
      console.error("Error sending email:", error.response ? error.response.data : error.message);
      toast.error("Failed to send email. Please try again.");
    }
  };
  

  const openEmailModal = (email) => {
    setEmailData({ ...emailData, email });
    setShowEmailModal(true);
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
        {activeTab === "overview" && (
          <>
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
          </>
        )}

        {activeTab === "feedback" && (
          <>
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
                    {feedbackData.map((feedback) => (
                      <tr key={feedback._id}>
                        <td>
                          <Badge
                            bg={feedback.type === "issue" ? "danger" : feedback.type === "suggestion" ? "info" : "warning"}
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
                        <td>{feedback.description}</td>
                        <td>{new Date(feedback.date).toLocaleString()}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleStatusChange(feedback._id, "In Progress")}
                          >
                            In Progress
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleStatusChange(feedback._id, "Urgent")}
                            className="ml-2"
                          >
                            Urgent
                          </Button>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => handleStatusChange(feedback._id, "New")}
                            className="ml-2"
                          >
                            New
                          </Button>
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => openEmailModal(feedback.email)}
                            className="ml-2"
                          >
                            Email
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </>
        )}

        {/* Email Modal */}
        <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Send Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={emailData.email}
                  onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={emailData.message}
                  onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEmailModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSendEmail}>
              Send Email
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AuthoritiesDashboard;