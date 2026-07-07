import React, { useState } from "react";
import axios from "axios";
import { baseApi } from "./baseApi";

const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",  // initially empty
    phone: ""
  });

  const roles = ["PATIENT", "DOCTOR"]; // dynamic options

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseApi}/api/users/register`, formData);
      console.log("User registered:", response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {!showRegister ? (
        // ===== Landing Page with Buttons =====
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
          <h2 className="text-xl font-bold mb-6">Welcome to MediConnect</h2>
          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
              Log in as Patient
            </button>
            <button className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition">
              Log in as Doctor
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className="w-full bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition"
            >
              New User – Register
            </button>
          </div>
        </div>
      ) : (
        // ===== Registration Form =====
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-xl font-bold text-center mb-4">New User Registration</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              >
                <option value="">Select Role</option>
                {roles.map((roleOption) => (
                  <option key={roleOption} value={roleOption}>
                    {roleOption.charAt(0) + roleOption.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Contact Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter contact number"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => setShowRegister(false)}
              className="w-full bg-gray-400 text-white p-2 rounded-lg hover:bg-gray-500 transition mt-2"
            >
              Back
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
