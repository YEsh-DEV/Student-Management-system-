import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/LogoSttiss.png";
import './NoStudent.css';

const NoStudent = () => (
    <div className="no-student">
        <img
            className="no-student-logo"
            src={logo}
            alt="No Students"
        />
        <h2>No Students Found</h2>
        <p>
            Start by adding your first student to the system.
        </p>
        <Link to="/add-student" className="btn btn-primary btn-lg">
            Add Student
        </Link>
    </div>
);

export default NoStudent;
