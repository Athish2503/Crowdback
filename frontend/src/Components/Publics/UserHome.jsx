import { useState, useEffect } from "react";
import { Card, Badge, Image, Button } from "react-bootstrap"; // Ensure Button is imported
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Publics/Sidebar";
import "./UserHome.css";

export default function UserHome() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [feedbackData, setFeedbackData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get-feedback");
        console.log("Fetched feedback data:", response.data); // Debugging log
        setFeedbackData(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  const filteredFeedback =
    activeFilter === "All" ? feedbackData : feedbackData.filter((item) => item.mode === activeFilter);

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
      <div className="flex-grow-1 p-4">
        <h1 className="fs-4 fw-bold mb-4">Transportation Feedback</h1>
        <div className="mb-3">
          {["All", "Bus", "Subway", "Train"].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "primary" : "outline-primary"}
              onClick={() => setActiveFilter(filter)}
              className="me-2"
            >
              {filter}
            </Button>
          ))}
        </div>
        <div className="row">
          {filteredFeedback.map((feedback) => (
            <div key={feedback._id} className="col-md-4 mb-4">
              <Card className="shadow-sm">
                <Image src={`http://localhost:5000${feedback.image}`} alt={feedback.title} fluid className="card-img-top fixed-img" />
                <Card.Body>
                  <Card.Title>{feedback.title}</Card.Title>
                  <Card.Subtitle className="text-muted small mb-2">{new Date(feedback.date).toLocaleDateString()}</Card.Subtitle>
                  <Card.Text>
                    <strong>Location:</strong> {feedback.location}
                  </Card.Text>
                  <Card.Text>
                    <strong>Type:</strong> {feedback.type}
                  </Card.Text>
                  <Card.Text>{feedback.description}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <Badge bg="secondary">{feedback.mode}</Badge>
                  <div className="d-flex align-items-center">
                    <span className="me-2">{feedback.reporter}</span>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}