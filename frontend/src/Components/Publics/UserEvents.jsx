import React, { useState, useEffect } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from './Sidebar'; // Import Sidebar

const localizer = momentLocalizer(moment);

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fetch-events', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEvents(response.data.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        })));
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to load events');
      }
    };
    fetchEvents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => window.location.href = "/", 2000);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar handleLogout={handleLogout} />
      <Container fluid className="flex-grow-1 p-4">
        <h1 className="text-center mb-4">Upcoming Events</h1>
        {events.length === 0 ? (
          <p className="text-center">There are no events right now.</p>
        ) : (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={handleSelectEvent}
            views={['month', 'week', 'day', 'agenda']}
            popup
          />
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </Container>

      {selectedEvent && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Event Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{selectedEvent.title}</h4>
            <p><strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
            <p><strong>Description:</strong> {selectedEvent.description || 'No description available'}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UserEvents;