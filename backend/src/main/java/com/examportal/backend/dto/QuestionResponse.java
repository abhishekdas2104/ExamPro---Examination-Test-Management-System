package com.examportal.backend.dto;

import com.examportal.backend.entity.Question;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {

    private Long id;

    private String questionTitle;

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    private String subject;

    private Question.DifficultyLevel difficultyLevel;
}
