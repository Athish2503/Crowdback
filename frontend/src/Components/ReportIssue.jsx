import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Publics/Sidebar"; // Ensure the correct import path

export default function ReportIssue() {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    location: "",
    description: "",
    mode: "",
    reporter: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post("http://localhost:5000/api/post-feedback", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Issue reported successfully!");
      setTimeout(() => {
        navigate("/user-home");
      }, 2000);
    } catch (error) {
      toast.error("Failed to report issue. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar handleLogout={handleLogout} /> {/* Use the Sidebar component */}
      <Container fluid className="flex-grow-1 p-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center mb-4">Report an Issue</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mode</Form.Label>
                <Form.Control
                  type="text"
                  name="mode"
                  placeholder="Enter mode (e.g., Bus, Subway)"
                  value={formData.mode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Reporter Name</Form.Label>
                <Form.Control
                  type="text"
                  name="reporter"
                  placeholder="Enter your name"
                  value={formData.reporter}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}