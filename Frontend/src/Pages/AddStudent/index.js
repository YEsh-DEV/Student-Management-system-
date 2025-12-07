import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaUser, FaIdCard, FaVenusMars, FaEnvelope, FaPhone, FaCalendar, FaBook, FaMapMarkerAlt } from "react-icons/fa";
import "./AddStudent.css";

export default function AddStudent() {
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    gender: "",
    email: "",
    phone: "",
    age: "",
    course: "",
    address: "",
    enrollmentDate: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const courses = [
    "Computer Science",
    "Information Technology",
    "Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Business Administration",
    "Accounting",
    "Marketing"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.regno) newErrors.regno = "Regno is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = "Invalid phone number (10-15 digits)";
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (formData.age < 16 || formData.age > 100) {
      newErrors.age = "Age must be between 16 and 100";
    }

    if (!formData.course) newErrors.course = "Course is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all required fields correctly",
        confirmButtonColor: "#00d084",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/student/add`, formData);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Student added successfully",
        confirmButtonColor: "#00d084",
        timer: 2000,
      });

      navigate("/students");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.error || err.message,
        confirmButtonColor: "#00d084",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-student-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Add New Student</h1>
          <p className="page-subtitle">Fill in the student information below</p>
        </div>

        <form onSubmit={handleSubmit} className="student-form glass-card">
          {/* Personal Information Section */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="form-grid">
              {/* Name */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <FaUser className="label-icon" />
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : formData.name ? 'success' : ''}`}
                  placeholder="Enter full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              {/* Regno */}
              <div className="form-group">
                <label htmlFor="regno" className="form-label">
                  <FaIdCard className="label-icon" />
                  Reg No <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="regno"
                  name="regno"
                  value={formData.regno}
                  onChange={handleChange}
                  className={`form-input ${errors.regno ? 'error' : formData.regno ? 'success' : ''}`}
                  placeholder="Enter Registration Number"
                />
                {errors.regno && <span className="error-message">{errors.regno}</span>}
              </div>

              {/* Gender */}
              <div className="form-group">
                <label className="form-label">
                  <FaVenusMars className="label-icon" />
                  Gender <span className="required">*</span>
                </label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    Male
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    Female
                  </label>
                </div>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>

              {/* Age */}
              <div className="form-group">
                <label htmlFor="age" className="form-label">
                  <FaCalendar className="label-icon" />
                  Age <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`form-input ${errors.age ? 'error' : formData.age ? 'success' : ''}`}
                  placeholder="Enter age"
                  min="16"
                  max="100"
                />
                {errors.age && <span className="error-message">{errors.age}</span>}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="form-section">
            <h3 className="section-title">Contact Information</h3>
            <div className="form-grid">
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <FaEnvelope className="label-icon" />
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : formData.email && !errors.email ? 'success' : ''}`}
                  placeholder="student@example.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  <FaPhone className="label-icon" />
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? 'error' : formData.phone && !errors.phone ? 'success' : ''}`}
                  placeholder="1234567890"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="form-section">
            <h3 className="section-title">Academic Information</h3>
            <div className="form-grid">
              {/* Course */}
              <div className="form-group">
                <label htmlFor="course" className="form-label">
                  <FaBook className="label-icon" />
                  Course/Department <span className="required">*</span>
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className={`form-input ${errors.course ? 'error' : formData.course ? 'success' : ''}`}
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
                {errors.course && <span className="error-message">{errors.course}</span>}
              </div>

              {/* Enrollment Date */}
              <div className="form-group">
                <label htmlFor="enrollmentDate" className="form-label">
                  <FaCalendar className="label-icon" />
                  Enrollment Date
                </label>
                <input
                  type="date"
                  id="enrollmentDate"
                  name="enrollmentDate"
                  value={formData.enrollmentDate}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="form-section">
            <h3 className="section-title">Address</h3>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                <FaMapMarkerAlt className="label-icon" />
                Full Address <span className="required">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`form-input form-textarea ${errors.address ? 'error' : formData.address ? 'success' : ''}`}
                placeholder="Enter complete address"
                rows="3"
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/students")}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-glow"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Adding Student...
                </>
              ) : (
                "Add Student"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
