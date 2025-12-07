import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../Assets/LogoSttiss.png";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  // Check if we're on the landing page for floating header
  const isLandingPage = location.pathname === '/';

  return (
    <header className={`header ${isLandingPage ? 'header-floating' : ''}`}>
      <div className="header-container">
        <Link to="/" className="header-logo" onClick={closeMenu}>
          <img
            className="header-logo-img"
            src={logo}
            alt="SRM Logo"
          />
          <div className="header-logo-text">
            <h1 className="header-title">SRM</h1>
            <span className="header-subtitle">Student Management</span>
          </div>
        </Link>

        <button
          className="header-menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <ul className="header-nav-list">
            <li>
              <Link
                to="/"
                className={`header-nav-link ${isActive('/')}`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/students"
                className={`header-nav-link ${isActive('/students')}`}
                onClick={closeMenu}
              >
                Students
              </Link>
            </li>
            <li>
              <Link
                to="/add-student"
                className={`header-nav-link btn-nav ${isActive('/add-student')}`}
                onClick={closeMenu}
              >
                Add Student
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
