import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/PatientLoginPage.css"; // separate CSS file (can reuse doctor styles too)
import { baseApi } from "./baseApi";

const PatientLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseApi}/api/auth/login`, {
        email,
        password,
      });

      const { id, token, role, name } = response.data;

      if (role === "PATIENT") {
        localStorage.setItem("patientId", id);   // 👈 patientId saved here
        localStorage.setItem("patientName", name);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);

        alert("Patient Login Successful ✅");
        navigate("/patient-dashboard");
      } else {
        alert("Access Denied ❌ Only patients can log in here.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="patient-login-container">
      <div className="patient-login-card">
        <h2 className="title">Patient Login</h2>
        <p className="subtitle">Access your health records and appointments</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="patient@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button onClick={handleLogin} type="submit" className="login-btn">
            Log In
          </button>
        </form>

        <p className="register-text">
          New to MediConnect?{" "}
          <span
            className="register-link"
            onClick={() => navigate("/register")}
          >
            Register Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default PatientLoginPage;
