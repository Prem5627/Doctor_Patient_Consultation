package com.doctor_patient.consultant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.doctor_patient.consultant.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctorId(Long doctorId);
    List<Appointment> findByPatientId(Long patientId);
}
