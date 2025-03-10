import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { BarChart3, MessageSquare, Calendar, Users, Settings, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthoritiesSidebar = ({ activeTab, setActiveTab, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 bg-blue-600 text-white p-2 rounded-md shadow-md z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:relative lg:translate-x-0 lg:flex lg:flex-col h-full z-40`}
      >
        {/* Sidebar Header */}
        <div className="p-5 bg-blue-700 text-white flex items-center justify-between rounded-b-lg shadow-md">
          <h2 className="text-lg font-semibold">Authority Dashboard</h2>
          <button className="lg:hidden text-white" onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <Nav className="flex flex-col flex-grow p-4">
          {[
            { key: "authorities-dashboard", label: "Overview", icon: BarChart3 }, // Update key to match route
            { key: "feedback", label: "Feedback Management", icon: MessageSquare },
            { key: "event-calendar", label: "Event Calendar", icon: Calendar },
            { key: "users", label: "User Management", icon: Users },
          ].map(({ key, label, icon: Icon }) => (
            <Nav.Link
              key={key}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 font-medium ${
                activeTab === key
                  ? "bg-blue-600 text-black shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"
              }`}
              onClick={() => {
                setActiveTab(key);
                setIsOpen(false); // Close menu on selection
                navigate(`/${key}`);
              }}
            >
              <Icon size={22} />
              <span>{label}</span>
            </Nav.Link>
          ))}

          <hr className="my-4 border-gray-300" />

          {/* Settings & Logout */}
          <Nav.Link className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:shadow-sm transition">
            <Settings size={22} />
            <span>Settings</span>
          </Nav.Link>

          <Nav.Link
            className="flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-300 font-medium mt-auto"
            onClick={handleLogout}
          >
            <LogOut size={22} />
            <span>Logout</span>
          </Nav.Link>
        </Nav>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AuthoritiesSidebar;