import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorLoginPage.css"; // you can reuse Patient styles if you want
import { baseApi } from "./baseApi";

const DoctorLoginPage = () => {
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

      const { token, role } = response.data;

      if (role === "DOCTOR") {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);

        alert("Doctor Login Successful ✅");
        navigate("/doctor-dashboard"); // go to doctor dashboard
      } else {
        alert("Access Denied ❌ Only doctors can log in here.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="doctor-login-container">
      <div className="doctor-login-card">
        <h2 className="title">Doctor Login</h2>
        <p className="subtitle">Manage your patients and appointments</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="doctor@example.com"
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

          <button type="submit" className="login-btn">
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

export default DoctorLoginPage;






// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/LoginPage.css"; 

// const DoctorLoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("${baseApi}/api/auth/login", {
//         email,
//         password,
//       });

//       const { token, role } = response.data;

//       if (role === "DOCTOR") {
//         localStorage.setItem("token", token);
//         localStorage.setItem("role", role);
//         localStorage.setItem("email", email);

//         alert("Doctor Login Successful ✅");
//         navigate("/doctor-dashboard"); // Redirect to Doctor Dashboard
//       } else {
//         alert("Access Denied ❌ Only doctors can log in here.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2>Doctor Login</h2>
//         <p>Please enter your credentials:</p>

//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit" className="login-btn">
//             Log in as Doctor
//           </button>
//         </form>

//         <p className="register-text">
//           Not registered yet?{" "}
//           <span
//             className="register-link"
//             onClick={() => navigate("/register")}
//           >
//             Register Here
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DoctorLoginPage;
