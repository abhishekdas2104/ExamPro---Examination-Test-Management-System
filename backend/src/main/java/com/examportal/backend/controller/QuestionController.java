package com.examportal.backend.controller;

import com.examportal.backend.dto.QuestionRequest;
import com.examportal.backend.dto.QuestionResponse;
import com.examportal.backend.entity.Question;
import com.examportal.backend.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Question>> getAllQuestions(
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String search
    ) {

        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(questionService.searchQuestions(search));
        }

        if (subject != null || difficulty != null) {
            return ResponseEntity.ok(questionService.filterQuestions(subject, difficulty));
        }

        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/exam/{subject}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<QuestionResponse>> getExamQuestions(
            @PathVariable String subject
    ) {

        return ResponseEntity.ok(questionService.getQuestionsForExam(subject));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Question> getQuestionById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(questionService.getQuestionById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Question> addQuestion(
            @Valid @RequestBody QuestionRequest request
    ) {

        return ResponseEntity.status(HttpStatus.CREATED).body(questionService.addQuestion(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long id,
            @Valid @RequestBody QuestionRequest request
    ) {

        return ResponseEntity.ok(questionService.updateQuestion(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteQuestion(
            @PathVariable Long id
    ) {

        questionService.deleteQuestion(id);

        return ResponseEntity.ok(Map.of("message", "Question deleted successfully"));
    }
}
