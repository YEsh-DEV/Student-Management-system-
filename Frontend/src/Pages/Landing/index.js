import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaUserGraduate, FaMale, FaFemale, FaBook, FaChartLine, FaUsers, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import "./Landing.css";

const Landing = () => {
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/student/get`)
      .then((res) => {
        const students = res.data;
        const maleCount = students.filter((s) => s.gender.toLowerCase() === "male").length;
        const femaleCount = students.filter((s) => s.gender.toLowerCase() === "female").length;
        setStats({
          total: students.length,
          male: maleCount,
          female: femaleCount,
        });
      })
      .catch((err) => console.log(err.message));

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Calculate percentages for circular progress
  const malePercentage = stats.total > 0 ? (stats.male / stats.total) * 100 : 0;
  const femalePercentage = stats.total > 0 ? (stats.female / stats.total) * 100 : 0;

  // Dummy data for pie charts
  const courseDistribution = [
    { name: 'Computer Science', value: 35, color: '#00d084' },
    { name: 'Engineering', value: 25, color: '#26e7a6' },
    { name: 'Business', value: 20, color: '#00a86b' },
    { name: 'Others', value: 20, color: '#00c9a7' },
  ];

  const performanceData = [
    { name: 'Excellent', value: 30, color: '#00d084' },
    { name: 'Good', value: 45, color: '#26e7a6' },
    { name: 'Average', value: 20, color: '#00c9a7' },
    { name: 'Needs Improvement', value: 5, color: '#ff4757' },
  ];

  // Simple SVG Pie Chart Component
  const PieChart = ({ data, size = 200 }) => {
    let currentAngle = 0;
    const radius = size / 2;
    const centerX = radius;
    const centerY = radius;

    const createArc = (startAngle, endAngle, color) => {
      const start = polarToCartesian(centerX, centerY, radius - 20, endAngle);
      const end = polarToCartesian(centerX, centerY, radius - 20, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

      return (
        <path
          d={`M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius - 20} ${radius - 20} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`}
          fill={color}
          className="pie-slice"
        />
      );
    };

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    };

    return (
      <svg width={size} height={size} className="pie-chart">
        <circle cx={centerX} cy={centerY} r={radius - 20} fill="white" opacity="0.1" />
        {data.map((item, index) => {
          const angle = (item.value / 100) * 360;
          const arc = createArc(currentAngle, currentAngle + angle, item.color);
          currentAngle += angle;
          return <g key={index}>{arc}</g>;
        })}
        <circle cx={centerX} cy={centerY} r={radius - 80} fill="white" className="pie-center" />
      </svg>
    );
  };

  return (
    <div className="landing">
      {/* Hero Section with Background */}
      <section className="hero">
        <div className="hero-bg-overlay"></div>
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i}`}></div>
          ))}
        </div>

        <div className="hero-content scroll-animate">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Welcome to Student Management
          </div>
          <h1 className="hero-title">
            Manage Your <span className="highlight gradient-text">Students</span>
            <br />
            With Excellence
          </h1>
          <p className="hero-subtitle">
            A modern, intuitive platform designed to streamline student management,
            track progress, and enhance educational excellence.
          </p>
          <div className="hero-buttons">
            <Link to="/students" className="btn btn-primary btn-lg btn-glow">
              View All Students
              <FaArrowRight className="btn-icon" />
            </Link>
            <Link to="/add-student" className="btn btn-secondary btn-lg btn-glass">
              Add New Student
            </Link>
          </div>

          {/* Quick Info Cards */}
          <div className="hero-info-cards">
            <div className="info-card glass-card">
              <FaCheckCircle className="info-icon" />
              <div>
                <h4>Easy Management</h4>
                <p>Streamlined processes</p>
              </div>
            </div>
            <div className="info-card glass-card">
              <FaCheckCircle className="info-icon" />
              <div>
                <h4>Real-time Updates</h4>
                <p>Instant synchronization</p>
              </div>
            </div>
            <div className="info-card glass-card">
              <FaCheckCircle className="info-icon" />
              <div>
                <h4>Secure & Reliable</h4>
                <p>Your data is safe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section with Circular Progress */}
      <section className="stats-section scroll-animate">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Statistics</span>
            <h2 className="section-title">Student Overview</h2>
            <p className="section-subtitle">Real-time insights into your student database</p>
          </div>

          <div className="stats-grid">
            {/* Total Students - Circular */}
            <div className="stat-card-circular glass-card">
              <div className="circular-progress total-progress">
                <svg className="progress-ring" width="180" height="180">
                  <circle
                    className="progress-ring-circle-bg"
                    stroke="#e0e0e0"
                    strokeWidth="12"
                    fill="transparent"
                    r="80"
                    cx="90"
                    cy="90"
                  />
                  <circle
                    className="progress-ring-circle"
                    stroke="url(#gradient-total)"
                    strokeWidth="12"
                    fill="transparent"
                    r="80"
                    cx="90"
                    cy="90"
                    strokeDasharray="502.4"
                    strokeDashoffset="0"
                  />
                  <defs>
                    <linearGradient id="gradient-total" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00d084" />
                      <stop offset="100%" stopColor="#00a86b" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="progress-content">
                  <FaUserGraduate className="progress-icon" />
                  <h3 className="progress-number">{stats.total}</h3>
                  <p className="progress-label">Total Students</p>
                </div>
              </div>
            </div>

            {/* Male Students - Circular */}
            <div className="stat-card-circular glass-card">
              <div className="circular-progress male-progress">
                <svg className="progress-ring" width="180" height="180">
                  <circle
                    className="progress-ring-circle-bg"
                    stroke="#e0e0e0"
                    strokeWidth="12"
                    fill="transparent"
                    r="80"
                    cx="90"
                    cy="90"
                  />
                  <circle
                    className="progress-ring-circle"
                    stroke="url(#gradient-male)"
                    strokeWidth="12"
                    fill="transparent"
                    r="80"
                    cx="90"
                    cy="90"
                    strokeDasharray="502.4"
                    strokeDashoffset={502.4 - (502.4 * malePercentage) / 100}
                  />
                  <defs>
                    <linearGradient id="gradient-male" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00e5cc" />
                      <stop offset="100%" stopColor="#00c9a7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="progress-content">
                  <FaMale className="progress-icon" />
                  <h3 className="progress-number">{stats.male}</h3>
                  <p className="progress-label">Male</p>
                  <p className="progress-percentage">{malePercentage.toFixed(0)}%</p>
                </div>
              </div>
            </div>

            {/* Female Students - Circular */}
            <div className="stat-card-circular glass-card">
              <div className="circular-progress female-progress">
                <svg className="progress-ring" width="180" height="180">
                  <circle
                    className="progress-ring-circle-bg"
                    stroke="#e0e0e0"
                    strokeWidth="12"
                    fill="transparent"
                    r="80"
                    cx="90"
                    cy="90"
                  />
                  <circle
                    className="progress-ring-circle"
                    stroke="url(#gradient-female)"
                    strokeWidth="12"
                    fill="transparent"
                    r="80"
                    cx="90"
                    cy="90"
                    strokeDasharray="502.4"
                    strokeDashoffset={502.4 - (502.4 * femalePercentage) / 100}
                  />
                  <defs>
                    <linearGradient id="gradient-female" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#26e7a6" />
                      <stop offset="100%" stopColor="#00d084" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="progress-content">
                  <FaFemale className="progress-icon" />
                  <h3 className="progress-number">{stats.female}</h3>
                  <p className="progress-label">Female</p>
                  <p className="progress-percentage">{femalePercentage.toFixed(0)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pie Charts Section */}
          <div className="charts-section">
            <h3 className="charts-title">Detailed Analytics</h3>
            <div className="charts-grid">
              <div className="chart-card glass-card">
                <h4 className="chart-title">Course Distribution</h4>
                <div className="chart-wrapper">
                  <PieChart data={courseDistribution} size={200} />
                </div>
                <div className="chart-legend">
                  {courseDistribution.map((item, index) => (
                    <div key={index} className="legend-item">
                      <span className="legend-color" style={{ background: item.color }}></span>
                      <span className="legend-label">{item.name}</span>
                      <span className="legend-value">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-card glass-card">
                <h4 className="chart-title">Performance Overview</h4>
                <div className="chart-wrapper">
                  <PieChart data={performanceData} size={200} />
                </div>
                <div className="chart-legend">
                  {performanceData.map((item, index) => (
                    <div key={index} className="legend-item">
                      <span className="legend-color" style={{ background: item.color }}></span>
                      <span className="legend-label">{item.name}</span>
                      <span className="legend-value">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section scroll-animate">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Features</span>
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">Powerful features to manage your students effectively</p>
          </div>

          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <FaUsers />
                </div>
              </div>
              <h3 className="feature-title">Student Management</h3>
              <p className="feature-description">
                Add, edit, and manage student records with an intuitive interface.
                Keep all information organized and accessible.
              </p>
              <div className="feature-link">
                Learn More <FaArrowRight />
              </div>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <FaBook />
                </div>
              </div>
              <h3 className="feature-title">Course Tracking</h3>
              <p className="feature-description">
                Monitor student courses, departments, and academic progress.
                Track enrollment dates and course details.
              </p>
              <div className="feature-link">
                Learn More <FaArrowRight />
              </div>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <FaChartLine />
                </div>
              </div>
              <h3 className="feature-title">Analytics & Insights</h3>
              <p className="feature-description">
                View real-time statistics and insights about your student database.
                Make data-driven decisions.
              </p>
              <div className="feature-link">
                Learn More <FaArrowRight />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
