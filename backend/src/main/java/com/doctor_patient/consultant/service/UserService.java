package com.doctor_patient.consultant.service;

import com.doctor_patient.consultant.entity.Role;
import com.doctor_patient.consultant.entity.User;
import com.doctor_patient.consultant.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // Create User
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // hash password
        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    // 🔹 Only doctors
    public List<User> getAllDoctors() {
        return userRepository.findByRole(Role.DOCTOR);
    }
    
    public Optional<User> getDoctorById(Long id) {
        return userRepository.findByIdAndRole(id, Role.DOCTOR);
    }

}
