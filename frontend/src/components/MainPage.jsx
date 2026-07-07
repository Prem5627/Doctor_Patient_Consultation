import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <div className="main-card">
        <h2>Welcome to MediConnet Hub</h2>
        <p>Please choose your role to continue:</p>

        <button className="main-btn" onClick={() => navigate("/patientlogin")}>
          Log in as Patient
        </button>
        <button className="main-btn" onClick={() => navigate("/doctorlogin")}>
          Log in as Doctor
        </button>

        <p className="register-text">
          New User?{" "}
          <span className="register-link" onClick={() => navigate("/register")}>
            Register Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default MainPage;
