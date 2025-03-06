import React, { useState, useEffect } from "react";
import { Card, Badge, Button, Tabs, Tab, Modal, Image } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../Publics/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaClock, FaTools, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const statusIcons = {
  New: <FaClock className="me-2 text-primary" />,
  "In Progress": <FaTools className="me-2 text-warning" />,
  Urgent: <FaExclamationTriangle className="me-2 text-danger" />,
  Resolved: <FaCheckCircle className="me-2 text-success" />,
};

const statusColor = (status) => {
  switch (status) {
    case "New":
      return "primary";
    case "In Progress":
      return "warning";
    case "Urgent":
      return "danger";
    case "Resolved":
      return "success";
    default:
      return "secondary";
  }
};

const TicketStatus = ({ handleLogout }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [key, setKey] = useState("New");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get-feedback", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  const handleShowDetails = (ticket) => setSelectedTicket(ticket);
  const handleClose = () => setSelectedTicket(null);

  const handleDeleteTicket = async (ticketId) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-feedback/${ticketId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
      toast.success("Ticket deleted successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to delete ticket. Please try again.");
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar handleLogout={handleLogout} />
      <div className="flex-grow-1 p-4">
        <h1 className="fs-4 fw-bold mb-4">My Ticket Status</h1>
        <ToastContainer />

        {/* Tabs for Ticket Categories */}
        <Tabs id="ticket-status-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
          {["New", "In Progress", "Urgent", "Resolved"].map((category) => (
            <Tab
              eventKey={category}
              title={
                <span>
                  {statusIcons[category]}
                  {category}
                </span>
              }
              key={category}
            >
              <div className="row">
                {tickets
                  .filter((ticket) => ticket.status === category)
                  .map((ticket) => (
                    <div key={ticket._id} className="col-md-6 mb-3">
                      <Card className="shadow-sm border-0">
                        <Card.Body>
                          <Card.Title className="fw-bold">{ticket.title}</Card.Title>
                          <Card.Subtitle className="text-muted small mb-2">
                            Ticket ID: {ticket._id}
                          </Card.Subtitle>
                          <Badge bg={statusColor(ticket.status)}>{ticket.status}</Badge>
                          <Button
                            variant="primary"
                            className="mt-2 w-100"
                            onClick={() => handleShowDetails(ticket)}
                          >
                            View Details
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
              </div>
            </Tab>
          ))}
        </Tabs>

        {/* Ticket Details Modal */}
        <Modal show={!!selectedTicket} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedTicket?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTicket && (
              <>
                {/* Show Image if Available */}
                {selectedTicket.image && (
                  <Image
                    src={`http://localhost:5000${selectedTicket.image}`}
                    alt="Ticket Attachment"
                    fluid
                    className="mb-3 rounded"
                  />
                )}
                <p>
                  <strong>Ticket ID:</strong> {selectedTicket._id}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(selectedTicket.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Location:</strong> {selectedTicket.location}
                </p>
                <p>
                  <strong>Type:</strong> {selectedTicket.type}
                </p>
                <p>
                  <strong>Description:</strong> {selectedTicket.description}
                </p>
                <p>
                  <strong>Reporter:</strong> {selectedTicket.reporter}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <Badge bg={statusColor(selectedTicket.status)}>{selectedTicket.status}</Badge>
                </p>
                <Button variant="danger" onClick={() => handleDeleteTicket(selectedTicket._id)}>
                  Delete Ticket
                </Button>
              </>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default TicketStatus;