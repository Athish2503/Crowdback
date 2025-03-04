import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./LoginPage";

const Register = ({ setIsFlipped }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });
      toast.success("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-h-screen">
      <Card className="shadow-lg p-4 w-96">
        <Card.Body>
          <h2 className="text-center text-2xl font-bold">Sign up</h2>
          <p className="text-center text-gray-500">Create a free account with your email.</p>
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Button variant="success" type="submit" className="w-100">
              Sign up
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <Link to="/login" onClick={() => setIsFlipped(true)} className="text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default Register;