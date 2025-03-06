import React, { useState, useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { HouseDoor, PlusCircle, Ticket, BoxArrowRight, List } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setShow(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const menuItems = [
    { icon: <HouseDoor className="me-2" />, text: "Home", route: "/user-home" },
    { icon: <PlusCircle className="me-2" />, text: "Report Issue", route: "/report-issue" },
    { icon: <Ticket className="me-2" />, text: "My Ticket Status", route: "/my-ticket-status" },
  ];

  const handleNavigation = (route) => {
    navigate(route);
    if (isMobile) {
      handleClose();
    }
  };

  const sidebarContent = (
    <>
      <div>
        <h2 className="fs-5 fw-bold text-center text-primary mb-4">CrowdBack</h2>
        <div className="nav flex-column">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="light"
              className="text-start w-100 mb-2 d-flex align-items-center sidebar-button"
              onClick={() => handleNavigation(item.route)}
            >
              {item.icon} <span className="fs-6">{item.text}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="border-top pt-3 mt-3">
        <Button 
          variant="danger" 
          className="text-start w-100 d-flex align-items-center sidebar-button" 
          onClick={() => {
            handleLogout();
            if (isMobile) handleClose();
          }}
        >
          <BoxArrowRight className="me-2" /> <span className="fs-6">Logout</span>
        </Button>
      </div>
    </>
  );

  // CSS styles for the component
  const sidebarStyle = {
    minWidth: '250px',
    width: '20%',
    maxWidth: '320px',
    height: '100vh',
    position: 'sticky',
    top: 0,
  };
  
  const mobileCanvasStyle = {
    width: '280px',
    maxWidth: '80%'
  };

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <Button 
          variant="primary" 
          className="position-fixed top-0 start-0 m-3 z-3" 
          onClick={handleShow}
          aria-label="Toggle menu"
        >
          <List size={24} />
        </Button>
      )}

      {/* Mobile sidebar (Offcanvas) */}
      {isMobile && (
        <Offcanvas 
          show={show} 
          onHide={handleClose} 
          placement="start" 
          className="sidebar-mobile"
          style={mobileCanvasStyle}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column justify-content-between p-3">
            {sidebarContent}
          </Offcanvas.Body>
        </Offcanvas>
      )}

      {/* Desktop sidebar */}
      {!isMobile && (
        <div 
          className="sidebar bg-white border-end p-3 d-flex flex-column justify-content-between shadow-sm"
          style={sidebarStyle}
        >
          {sidebarContent}
        </div>
      )}

      {/* Add a spacer div to ensure the toggle button doesn't overlap content in mobile view */}
      {isMobile && <div className="pt-5 mt-2"></div>}
    </>
  );
};

export default Sidebar;