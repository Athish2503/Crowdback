import { useState } from "react";
import { Card, Button, Badge, Image } from "react-bootstrap";
import { House, PlusCircle, Ticket, BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const feedbackData = [
  {
    id: 1,
    title: "Broken seat on bus #42",
    image: "/placeholder.svg?height=200&width=400",
    date: "2025-03-01",
    location: "Main Street & 5th Avenue",
    description: "The third seat from the front on the right side is broken and poses a safety hazard.",
    mode: "Bus",
    reporter: "John Doe",
    reporterAvatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Delayed subway service",
    image: "/placeholder.svg?height=200&width=400",
    date: "2025-03-02",
    location: "Central Station",
    description: "The Blue Line has been consistently delayed by 15-20 minutes during morning rush hour.",
    mode: "Subway",
    reporter: "Jane Smith",
    reporterAvatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function UserHome() {
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

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
      {/* Sidebar */}
      <div className="bg-white border-end p-3 d-flex flex-column justify-content-between" style={{ width: "250px" }}>
        <div>
          <h2 className="fs-5 fw-bold mb-4">CrowdBack</h2>
          <div className="nav flex-column">
            <Button variant="light" className="text-start w-100 mb-2">
              <House className="me-2" /> Dashboard
            </Button>
            <Button variant="light" className="text-start w-100 mb-2">
              <PlusCircle className="me-2" /> Report Issue
            </Button>
            <Button variant="light" className="text-start w-100 mb-2">
              <Ticket className="me-2" /> My Ticket Status
            </Button>
          </div>
        </div>
        <div className="border-top pt-3 mt-3">
          <Button variant="light" className="text-start w-100" onClick={handleLogout}>
            <BoxArrowRight className="me-2" /> Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h1 className="fs-4 fw-bold mb-4">Transportation Feedback</h1>
        {/* Filter Buttons */}
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

        {/* Feedback Cards */}
        <div className="row">
          {filteredFeedback.map((feedback) => (
            <div key={feedback.id} className="col-md-4 mb-4">
              <Card className="shadow-sm">
                <Image src={feedback.image || "/placeholder.svg"} alt={feedback.title} fluid className="card-img-top" />
                <Card.Body>
                  <Card.Title>{feedback.title}</Card.Title>
                  <Card.Subtitle className="text-muted small mb-2">{feedback.date}</Card.Subtitle>
                  <Card.Text>
                    <strong>Location:</strong> {feedback.location}
                  </Card.Text>
                  <Card.Text>{feedback.description}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <Badge bg="secondary">{feedback.mode}</Badge>
                  <div className="d-flex align-items-center">
                    <span className="me-2">{feedback.reporter}</span>
                    <Image src={feedback.reporterAvatar} roundedCircle width={30} height={30} />
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