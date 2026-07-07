import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/DoctorDetail.css";
import { baseApi } from "./baseApi";

function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [activeTab, setActiveTab] = useState("availability");
  const patientId = localStorage.getItem("patientId");
  const token = localStorage.getItem("token");

  const handleConfirm = async () => {
    try {
        // Validate that a date and time slot are selected.
        if (!selectedDate || !selectedSlot) {
            alert("Please select both a date and a time slot for your appointment.");
            return;
        }

        // Combine date and time to create a complete Date object.
        const newDate = new Date(selectedDate);
        const [timePart, ampm] = selectedSlot.split(' ');
        let [hours, minutes] = timePart.split(':').map(Number);
        
        let formattedHours = hours;
        if (ampm === 'PM' && hours !== 12) {
            formattedHours = hours + 12;
        }
        if (ampm === 'AM' && hours === 12) { // Midnight case
            formattedHours = 0;
        }

        newDate.setHours(formattedHours, minutes, 0, 0);

        // Format the combined datetime into a standardized ISO string for the backend.
        const combinedDatetime = newDate.toISOString();
        
        // 🔹 Corrected Payload: Match the backend Appointment entity
        const appointmentData = {
            // Send patient and doctor as objects with their IDs
            // patient: { id: patientId }
            patient: { id: patientId },
            doctor: { id: id }, // 'id' from your current scope is the doctorId
            appointmentDateTime: combinedDatetime // 🚨 Corrected field name (camel case)
        };

      const response = await axios.post(`${baseApi}/api/appointments/book`,
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
        
        console.log('Appointment Confirmed:', response.data);
        alert('Appointment successfully booked!');
        
    } catch (error) {
        console.error('Error booking appointment:', error.response ? error.response.data : error.message);
        alert('Failed to book appointment. Please try again.');
    }
};

  // Fetch doctor data by ID
  useEffect(() => {
    axios.get(`${baseApi}/api/users/doctor/${id}`)
        .then(res => setDoctor(res.data))
        .catch(err => {
        console.error(err);
        setDoctor({ error: "Doctor not found" }); // so loading stops
        });
    }, [id]);

  if (!doctor) return <p className="text-center mt-10">Loading...</p>;

  // Sample slots (replace with API data if available)
  const slots = {
    morning: ["9:00 AM", "10:00 AM", "11:00 AM"],
    afternoon: ["2:00 PM", "3:00 PM", "4:00 PM"],
  };

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      {/* Doctor Profile Card */}
      <div className="bg-white shadow rounded-2xl p-6 w-full md:w-2/3">
        <div className="flex gap-4 items-center">
          <img 
            src="/profile-icon.png"
            alt={doctor.name} 
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {doctor.name.startsWith("Dr.") ? doctor.name : `Dr. ${doctor.name}`}
            </h2>
            <p className="text-blue-600">{doctor.specialty}</p>
            <p className="text-gray-600">{doctor.experience} years of experience</p>
            <p className="text-yellow-500">⭐ {doctor.reviews || 0} reviews</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow">Book Appointment</button>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg shadow">Consult Online</button>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b flex gap-6 text-gray-600">
          <button 
            onClick={() => setActiveTab("overview")} 
            className={activeTab === "overview" ? "border-b-2 border-blue-600 pb-2 font-semibold" : "pb-2"}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab("reviews")} 
            className={activeTab === "reviews" ? "border-b-2 border-blue-600 pb-2 font-semibold" : "pb-2"}
          >
            Reviews
          </button>
          <button 
            onClick={() => setActiveTab("availability")} 
            className={activeTab === "availability" ? "border-b-2 border-blue-600 pb-2 font-semibold" : "pb-2"}
          >
            Availability
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "overview" && (
            <p>{doctor.bio || "This doctor is highly qualified and experienced in their field."}</p>
          )}

          {activeTab === "reviews" && (
            <ul className="list-disc pl-5">
              {doctor.reviewsList && doctor.reviewsList.length > 0 ? (
                doctor.reviewsList.map((rev, idx) => <li key={idx}>{rev}</li>)
              ) : (
                <p>No reviews available.</p>
              )}
            </ul>
          )}

          {activeTab === "availability" && (
            <div>
              {/* Calendar */}
              <div className="my-4">
                <label className="font-semibold">Select Date:</label>
                <input 
                  type="date" 
                  value={selectedDate.toISOString().split("T")[0]} 
                  onChange={(e) => setSelectedDate(new Date(e.target.value))} 
                  className="ml-3 p-2 border rounded-lg"
                />
              </div>

              {/* Slots */}
              <div className="grid grid-cols-2 gap-6">
                {/* Morning Slots */}
                <div>
                  <h4 className="font-semibold mb-2">Morning</h4>
                  <div className="flex flex-wrap gap-2">
                    {slots.morning.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedSlot(time)}
                        className={`px-3 py-2 rounded-lg border 
                          ${selectedSlot === time ? "bg-blue-600 text-white" : "hover:bg-blue-100"}
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Afternoon Slots */}
                <div>
                  <h4 className="font-semibold mb-2">Afternoon</h4>
                  <div className="flex flex-wrap gap-2">
                    {slots.afternoon.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedSlot(time)}
                        className={`px-3 py-2 rounded-lg border 
                          ${selectedSlot === time ? "bg-blue-600 text-white" : "hover:bg-blue-100"}
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Confirm Button */}
              <button onClick={handleConfirm}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow disabled:opacity-50"
                disabled={!selectedSlot}
              >
                Confirm Appointment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar: Selected date & slot */}
      <div className="bg-white shadow rounded-2xl p-6 w-full md:w-1/3">
        <h3 className="font-semibold mb-4">Selected Date & Time</h3>
        <p><strong>Date:</strong> {selectedDate.toDateString()}</p>
        <p><strong>Slot:</strong> {selectedSlot || "Not Selected"}</p>
      </div>
    </div>
  );
}

export default DoctorDetail;



// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";

// function DoctorDetail() {
//   const { id } = useParams();
//   const [doctor, setDoctor] = useState(null);

    // useEffect(() => {
    // axios.get(`${baseApi}/api/users/doctor/${id}`)
    //     .then(res => setDoctor(res.data))
    //     .catch(err => {
    //     console.error(err);
    //     setDoctor({ error: "Doctor not found" }); // so loading stops
    //     });
    // }, [id]);


//   if (!doctor) return <p>Loading...</p>;

//   return (
//     <div className="doctor-detail">
//       <h2>{doctor.name.startsWith("Dr.") ? doctor.name : `Dr. ${doctor.name}`}</h2>
//       <p>{doctor.specialty}</p>
//       <p>⭐ {doctor.reviews || 0} reviews</p>
//       <p>{doctor.experience} years of experience</p>
//       <button>Book Appointment</button>
//       <button>Consult Online</button>
//       {/* Availability calendar like in your image */}
//     </div>
//   );
// }

// export default DoctorDetail;
