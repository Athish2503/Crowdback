import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { AlertCircle, CheckCircle, Clock3 } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthoritiesSidebar from './AuthoritiesSidebar'; // Import AuthoritiesSidebar
import './FeedbackManagement.css'; // Import custom CSS for additional styling

const FeedbackManagement = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({ email: "", subject: "", message: "" });
  const [activeTab, setActiveTab] = useState('feedback'); // Set the active tab for the sidebar

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
      const response = await axios.post("http://localhost:5000/api/send-email", emailData);
      toast.success("Email sent successfully!");
      setShowEmailModal(false);
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
    }
  };

  const openEmailModal = (feedback) => {
    setEmailData({
      email: feedback.email,
      subject: `Regarding your feedback: ${feedback.title}`,
      message: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { margin: 20px; }
    .header { font-size: 18px; font-weight: bold; }
    .details { margin-top: 10px; }
    .details p { margin: 5px 0; }
    .footer { margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <p>Dear ${feedback.reporter},</p>
    <p>We have received your feedback regarding "<strong>${feedback.title}</strong>".</p>
    <div class="details">
      <p><strong>Feedback Details:</strong></p>
      <p>Ticket ID: ${feedback._id}</p>
      <p>Type: ${feedback.type}</p>
      <p>Status: ${feedback.status}</p>
      <p>Description: ${feedback.description}</p>
      <p>Date: ${new Date(feedback.date).toLocaleDateString()}</p>
    </div>
    <p>Thank you for your valuable input. We will review your feedback and take the necessary actions.</p>
    <div class="footer">
      <p>Best regards,</p>
      <p>Your Team</p>
    </div>
  </div>
</body>
</html>`
    });
    setShowEmailModal(true);
  };

  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const handleCloseFeedbackModal = () => {
    setSelectedFeedback(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authoritiesToken");
    toast.success("Logged out successfully!");
    setTimeout(() => window.location.href = "/authorities-login", 2000);
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <AuthoritiesSidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
      <div className="flex-grow-1 p-4">
        <div className="feedback-management">
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
                    <tr key={feedback._id} onClick={() => handleFeedbackClick(feedback)}>
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
                          ) : feedback.status === "Resolved" ? (
                            <CheckCircle size={16} className="text-green-500" />
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
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(feedback._id, "In Progress"); }}
                        >
                          In Progress
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(feedback._id, "Urgent"); }}
                          className="ml-2"
                        >
                          Urgent
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(feedback._id, "New"); }}
                          className="ml-2"
                        >
                          New
                        </Button>
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); openEmailModal(feedback); }}
                          className="ml-2"
                        >
                          Email
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(feedback._id, "Resolved"); }}
                          className="ml-2"
                        >
                          Resolved
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {selectedFeedback && (
            <Modal show={true} onHide={handleCloseFeedbackModal}>
              <Modal.Header closeButton>
                <Modal.Title>Feedback Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p><strong>Type:</strong> {selectedFeedback.type}</p>
                <p><strong>Status:</strong> {selectedFeedback.status}</p>
                <p><strong>Message:</strong> {selectedFeedback.description}</p>
                <p><strong>Time:</strong> {new Date(selectedFeedback.date).toLocaleString()}</p>
                {selectedFeedback.image && (
                  <div>
                    <strong>Image:</strong>
                    <img src={`http://localhost:5000${selectedFeedback.image}`} alt="Feedback" className="img-fluid mt-2" />
                  </div>
                )}
                <div className="mt-4">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleStatusChange(selectedFeedback._id, "In Progress")}
                  >
                    In Progress
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleStatusChange(selectedFeedback._id, "Urgent")}
                    className="ml-2"
                  >
                    Urgent
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleStatusChange(selectedFeedback._id, "New")}
                    className="ml-2"
                  >
                    New
                  </Button>
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => openEmailModal(selectedFeedback)}
                    className="ml-2"
                  >
                    Email
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleStatusChange(selectedFeedback._id, "Resolved")}
                    className="ml-2"
                  >
                    Resolved
                  </Button>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseFeedbackModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}

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
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default FeedbackManagement;