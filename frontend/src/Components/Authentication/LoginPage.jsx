import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = ({ setIsFlipped }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/user-home");
      }, 2000);
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-h-screen">
      <Card className="shadow-lg p-4 w-96">
        <Card.Body>
          <h2 className="text-center text-2xl font-bold">Log in</h2>
          <p className="text-center text-gray-500">Log in with your email and password.</p>
          <Form onSubmit={handleSubmit} className="mt-3">
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

            {error && <p className="text-danger">{error}</p>}

            <Button variant="success" type="submit" className="w-100">
              Log in
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <Link to="/register" onClick={() => setIsFlipped(false)} className="text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default LoginPage;