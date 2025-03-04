import React from "react";
import { Button } from "react-bootstrap";
import { House, PlusCircle, Ticket, BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-end p-3 d-flex flex-column justify-content-between" style={{ width: "250px" }}>
      <div>
        <h2 className="fs-5 fw-bold mb-4">CrowdBack</h2>
        <div className="nav flex-column">
          <Button variant="light" className="text-start w-100 mb-2" onClick={() => navigate("/dashboard")}>
            <House className="me-2" /> Dashboard
          </Button>
          <Button variant="light" className="text-start w-100 mb-2" onClick={() => navigate("/report-issue")}>
            <PlusCircle className="me-2" /> Report Issue
          </Button>
          <Button variant="light" className="text-start w-100 mb-2" onClick={() => navigate("/my-ticket-status")}>
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
  );
};

export default Sidebar;