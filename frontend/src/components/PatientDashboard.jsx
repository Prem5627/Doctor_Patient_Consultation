import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/PatientDashboard.css";
import { baseApi } from "./baseApi";

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctors from backend
    axios
      .get(`${baseApi}/api/users/doctors`) // Backend API for doctors
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  // Filter doctors dynamically based on search
  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="patient-dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">MediConnect Hub</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Find a Doctor</li>
          <li>Appointments</li>
          <li>About Us</li>
        </ul>
        <button className="account-btn">My Account</button>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <h1>Find your doctor and book an appointment</h1>
        <p>
          Search by name, specialty, or location to find the right healthcare
          professional for you.
        </p>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search doctors, specialties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>Search</button>
        </div>
      </header>

      {/* Recommended Doctors */}
      <section className="recommended">
        <div className="section-header">
          <h2>Recommended Doctors</h2>
          <span className="view-all">View all →</span>
        </div>

        <div className="doctor-cards">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="doctor-card"
                onClick={() => navigate(`/find-doctor/${doc.id}`)}
                style={{ cursor: "pointer" }}
              >
                {/* Placeholder image instead of real doctor pic */}
                <div className="doctor-avatar">
                  <span role="img" aria-label="doctor">
                    👨‍⚕️
                  </span>
                </div>

                <h3>{doc.name.startsWith("Dr.") ? doc.name : `Dr. ${doc.name}`}</h3>
                <p>{doc.specialty}</p>
                <p className="reviews">⭐ {doc.reviews || 0} reviews</p>
              </div>
            ))
          ) : (
            <p>No doctors found.</p>
          )}
        </div>
      </section>

      {/* Action Cards */}
      <section className="actions">
        <div className="action-card book">
          <h3>Book an Appointment</h3>
          <p>
            Schedule your next visit with our qualified healthcare
            professionals.
          </p>
          <button className="action-btn">Book Now</button>
        </div>
        <div className="action-card history">
          <h3>View Past Appointments</h3>
          <p>Access your medical history and previous appointment details.</p>
          <button className="action-btn green">View History</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>
          <h4>Solutions</h4>
          <p>Find a Doctor</p>
          <p>Book Appointment</p>
          <p>Telemedicine</p>
        </div>
        <div>
          <h4>Company</h4>
          <p>About</p>
          <p>Blog</p>
          <p>Careers</p>
        </div>
        <div>
          <h4>Legal</h4>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
        <div>
          <h4>MediConnect Hub</h4>
          <p>Your health, our priority.</p>
          <p>© 2024 MediConnect Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PatientDashboard;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/PatientDashboard.css";

// const PatientDashboard = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     // Fetch doctors from backend
//     axios
//       .get("${baseApi}/api/users/doctors") // Backend API for doctors
//       .then((res) => setDoctors(res.data))
//       .catch((err) => console.error("Error fetching doctors:", err));
//   }, []);

//   // Filter doctors dynamically based on search
//   const filteredDoctors = doctors.filter(
//     (doc) =>
//       doc.name.toLowerCase().includes(search.toLowerCase()) ||
//       doc.specialty.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="patient-dashboard">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">MediConnect Hub</div>
//         <ul className="nav-links">
//           <li>Home</li>
//           <li>Find a Doctor</li>
//           <li>Appointments</li>
//           <li>About Us</li>
//         </ul>
//         <button className="account-btn">My Account</button>
//       </nav>

//       {/* Hero Section */}
//       <header className="hero-section">
//         <h1>Find your doctor and book an appointment</h1>
//         <p>
//           Search by name, specialty, or location to find the right healthcare
//           professional for you.
//         </p>
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search doctors, specialties..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button>Search</button>
//         </div>
//       </header>

//       {/* Recommended Doctors */}
//       <section className="recommended">
//         <div className="section-header">
//           <h2>Recommended Doctors</h2>
//           <span className="view-all">View all →</span>
//         </div>

//         <div className="doctor-cards">
//           {filteredDoctors.length > 0 ? (
//             filteredDoctors.map((doc) => (
//               <div key={doc.id} className="doctor-card">
//                 <img src={doc.imageUrl} alt={doc.name} />
//                 <h3>{doc.name}</h3>
//                 <p>{doc.specialty}</p>
//                 <p className="reviews">
//                   ⭐ {doc.reviews} reviews
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p>No doctors found.</p>
//           )}
//         </div>
//       </section>

//       {/* Action Cards */}
//       <section className="actions">
//         <div className="action-card book">
//           <h3>Book an Appointment</h3>
//           <p>Schedule your next visit with our qualified healthcare professionals.</p>
//           <button className="action-btn">Book Now</button>
//         </div>
//         <div className="action-card history">
//           <h3>View Past Appointments</h3>
//           <p>Access your medical history and previous appointment details.</p>
//           <button className="action-btn green">View History</button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <div>
//           <h4>Solutions</h4>
//           <p>Find a Doctor</p>
//           <p>Book Appointment</p>
//           <p>Telemedicine</p>
//         </div>
//         <div>
//           <h4>Company</h4>
//           <p>About</p>
//           <p>Blog</p>
//           <p>Careers</p>
//         </div>
//         <div>
//           <h4>Legal</h4>
//           <p>Privacy Policy</p>
//           <p>Terms of Service</p>
//         </div>
//         <div>
//           <h4>MediConnect Hub</h4>
//           <p>Your health, our priority.</p>
//           <p>© 2024 MediConnect Hub. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default PatientDashboard;
