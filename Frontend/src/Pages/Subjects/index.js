import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaPlus } from 'react-icons/fa';
import '../Students/Students.css';

export default function Subjects() {
  return (
    <div className="students-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Subjects Management</h1>
          <Link to="/add-subject" className="btn btn-primary">
            <FaPlus /> Add New Subject
          </Link>
        </div>

        <div className="coming-soon-card glass-card">
          <div className="coming-soon-icon">
            <FaBook />
          </div>
          <h2>Subjects Management</h2>
          <p>Manage all subjects and courses here. This feature is coming soon!</p>
          <div className="feature-list">
            <div className="feature-item">✓ Add and manage subjects</div>
            <div className="feature-item">✓ Assign subjects to courses</div>
            <div className="feature-item">✓ Track subject credits</div>
            <div className="feature-item">✓ View subject details</div>
          </div>
        </div>
      </div>
    </div>
  );
}
