import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthoritiesSidebar from './AuthoritiesSidebar';
import CustomToolbar from './CustomToolbar';

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', description: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('event-calendar');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fetch-events', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        // ✅ Ensure date format is correct
        const formattedEvents = response.data.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to load events');
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/events', newEvent, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setEvents([...events, {
        ...response.data,
        start: new Date(response.data.start),
        end: new Date(response.data.end),
      }]);

      setShowModal(false);
      toast.success('Event added successfully');
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('Failed to add event');
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${selectedEvent._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setEvents(events.filter(event => event._id !== selectedEvent._id));
      setShowModal(false);
      toast.success('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

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
      <AuthoritiesSidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
      <Container fluid className="flex-grow-1 p-4">
        <h1 className="text-center mb-4">Event Calendar</h1>
        <Button variant="primary" className="mb-4" onClick={() => setShowModal(true)}>
          Add Event
        </Button>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
          components={{
            toolbar: (props) => <CustomToolbar {...props} />, 
          }}
        />
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent ? 'Event Details' : 'Add Event'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEvent ? (
              <>
                <h4>{selectedEvent.title}</h4>
                <p><strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
                <p><strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
                <p><strong>Description:</strong> {selectedEvent.description || 'No description available'}</p>
              </>
            ) : (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={newEvent.start}
                    onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={newEvent.end}
                    onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            {selectedEvent ? (
              <>
                <Button variant="danger" onClick={handleDeleteEvent}>
                  Delete Event
                </Button>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleAddEvent}>
                  Save Changes
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
        <ToastContainer position="top-right" autoClose={3000} />
      </Container>
    </div>
  );
};

export default EventCalendar;
