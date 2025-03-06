import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Publics/Sidebar";
import Confetti from "react-confetti";

export default function ReportIssue() {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    location: "",
    description: "",
    mode: "",
    reporter: "",
    type: "suggestion",
    email: "",
  });

  const [showConfetti, setShowConfetti] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get-user-data", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const { name, email } = response.data;
        setFormData((prev) => ({ ...prev, reporter: name, email }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === "image" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));

    try {
      await axios.post("http://localhost:5000/api/post-feedback", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Issue reported successfully!");

      // Add points to user profile
      await axios.post("http://localhost:5000/api/add-points", {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success("Points added to your account!");
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
        navigate("/user-home");
      }, 5000);
    } catch {
      toast.error("Failed to report issue. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {showConfetti && <Confetti />}
      <Sidebar handleLogout={handleLogout} />
      <Container fluid className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Card className="p-4 shadow-lg w-100" style={{ maxWidth: "600px", borderRadius: "12px" }}>
          <h2 className="text-center text-primary mb-3">Report an Issue</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="Enter title" value={formData.title} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image (Optional)</Form.Label>
              <Form.Control type="file" name="image" accept="image/*" capture="camera" onChange={handleChange} />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select name="type" value={formData.type} onChange={handleChange} required>
                    <option value="suggestion">Suggestion</option>
                    <option value="feedback">Feedback</option>
                    <option value="issue">Issue</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" name="location" placeholder="Enter location" value={formData.location} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" placeholder="Enter description" value={formData.description} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mode</Form.Label>
              <Form.Control type="text" name="mode" placeholder="Enter mode (e.g., Bus, Subway)" value={formData.mode} onChange={handleChange} required />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Reporter Name</Form.Label>
                  <Form.Control type="text" name="reporter" placeholder="Enter your name" value={formData.reporter} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="w-100">
              Submit Issue
            </Button>
          </Form>
        </Card>
      </Container>
      <ToastContainer />
    </div>
  );
}