import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          Copyright © {new Date().getFullYear()}, <strong>Student Management System</strong>.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
