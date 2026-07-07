import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    // Example API response (replace with real backend call)
    const fetchedAppointments = [
      {
        id: 1,
        doctorName: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        date: "Dec 15, 2023",
        time: "10:00 AM",
        status: "Booked",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        type: "upcoming",
      },
      {
        id: 2,
        doctorName: "Dr. Michael Chen",
        specialty: "Dermatologist",
        date: "Dec 20, 2023",
        time: "2:30 PM",
        status: "Pending",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        type: "upcoming",
      },
    ];
    setAppointments(fetchedAppointments);
  }, []);

  const filteredAppointments = appointments.filter(
    (appt) => appt.type === activeTab
  );

  return (
    <div className="p-8">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold mb-1">My Appointments</h1>
      <p className="text-gray-600 mb-6">
        Manage your upcoming and past medical appointments
      </p>

      {/* Tabs */}
      <div className="flex space-x-6 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`pb-2 font-medium ${
            activeTab === "upcoming"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`pb-2 font-medium ${
            activeTab === "past"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Past
        </button>
      </div>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAppointments.map((appt) => (
          <div
            key={appt.id}
            className="flex justify-between items-center p-5 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            {/* Left Side - Info */}
            <div>
              <h2 className="text-lg font-semibold">{appt.doctorName}</h2>
              <p className="text-gray-500">{appt.specialty}</p>

              <div className="flex items-center mt-3 text-gray-600 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {appt.date} • {appt.time}
                </span>
              </div>

              {/* Status */}
              <span
                className={`inline-block mt-3 px-3 py-1 text-xs font-medium rounded-md ${
                  appt.status === "Booked"
                    ? "bg-blue-100 text-blue-600"
                    : appt.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {appt.status}
              </span>
            </div>

            {/* Right Side - Doctor Image */}
            <img
              src={appt.image}
              alt={appt.doctorName}
              className="w-14 h-14 rounded-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
