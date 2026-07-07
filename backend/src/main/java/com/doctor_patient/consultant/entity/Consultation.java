package com.doctor_patient.consultant.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "consultation")
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign key to Appointment
    @OneToOne
    @JoinColumn(name = "appointment_id", referencedColumnName = "id")
    private Appointment appointment;

    // Optional JSON chat history
    @Column(name = "chat_history", columnDefinition = "TEXT")
    private String chatHistory;

    // Optional video call link
    @Column(name = "video_call_link")
    private String videoCallLink;

    // Prescription file URL
    @Column(name = "prescription_file_url")
    private String prescriptionFileUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Consultation() {}

    public Consultation(Appointment appointment, String chatHistory, String videoCallLink,
                        String prescriptionFileUrl, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.appointment = appointment;
        this.chatHistory = chatHistory;
        this.videoCallLink = videoCallLink;
        this.prescriptionFileUrl = prescriptionFileUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Appointment getAppointment() { return appointment; }
    public void setAppointment(Appointment appointment) { this.appointment = appointment; }

    public String getChatHistory() { return chatHistory; }
    public void setChatHistory(String chatHistory) { this.chatHistory = chatHistory; }

    public String getVideoCallLink() { return videoCallLink; }
    public void setVideoCallLink(String videoCallLink) { this.videoCallLink = videoCallLink; }

    public String getPrescriptionFileUrl() { return prescriptionFileUrl; }
    public void setPrescriptionFileUrl(String prescriptionFileUrl) { this.prescriptionFileUrl = prescriptionFileUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

