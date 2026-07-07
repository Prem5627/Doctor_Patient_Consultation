import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorDashboard.css";
import { baseApi } from "./baseApi";

const DoctorDashboard = () => {
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
          .then((response) => {
            const today = new Date();

            // Filter only today's appointments
            const todaysAppointments = response.data.filter((appt) => {
              const apptDate = new Date(appt.appointmentDateTime);
              return (
                apptDate.getFullYear() === today.getFullYear() &&
                apptDate.getMonth() === today.getMonth() &&
                apptDate.getDate() === today.getDate()
              );
            });

            setAppointments(todaysAppointments);
          })
          .catch(() => setAppointments([]));
      }
    })
    .catch(() => {
      alert("Doctor not found");
      navigate("/doctorlogin");
    });
}, [email, token, navigate]);


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
            <li className="active">Dashboard</li>
            <li onClick={() => navigate("/doc-appointments")}>Appointments</li>
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
                Dashboard – Welcome back,{" "}
                {doctor ? `Dr. ${doctor.name}` : "Loading..."}
            </h2>
            <div className="profile-section">
                <img
                src="/profile-icon.png"   // put a static image in public folder
                alt="profile"
                className="profile-avatar"
                />
                <span>{doctor ? `Dr. ${doctor.name}` : "Doctor"}</span>
            </div>
        </header>


        <div className="dashboard-content">
          {/* Appointments */}
          <section className="appointments-section">
            <h3>Today's Appointments</h3>
            {appointments.length > 0 ? (
              appointments.map((appt, idx) => {
                const apptDate = new Date(appt.appointmentDateTime);

                return (
                  <div key={idx} className="appointment-card">
                    <div>
                      <strong>{appt.patient?.name || "Unknown Patient"}</strong>
                      <p>{appt.reason || "General Consultation"}</p>
                      <span>
                        {apptDate.toLocaleDateString()} • {apptDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
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
              <p>No appointments for today.</p>
            )}
          </section>

          {/* <section className="appointments-section">
            <h3>Today's Appointments</h3>
            {appointments.length > 0 ? (
              appointments.map((appt, idx) => (
                <div key={idx} className="appointment-card">
                  <div>
                    <strong>{appt.patientName}</strong>
                    <p>{appt.reason || "General Consultation"}</p>
                    <span>
                      {appt.timeSlot || "00:00 AM"} - {appt.endTime || "00:00 AM"}
                    </span>
                  </div>
                  <span
                    className={
                      appt.mode === "ONLINE"
                        ? "status online"
                        : "status inperson"
                    }
                  >
                    {appt.mode === "ONLINE" ? "Online" : "In-Person"}
                  </span>
                </div>
              ))
            ) : (
              <p>No appointments for today.</p>
            )}
          </section> */}

          {/* Earnings */}
          <section className="earnings-section">
            <h3>Earnings Summary</h3>
            <div className="earning-item weekly">
              <p>Weekly Earnings</p>
              <h4>₹0</h4>
            </div>
            <div className="earning-item monthly">
              <p>Monthly Earnings</p>
              <h4>₹0</h4>
            </div>
            <div className="earning-item total">
              <p>Total Earnings</p>
              <h4>₹0</h4>
            </div>
            <button className="report-btn">View Detailed Report</button>
          </section>
        </div>

        {/* License Update */}
        <div className="license-section">
          <h4>⚠️ Update Medical License</h4>
          <p>
            Your medical license is expiring soon. Please upload a copy of your
            renewed license to continue practicing.
          </p>
          <button className="update-btn">Update Now</button>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Calendar, Users, MessageCircle, Star, Bell } from "lucide-react";
// import "../styles/DoctorDashboard.css";
// import { useNavigate } from "react-router-dom";

// const DoctorDashboard = () => {
//   const [doctor, setDoctor] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [notifications, setNotifications] = useState(3);
//   const [licenseExpiry, setLicenseExpiry] = useState(30);
//   const [earnings, setEarnings] = useState({ weekly: 0, monthly: 0, total: 0 });
//   const navigate = useNavigate();

//   const [totalPatients, setTotalPatients] = useState(0);

//     useEffect(() => {
//     // Fetch doctor first
//     axios.get("baseApi/api/users/doctors")
//         .then(res => {
//         if(res.data.length > 0){
//             const doctor = res.data[0]; // temp: first doctor
//             setDoctor(doctor);

//             const doctorId = doctor.id;
//             console.log("Doctor ID:", doctorId);
//             axios.get(`baseApi/api/appointments/doctor/${doctorId}`)
//             .then(res => setAppointments(res.data))
//             .catch(err => setAppointments([]));
//         }
//         })
//         .catch(err => console.log(err));

//     // Fetch total patients
//     axios.get("baseApi/api/users?role=PATIENT")
//         .then(res => setTotalPatients(res.data.length))
//         .catch(err => setTotalPatients(0));
//     }, []);


//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
//   };

//   const getStatusClass = (status) => status === "Online" ? "status-online" : "status-inperson";
//   const getDotClass = (status) => status === "Online" ? "status-dot-online" : "status-dot-inperson";

//   const toggleStatus = (id) => {
//     setAppointments(prev => prev.map(a => 
//       a.id === id ? {...a, status: a.status === "Online" ? "In-Person" : "Online"} : a
//     ));
//   };

//   if(!doctor) return <div>Loading dashboard...</div>;

//   return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <header className="header">
//         <div>
//           <h1 className="title">MediConnect Hub</h1>
//           <span className="subtitle">Dashboard - Welcome back, Dr. {doctor.name}</span>
//         </div>
//         <div className="user-role">
//           <span>{doctor.specialty || "Specialty"}</span>
//           <Bell />
//           {notifications > 0 && <span className="badge">{notifications}</span>}
//         </div>
//       </header>

//       <div style={{ display: "flex" }}>
//         {/* Sidebar */}
//         <aside className="sidebar">
//           <div className="nav-item active"><Calendar /> Dashboard</div>
//           <div className="nav-item"><Calendar /> Appointments</div>
//           <div className="nav-item"><Users /> Patients</div>
//           <div className="nav-item"><MessageCircle /> Messages</div>
//           <div className="nav-item"><Star /> Reviews</div>
//           <button onClick={() => navigate("/")} className="logout-btn">🚪 Logout</button>
//         </aside>

//         {/* Main */}
//         <main className="main">
//           {/* Today's Appointments */}
//           <div className="card">
//             <div className="card-header">
//               <h2 className="card-title">Today's Appointments</h2>
//             </div>
//             {appointments.length === 0 ? <p>No appointments scheduled.</p> : appointments.map(a => (
//               <div key={a.id} className="appointment-item">
//                 <div className="appointment-info">
//                   <div className="avatar">{/* user icon */}</div>
//                   <div>
//                     <h3>{a.patient.name}</h3>
//                     <p>{a.type || "General Consultation"}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <span className={`status-badge ${getStatusClass(a.status)}`}>
//                     <span className={getDotClass(a.status)}></span>
//                     {a.status}
//                   </span>
//                   <button onClick={() => toggleStatus(a.id)} className="button-primary">Toggle</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Earnings Summary */}
//           <div className="earnings-card">
//             <h2>Earnings Summary</h2>
//             <div className="earnings-item">
//               <span>Weekly Earnings</span>
//               <span>{formatCurrency(earnings.weekly)}</span>
//             </div>
//             <div className="earnings-item">
//               <span>Monthly Earnings</span>
//               <span>{formatCurrency(earnings.monthly)}</span>
//             </div>
//             <div className="earnings-item">
//               <span>Total Earnings</span>
//               <span>{formatCurrency(earnings.total)}</span>
//             </div>
//             <button className="button-detailed">View Detailed Report</button>
//           </div>

//           {/* Quick Stats */}
//           <div className="stats-grid">
//             <div className="stat-card">
//               <div>
//                 <p className="stat-title">Today's Appointments</p>
//                 <p className="stat-value">{appointments.length}</p>
//               </div>
//               <Calendar />
//             </div>
//             <div className="stat-card">
//               <div>
//                 <p className="stat-title">Total Patients</p>
//                 <p className="stat-value">248</p>
//               </div>
//               <Users />
//             </div>
//             <div className="stat-card">
//               <div>
//                 <p className="stat-title">New Messages</p>
//                 <p className="stat-value">12</p>
//               </div>
//               <MessageCircle />
//             </div>
//             <div className="stat-card">
//               <div>
//                 <p className="stat-title">Rating</p>
//                 <p className="stat-value">4.8</p>
//               </div>
//               <Star />
//             </div>
//           </div>

//           {/* License Alert */}
//           <div className="license-alert">
//             <h3>Update Medical License</h3>
//             <p>Your medical license is expiring in {licenseExpiry} days. Please upload a copy of your renewed license to continue practicing.</p>
//             <button className="button-secondary">Update Now</button>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;
