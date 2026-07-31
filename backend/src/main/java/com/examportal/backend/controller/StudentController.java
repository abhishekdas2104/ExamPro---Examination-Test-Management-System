package com.examportal.backend.controller;

import com.examportal.backend.dto.*;
import com.examportal.backend.entity.User;
import com.examportal.backend.exception.UserNotFoundException;
import com.examportal.backend.repository.UserRepository;
import com.examportal.backend.service.ResultService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private ResultService resultService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/exam/submit")
    public ResponseEntity<ResultResponse> submitExam(
            @Valid @RequestBody ExamSubmitRequest request,
            Authentication authentication
    ) {

        String email = authentication.getName();

        return ResponseEntity.ok(resultService.submitExam(request, email));
    }

    @GetMapping("/results")
    public ResponseEntity<List<ResultResponse>> getMyResults(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + email));

        return ResponseEntity.ok(resultService.getStudentResults(user.getId()));
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getMyStats(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + email));

        return ResponseEntity.ok(resultService.getStudentStats(user.getId()));
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + email));

        user.setPassword(null);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getAvailableSubjects() {

        List<String> subjects = List.of(
            "Mathematics", "Science", "English", "History",
            "Computer Science", "Physics", "Chemistry", "Biology"
        );

        return ResponseEntity.ok(subjects);
    }
}
