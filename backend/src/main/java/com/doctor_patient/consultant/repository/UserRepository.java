package com.doctor_patient.consultant.repository;



import com.doctor_patient.consultant.*;
import com.doctor_patient.consultant.entity.Role;
import com.doctor_patient.consultant.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    // Fetch only doctors
    List<User> findByRole(Role role);
    
    Optional<User> findByIdAndRole(Long id, Role role);

}
