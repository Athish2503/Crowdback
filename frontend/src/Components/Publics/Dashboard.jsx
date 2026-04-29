import React, { useState, useEffect } from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Sidebar from './Sidebar';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [inProgressTickets, setInProgressTickets] = useState(0);
  const [resolvedTickets, setResolvedTickets] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-feedback');
        const ticketsData = response.data;
        setTickets(ticketsData);
        setTotalTickets(ticketsData.length);
        setInProgressTickets(ticketsData.filter(ticket => ticket.status === 'In Progress').length);
        setResolvedTickets(ticketsData.filter(ticket => ticket.status === 'Resolved').length);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar handleLogout={handleLogout} />
      <div className="flex-grow-1 p-4">
        <h1 className="fs-4 fw-bold mb-4">Dashboard</h1>
        <Row className="mb-4">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Total Feedbacks</Card.Title>
                <Card.Text>{totalTickets}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>In Progress</Card.Title>
                <Card.Text>{inProgressTickets}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Resolved</Card.Title>
                <Card.Text>{resolvedTickets}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <h2 className="fs-5 fw-bold mb-4">My Tickets</h2>
        <div className="row">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="col-md-4 mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{ticket.title}</Card.Title>
                  <Card.Subtitle className="text-muted small mb-2">{new Date(ticket.date).toLocaleDateString()}</Card.Subtitle>
                  <Card.Text>
                    <strong>Location:</strong> {ticket.location}
                  </Card.Text>
                  <Card.Text>
                    <strong>Type:</strong> {ticket.type}
                  </Card.Text>
                  <Card.Text>{ticket.description}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <Badge bg={ticket.status === 'In Progress' ? 'warning' : ticket.status === 'Resolved' ? 'success' : 'secondary'}>
                    {ticket.status}
                  </Badge>
                  <div className="d-flex align-items-center">
                    <span className="me-2">{ticket.reporter}</span>
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

export default Dashboard;