package com.doctor_patient.consultant.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.doctor_patient.consultant.entity.Appointment;
import com.doctor_patient.consultant.repository.AppointmentRepository;

@Service
public class AppointmentService {
    private final AppointmentRepository repo;

    public AppointmentService(AppointmentRepository repo) {
        this.repo = repo;
    }

    // Book appointment
    public Appointment bookAppointment(Appointment appointment) {
        appointment.setStatus(Appointment.Status.BOOKED); // default status
        appointment.setCreatedAt(LocalDateTime.now());
        appointment.setUpdatedAt(LocalDateTime.now());
        return repo.save(appointment);
    }

    // Update appointment status
    public Appointment updateStatus(Long id, Appointment.Status status) {
        Appointment appt = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appt.setStatus(status);
        appt.setUpdatedAt(LocalDateTime.now());
        return repo.save(appt);
    }

    // List all appointments
    public List<Appointment> getAppointments() {
        return repo.findAll();
    }
    
//    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
//        return repo.findByDoctorId(doctorId);
//    }
	    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
	        List<Appointment> appointments = repo.findByDoctorId(doctorId);
	        LocalDateTime now = LocalDateTime.now();
	
	        for (Appointment appt : appointments) {
	            if (appt.getStatus() == Appointment.Status.BOOKED && 
	                appt.getAppointmentDateTime().isBefore(now)) {
	                appt.setStatus(Appointment.Status.COMPLETED);
	                appt.setUpdatedAt(now);
	                repo.save(appt);
	            }
	        }
	
	        return appointments;
	    }


}
