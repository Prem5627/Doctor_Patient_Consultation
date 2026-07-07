import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseApi } from "./baseApi";

function FindDoctor() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseApi}/api/users/doctors`) // Your API endpoint
      .then(res => setDoctors(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="find-doctor-page">
      <h2>Find a Doctor</h2>
      <div className="doctor-list">
        {doctors.map((doc) => (
          <div 
            key={doc.id} 
            className="doctor-card"
            onClick={() => navigate(`/find-doctor/${doc.id}`)}
          >
            <h3>{doc.name.startsWith("Dr.") ? doc.name : `Dr. ${doc.name}`}</h3>
            <p>{doc.specialty}</p>
            <p>⭐ {doc.reviews || 0} reviews</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindDoctor;
