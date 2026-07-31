package com.examportal.backend.service;

import com.examportal.backend.dto.*;
import com.examportal.backend.entity.*;
import com.examportal.backend.exception.UserNotFoundException;
import com.examportal.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@SuppressWarnings("null")
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    private String normalizeAnswer(String ans) {
        if (ans == null) {
            return "";
        }
        String clean = ans.trim().toLowerCase();
        if (clean.startsWith("option")) {
            clean = clean.substring(6);
        }
        return clean.toUpperCase();
    }

    public ResultResponse submitExam(ExamSubmitRequest request, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + userEmail));

        List<Question> questions = questionRepository.findBySubject(request.getSubject());
        int total = questions.size();
        int correct = 0;

        Map<Long, String> userAnswers = request.getAnswers();

        for (Question q : questions) {
            String submittedValue = userAnswers.get(q.getId());
            if (submittedValue != null) {

                if (normalizeAnswer(q.getCorrectAnswer()).equals(normalizeAnswer(submittedValue))) {
                    correct++;
                }
            }
        }

        int wrong = total - correct;
        double percentage = total > 0 ? ((double) correct / total) * 100 : 0;

        Result result = Result.builder()
                .user(user)
                .studentName(user.getName())
                .subject(request.getSubject())
                .score(correct)
                .totalQuestions(total)
                .correctAnswers(correct)
                .wrongAnswers(wrong)
                .percentage(Math.round(percentage * 10.0) / 10.0)
                .examDate(LocalDateTime.now())
                .build();

        result = resultRepository.save(result);

        return toResponse(result);
    }

    public List<ResultResponse> getStudentResults(Long userId) {
        List<Result> results = resultRepository.findByUserIdOrderByExamDateDesc(userId);
        List<ResultResponse> responseList = new ArrayList<>();

        for (Result r : results) {
            responseList.add(toResponse(r));
        }

        return responseList;
    }

    public List<ResultResponse> getAllResults() {
        List<Result> results = resultRepository.findAllByOrderByExamDateDesc();
        List<ResultResponse> responseList = new ArrayList<>();

        for (Result r : results) {
            responseList.add(toResponse(r));
        }

        return responseList;
    }

    public DashboardStats getAdminStats() {
        long totalQ = questionRepository.count();
        long totalStudents = userRepository.countByRole(User.Role.STUDENT);
        long totalExams = resultRepository.count();
        double highestScore = resultRepository.findHighestScore().orElse(0.0);

        List<Result> allResults = resultRepository.findAll();
        double totalPercentageSum = 0.0;
        for (Result r : allResults) {
            totalPercentageSum += r.getPercentage();
        }
        double avgScore = allResults.isEmpty() ? 0.0 : totalPercentageSum / allResults.size();

        return DashboardStats.builder()
                .totalQuestions(totalQ)
                .totalStudents(totalStudents)
                .totalExamsAttempted(totalExams)
                .highestScore(Math.round(highestScore * 10.0) / 10.0)
                .averageScore(Math.round(avgScore * 10.0) / 10.0)
                .build();
    }

    public Map<String, Object> getStudentStats(Long userId) {
        long examsTaken = resultRepository.countByUserId(userId);
        double avgScore = resultRepository.findAvgPercentageByUserId(userId).orElse(0.0);
        double bestScore = resultRepository.findMaxPercentageByUserId(userId).orElse(0.0);

        Map<String, Object> stats = new HashMap<>();
        stats.put("examsTaken", examsTaken);
        stats.put("averageScore", Math.round(avgScore * 10.0) / 10.0);
        stats.put("bestScore", Math.round(bestScore * 10.0) / 10.0);
        return stats;
    }

    private ResultResponse toResponse(Result r) {
        String grade = calculateGrade(r.getPercentage());
        String message = getPerformanceMessage(r.getPercentage());

        List<Question> questions = questionRepository.findBySubject(r.getSubject());
        Map<Long, String> correctAnswersMap = new HashMap<>();
        for (Question q : questions) {
            correctAnswersMap.put(q.getId(), q.getCorrectAnswer());
        }

        return ResultResponse.builder()
                .id(r.getId())
                .userId(r.getUser().getId())
                .studentName(r.getStudentName())
                .subject(r.getSubject())
                .score(r.getScore())
                .totalQuestions(r.getTotalQuestions())
                .correctAnswers(r.getCorrectAnswers())
                .wrongAnswers(r.getWrongAnswers())
                .percentage(r.getPercentage())
                .grade(grade)
                .performanceMessage(message)
                .examDate(r.getExamDate())
                .correctAnswersMap(correctAnswersMap)
                .build();
    }

    private String calculateGrade(double pct) {
        if (pct >= 90) return "A+";
        if (pct >= 80) return "A";
        if (pct >= 70) return "B";
        if (pct >= 60) return "C";
        if (pct >= 50) return "D";
        return "F";
    }

    private String getPerformanceMessage(double pct) {
        if (pct >= 90) return "Outstanding! Excellent performance!";
        if (pct >= 75) return "Great job! Keep it up!";
        if (pct >= 60) return "Good effort! Room to improve.";
        if (pct >= 50) return "You passed! Practice more.";
        return "Keep studying. You can do better!";
    }
}
