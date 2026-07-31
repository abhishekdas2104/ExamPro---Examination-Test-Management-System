package com.examportal.backend.controller;

import com.examportal.backend.dto.*;
import com.examportal.backend.entity.User;
import com.examportal.backend.repository.UserRepository;
import com.examportal.backend.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private ResultService resultService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(resultService.getAdminStats());
    }

    @GetMapping("/results")
    public ResponseEntity<List<ResultResponse>> getAllResults() {
        return ResponseEntity.ok(resultService.getAllResults());
    }

    @GetMapping("/students")
    public ResponseEntity<List<User>> getAllStudents() {
        return ResponseEntity.ok(userRepository.findAll()
                .stream()
                .filter(u -> u.getRole() == User.Role.STUDENT)
                .toList());
    }
}
