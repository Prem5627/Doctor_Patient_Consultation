package com.doctor_patient.consultant.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.doctor_patient.consultant.entity.Appointment;
import com.doctor_patient.consultant.service.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService service;

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    // Book appointment
    @PostMapping("/book")
    public ResponseEntity<Appointment> bookAppointment(@RequestBody Appointment appointment) {
        return ResponseEntity.ok(service.bookAppointment(appointment));
    }

    // Update status (BOOKED, COMPLETED, CANCELLED)
    @PostMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(
            @PathVariable Long id,
            @RequestParam Appointment.Status status) {
        return ResponseEntity.ok(service.updateStatus(id, status));
    }

    // Get all appointments
    @GetMapping
    public ResponseEntity<List<Appointment>> getAppointments() {
        return ResponseEntity.ok(service.getAppointments());
    }
    
 // 🔹 Get appointments for a doctor
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        List<Appointment> appointments = service.getAppointmentsByDoctor(doctorId);
        return ResponseEntity.ok(appointments);
    }

}

