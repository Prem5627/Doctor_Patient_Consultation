import React, { useState } from "react";
import "../styles/RegistrationForm.css";
import axios from "axios";
import { baseApi } from "./baseApi";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log("User Registered:", payload);

    try {
      const response = await axios.post(`${baseApi}/api/auth/register`, payload);
      console.log("Backend Response:", response.data);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2>Complete Your Profile</h2>
        <p>Please provide the following information:</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="PATIENT">Patient</option>
            <option value="DOCTOR">Doctor</option>
          </select>

          <input
            type="text"
            name="phone"
            placeholder="Enter your contact number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit" className="save-btn">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
