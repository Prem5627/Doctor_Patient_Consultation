package com.doctor_patient.consultant.entity;

public class AuthResponse {
	private Long id;
    private String token;
    private String email;
    private String role;
    private String name;

    public AuthResponse(String token, String email, String role, Long id) {
        this.token = token;
        this.email = email;
        this.role = role;
        this.name = name;
        this.id = id;
    }

    // ✅ must have getters so JSON can be created
    public String getToken() { return token; }
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getName() { return name; }
}
