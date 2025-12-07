import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaUserPlus, FaBook, FaClipboardCheck, FaChartBar, FaCalendarAlt } from "react-icons/fa";
import logo from "../../Assets/LogoSttiss.png";
import "./Sidebar.css";

function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const isLandingPage = location.pathname === '/';

  const navItems = [
    { path: '/', icon: <FaHome />, label: 'Home' },
    { path: '/students', icon: <FaUsers />, label: 'Students' },
    { path: '/add-student', icon: <FaUserPlus />, label: 'Add Student' },
    { path: '/subjects', icon: <FaBook />, label: 'Subjects' },
    { path: '/attendance', icon: <FaClipboardCheck />, label: 'Attendance' },
    { path: '/marks', icon: <FaChartBar />, label: 'Marks & Grades' },
    { path: '/calendar', icon: <FaCalendarAlt />, label: 'Calendar' },
  ];

  return (
    <>
      {/* Hamburger Toggle Button - Always visible */}
      <div
        className={`sidebar-trigger ${isLandingPage ? 'landing-style' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className="sidebar-hamburger"
          aria-label="Toggle sidebar"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Sidebar - Shows on hover */}
        <aside className={`sidebar ${isHovered ? 'visible' : ''} ${isLandingPage ? 'landing-mode' : ''}`}>
          {/* Logo Section */}
          <div className="sidebar-header">
            <Link to="/" className="sidebar-logo">
              <img src={logo} alt="SRM Logo" className="sidebar-logo-img" />
              <div className="sidebar-logo-text">
                <h1 className="sidebar-title">SRM</h1>
                <span className="sidebar-subtitle">Student Management</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            <ul className="sidebar-nav-list">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`sidebar-nav-link ${isActive(item.path)}`}
                    onClick={() => setIsHovered(false)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="sidebar-footer">
            <p className="sidebar-version">v1.0.0</p>
            <p className="sidebar-copyright">© 2025 SRM</p>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Sidebar;
