import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartBar, FaPlus } from 'react-icons/fa';
import '../Students/Students.css';

export default function Marks() {
  return (
    <div className="students-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Marks & Grading System</h1>
          <Link to="/add-marks" className="btn btn-primary">
            <FaPlus /> Add Marks
          </Link>
        </div>

        <div className="coming-soon-card glass-card">
          <div className="coming-soon-icon">
            <FaChartBar />
          </div>
          <h2>Marks & Grading Management</h2>
          <p>Manage student marks and grades with automatic calculations. This feature is coming soon!</p>
          <div className="feature-list">
            <div className="feature-item">✓ Add and manage marks</div>
            <div className="feature-item">✓ Automatic grade calculation</div>
            <div className="feature-item">✓ Subject-wise performance analysis</div>
            <div className="feature-item">✓ Generate grade reports</div>
            <div className="feature-item">✓ View overall GPA</div>
          </div>
        </div>
      </div>
    </div>
  );
}
