import React from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardCheck, FaPlus } from 'react-icons/fa';
import '../Students/Students.css';

export default function Attendance() {
  return (
    <div className="students-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Attendance Tracking</h1>
          <Link to="/mark-attendance" className="btn btn-primary">
            <FaPlus /> Mark Attendance
          </Link>
        </div>

        <div className="coming-soon-card glass-card">
          <div className="coming-soon-icon">
            <FaClipboardCheck />
          </div>
          <h2>Attendance Management System</h2>
          <p>Track and manage student attendance efficiently. This feature is coming soon!</p>
          <div className="feature-list">
            <div className="feature-item">✓ Mark daily attendance</div>
            <div className="feature-item">✓ View attendance statistics</div>
            <div className="feature-item">✓ Subject-wise attendance tracking</div>
            <div className="feature-item">✓ Generate attendance reports</div>
          </div>
        </div>
      </div>
    </div>
  );
}
