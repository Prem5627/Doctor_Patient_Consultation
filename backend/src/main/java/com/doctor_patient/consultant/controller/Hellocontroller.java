package com.doctor_patient.consultant.controller;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Simple Spring Boot REST Controller to verify the application is running.
 * This class maps the root URL ("/") to a status message.
 */
@RestController
public class Hellocontroller {

    /**
     * Handles GET requests to the root path ("/").
     * @return A status message indicating the application is working.
     */
    @GetMapping("/")
    public String home() {
        return "Hello! This Spring Boot page is working and ready for deployment.";
    }
}
