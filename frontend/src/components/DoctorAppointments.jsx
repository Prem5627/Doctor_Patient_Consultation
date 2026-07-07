import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorDashboard.css"; // Reuse CSS
import { baseApi } from "./baseApi";

const DoctorAppointments = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!email || !token) {
      navigate("/doctorlogin");
      return;
    }

    // Fetch doctor details
      axios
        .get(`${baseApi}/api/users/${email}`)
        .then((res) => {
          setDoctor(res.data);

          // Fetch appointments by doctorId
          if (res.data.id) {
            axios
              .get(`${baseApi}/api/appointments/doctor/${res.data.id}`)
              .then((response) => setAppointments(response.data))
              .catch(() => setAppointments([]));
          }
        })
        .catch(() => {
          alert("Doctor not found");
          navigate("/doctorlogin");
        });
  }, [email, token, navigate]);

//   useEffect(() => {
//     if (!email || !token) {
//       navigate("/doctorlogin");
//       return;
//     }

//     // Step 1: Fetch doctor details by email
//     axios
//       .get(`${baseApi}/api/users/${email}`)
//       .then((res) => {
//         setDoctor(res.data);

//         // Step 2: Fetch ALL appointments for this doctorId
//         if (res.data.id) {
//           axios
//             .get(`${baseApi}/api/appointments/doctor/${res.data.id}`)
//             .then((response) => {
//               console.log("Appointments API Response:", response.data); // 🔍 Debug
//               setAppointments(response.data);
//             })
//             .catch((err) => {
//               console.error("Error fetching appointments:", err);
//               setAppointments([]);
//             });
//         }
//       })
//       .catch((err) => {
//         console.error("Doctor fetch failed:", err);
//         alert("Doctor not found");
//         navigate("/doctorlogin");
//       });
//   }, [email, token, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/doctorlogin");
  };

  return (
    <div className="doctor-dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">MediConnect Hub</h2>
        <nav>
          <ul>
            <li onClick={() => navigate("/doctor-dashboard")}>Dashboard</li>
            <li className="active" onClick={() => navigate("/doc-appointments")}>
              Appointments
            </li>
            <li onClick={() => navigate("")}>Patients</li>
            <li onClick={() => navigate("")}>Messages</li>
            <li onClick={() => navigate("")}>Reviews</li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>
            Appointments – {doctor ? `Dr. ${doctor.name}` : "Loading..."}
          </h2>
          <div className="profile-section">
            <img
              src="/profile-icon.png"
              alt="profile"
              className="profile-avatar"
            />
            <span>{doctor ? `Dr. ${doctor.name}` : "Doctor"}</span>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="appointments-section">
            <h3>All Appointments</h3>
            {appointments.length > 0 ? (
              appointments.map((appt, idx) => {
                const apptDate = new Date(appt.appointmentDateTime);
                return (
                  <div key={idx} className="appointment-card">
                    <div>
                      <strong>
                        {appt.patient?.name || appt.patientName || "Unknown Patient"}
                      </strong>
                      <p>{appt.reason || "General Consultation"}</p>
                      <span>
                        {apptDate.toLocaleDateString()} •{" "}
                        {apptDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <p>Status: {appt.status}</p>
                    </div>
                    <span
                      className={`status ${
                        appt.mode === "ONLINE" ? "online" : "inperson"
                      }`}
                    >
                      {appt.mode === "ONLINE" ? "Online" : "In-Person"}
                    </span>
                  </div>
                );
              })
            ) : (
              <p>No appointments found.</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default DoctorAppointments;
