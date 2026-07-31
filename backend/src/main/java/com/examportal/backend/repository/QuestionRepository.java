package com.examportal.backend.repository;

import com.examportal.backend.entity.Question;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findBySubject(String subject);

    List<Question> findByDifficultyLevel(Question.DifficultyLevel difficultyLevel);

    List<Question> findBySubjectAndDifficultyLevel(String subject, Question.DifficultyLevel difficultyLevel);

    List<Question> findByQuestionTitleContainingIgnoreCase(String keyword);

    long countBySubject(String subject);
}
