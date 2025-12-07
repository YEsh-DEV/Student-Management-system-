import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import '../Students/Students.css';

export default function Calendar() {
  return (
    <div className="students-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Academic Calendar</h1>
        </div>

        <div className="coming-soon-card glass-card">
          <div className="coming-soon-icon">
            <FaCalendarAlt />
          </div>
          <h2>Calendar & Events</h2>
          <p>View and manage academic events, exams, and important dates. This feature is coming soon!</p>
          <div className="feature-list">
            <div className="feature-item">✓ View academic calendar</div>
            <div className="feature-item">✓ Add exam schedules</div>
            <div className="feature-item">✓ Track holidays and events</div>
            <div className="feature-item">✓ Set reminders</div>
          </div>
        </div>
      </div>
    </div>
  );
}
