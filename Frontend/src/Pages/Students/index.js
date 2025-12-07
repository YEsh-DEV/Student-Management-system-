import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaRegEdit, FaSearch, FaFileExport, FaFilePdf, FaFileExcel } from 'react-icons/fa'
import { BsTrash3 } from 'react-icons/bs'
import NoStudent from "../../Components/NoStudent";
import "./Students.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGender, setFilterGender] = useState("all");

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/student/get`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => alert(err.message));
  };

  const deleteStudent = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00d084",
      cancelButtonColor: "#ff4757",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/student/delete/${id}`)
          .then((res) => {
            Swal.fire("Deleted!", res.data.status, "success");
            getStudents();
          })
          .catch((err) => {
            Swal.fire("Not Deleted!", err.message, "error");
          });
      }
    });
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["#", "Name", "Reg No", "Email", "Phone", "Age", "Course", "Gender", "Address"];
    const csvData = filteredStudents.map((student, index) => [
      index + 1,
      student.name,
      student.regno || student.nim || 'N/A',
      student.email || 'N/A',
      student.phone || 'N/A',
      student.age || 'N/A',
      student.course || 'N/A',
      student.gender,
      student.address || 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `students_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: 'success',
      title: 'Exported!',
      text: 'Students data exported to CSV successfully',
      confirmButtonColor: '#00d084',
      timer: 2000
    });
  };

  // Export to JSON
  const exportToJSON = () => {
    const jsonData = JSON.stringify(filteredStudents, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `students_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: 'success',
      title: 'Exported!',
      text: 'Students data exported to JSON successfully',
      confirmButtonColor: '#00d084',
      timer: 2000
    });
  };

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.regno && student.regno.toString().includes(searchTerm)) ||
      (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesGender = filterGender === "all" || student.gender.toLowerCase() === filterGender.toLowerCase();
    return matchesSearch && matchesGender;
  });

  return (
    <div className="students-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Students Management</h1>
          <div className="header-actions">
            {filteredStudents.length > 0 && (
              <div className="export-dropdown">
                <button className="btn btn-secondary">
                  <FaFileExport /> Export
                </button>
                <div className="export-menu">
                  <button onClick={exportToCSV} className="export-option">
                    <FaFileExcel /> Export to CSV
                  </button>
                  <button onClick={exportToJSON} className="export-option">
                    <FaFilePdf /> Export to JSON
                  </button>
                </div>
              </div>
            )}
            <Link to="/add-student" className="btn btn-primary">
              Add New Student
            </Link>
          </div>
        </div>

        {students.length > 0 && (
          <div className="filters-section">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, Reg No, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterGender === "all" ? "active" : ""}`}
                onClick={() => setFilterGender("all")}
              >
                All
              </button>
              <button
                className={`filter-btn ${filterGender === "male" ? "active" : ""}`}
                onClick={() => setFilterGender("male")}
              >
                Male
              </button>
              <button
                className={`filter-btn ${filterGender === "female" ? "active" : ""}`}
                onClick={() => setFilterGender("female")}
              >
                Female
              </button>
            </div>
          </div>
        )}

        {filteredStudents.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Reg No</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Age</th>
                  <th>Course</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td className="student-name">{student.name}</td>
                    <td>{student.regno || student.nim || 'N/A'}</td>
                    <td>{student.email || 'N/A'}</td>
                    <td>{student.phone || 'N/A'}</td>
                    <td>{student.age || 'N/A'}</td>
                    <td>{student.course || 'N/A'}</td>
                    <td>
                      <span className={`badge badge-${student.gender.toLowerCase()}`}>
                        {student.gender}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/edit/${student._id}`} className="btn btn-sm btn-primary">
                          <FaRegEdit />
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteStudent(student._id)}
                        >
                          <BsTrash3 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : students.length === 0 ? (
          <NoStudent />
        ) : (
          <div className="no-results">
            <p>No students found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
