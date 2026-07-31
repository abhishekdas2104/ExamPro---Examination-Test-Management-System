package com.examportal.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultResponse {

    private Long id;

    private Long userId;

    private String studentName;

    private String subject;

    private Integer score;

    private Integer totalQuestions;

    private Integer correctAnswers;

    private Integer wrongAnswers;

    private Double percentage;

    private String grade;

    private String performanceMessage;

    private LocalDateTime examDate;

    private Map<Long, String> correctAnswersMap;
}
