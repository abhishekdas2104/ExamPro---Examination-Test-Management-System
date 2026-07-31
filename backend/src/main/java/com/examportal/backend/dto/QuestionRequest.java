package com.examportal.backend.dto;

import com.examportal.backend.entity.Question;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Data;

@Data
public class QuestionRequest {

    @NotBlank(message = "Question title is required")
    private String questionTitle;

    @NotBlank(message = "Option A is required")
    private String optionA;

    @NotBlank(message = "Option B is required")
    private String optionB;

    @NotBlank(message = "Option C is required")
    private String optionC;

    @NotBlank(message = "Option D is required")
    private String optionD;

    @NotBlank(message = "Correct answer is required")
    private String correctAnswer;

    @NotBlank(message = "Subject is required")
    private String subject;

    @NotNull(message = "Difficulty level is required")
    private Question.DifficultyLevel difficultyLevel;
}
