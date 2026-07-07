import React from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import MainPage from './components/MainPage';
import {Router, Routes, Route } from 'react-router-dom';
import DoctorLoginPage from './components/DoctorLoginPage';
import PatientLoginPage from './components/PatientLoginPage';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import FindDoctor from './components/FindDoctor';
import DoctorDetail from './components/DoctorDetail';
import Appointments from './components/Appointments';
import DoctorAppointments from './components/DoctorAppointments';

function App() {
  return (
    // <Router>
      <Routes>``
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/doctorlogin" element={<DoctorLoginPage />} />
        <Route path="/patientlogin" element={<PatientLoginPage />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route path="/find-doctor/:id" element={<DoctorDetail />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doc-appointments" element={<DoctorAppointments />} />
      </Routes>
    // </Router>
    // https://medi-connect-backend-igce.onrender.com/
  );
}

export default App;


// // App.js
// import React from 'react';
// import './App.css';
// import RegistrationForm from './components/RegistrationForm';
// import MainPage from './components/MainPage';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import DoctorLoginPage from './components/DoctorLoginPage';
// import PatientLoginPage from './components/PatientLoginPage';
// import PatientDashboard from './components/PatientDashboard';
// import DoctorDashboard from './components/DoctorDashboard';
// import FindDoctor from './components/FindDoctor';
// import DoctorDetail from './components/DoctorDetail';
// import Appointments from './components/Appointments';
// function App() {
//   return (
//       <Routes>
//         <Route path="/" element={<MainPage />} />
//         <Route path="/register" element={<RegistrationForm />} />
//         <Route path="/doctorlogin" element={<DoctorLoginPage />} />
//         <Route path="/patientlogin" element={<PatientLoginPage />} />
//         <Route path="/patient-dashboard" element={<PatientDashboard />} />
//         <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
//         <Route path="/find-doctor" element={<FindDoctor />} />
//         <Route path="/find-doctor/:id" element={<DoctorDetail />} />
//         <Route path="/appointments" element={<Appointments />} />
//       </Routes>
//   );
// }

// export default App;
