package com.examportal.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {

    private Long totalQuestions;

    private Long totalStudents;

    private Long totalExamsAttempted;

    private Double highestScore;

    private Double averageScore;
}
