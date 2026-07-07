package com.doctor_patient.consultant.entity;

public class RegisterRequest {
    public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}
	
	public String getPhone() {
		return phone;
	}

	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	private String name;
    private String email;
    private String password;
    private String phone;
    private Role role; // ADMIN, DOCTOR, PATIENT
}





