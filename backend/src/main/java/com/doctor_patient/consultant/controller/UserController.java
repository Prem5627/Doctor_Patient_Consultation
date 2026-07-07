package com.doctor_patient.consultant.controller;

import com.doctor_patient.consultant.entity.User;
import com.doctor_patient.consultant.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin ("*")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.createUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // 🔹 New API for Doctors
    @GetMapping("/doctors")
    public ResponseEntity<List<User>> getAllDoctors() {
        return ResponseEntity.ok(userService.getAllDoctors());
    }
    
 // 🔹 Get a single doctor by ID
    @GetMapping("/doctor/{id}")
    public ResponseEntity<User> getDoctorById(@PathVariable Long id) {
        return userService.getDoctorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}

