import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const CustomToolbar = ({ onNavigate, onView, label }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <ButtonGroup>
        <Button variant="primary" onClick={() => onNavigate('PREV')}>Back</Button>
        <Button variant="primary" onClick={() => onNavigate('TODAY')}>Today</Button>
        <Button variant="primary" onClick={() => onNavigate('NEXT')}>Next</Button>
      </ButtonGroup>
      <span className="h5 mb-0">{label}</span>
      <ButtonGroup>
        <Button variant="primary" onClick={() => onView('month')}>Month</Button>
        <Button variant="primary" onClick={() => onView('week')}>Week</Button>
        <Button variant="primary" onClick={() => onView('day')}>Day</Button>
        <Button variant="primary" onClick={() => onView('agenda')}>Agenda</Button>
      </ButtonGroup>
    </div>
  );
};

export default CustomToolbar;
