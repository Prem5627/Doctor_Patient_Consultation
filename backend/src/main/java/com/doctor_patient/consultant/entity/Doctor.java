package com.doctor_patient.consultant.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign key to User table
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String specialty;

    @Column(name = "experience_years")
    private int experienceYears;

    // Store availability as JSON or simple string
    @Column(columnDefinition = "TEXT")
    private String availability;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status")
    private VerificationStatus verificationStatus;

    @Column(name = "license_file_url")
    private String licenseFileUrl;

    @Column(name = "id_file_url")
    private String idFileUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Doctor() {}

    public Doctor(User user, String specialty, int experienceYears, String availability,
                  VerificationStatus verificationStatus, String licenseFileUrl,
                  String idFileUrl, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.user = user;
        this.specialty = specialty;
        this.experienceYears = experienceYears;
        this.availability = availability;
        this.verificationStatus = verificationStatus;
        this.licenseFileUrl = licenseFileUrl;
        this.idFileUrl = idFileUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }

    public int getExperienceYears() { return experienceYears; }
    public void setExperienceYears(int experienceYears) { this.experienceYears = experienceYears; }

    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }

    public VerificationStatus getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(VerificationStatus verificationStatus) { this.verificationStatus = verificationStatus; }

    public String getLicenseFileUrl() { return licenseFileUrl; }
    public void setLicenseFileUrl(String licenseFileUrl) { this.licenseFileUrl = licenseFileUrl; }

    public String getIdFileUrl() { return idFileUrl; }
    public void setIdFileUrl(String idFileUrl) { this.idFileUrl = idFileUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Enum for verification status
    public enum VerificationStatus {
        PENDING,
        APPROVED,
        REJECTED
    }
}
