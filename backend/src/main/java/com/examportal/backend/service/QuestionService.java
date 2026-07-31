package com.examportal.backend.service;

import com.examportal.backend.dto.QuestionRequest;
import com.examportal.backend.dto.QuestionResponse;
import com.examportal.backend.entity.Question;
import com.examportal.backend.exception.QuestionNotFoundException;
import com.examportal.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@SuppressWarnings("null")
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new QuestionNotFoundException(id));
    }

    public List<QuestionResponse> getQuestionsForExam(String subject) {

        List<Question> questions = questionRepository.findBySubject(subject);

        List<QuestionResponse> responseList = new ArrayList<>();
        for (Question q : questions) {
            responseList.add(toResponse(q));
        }

        return responseList;
    }

    public List<Question> getQuestionsBySubject(String subject) {
        return questionRepository.findBySubject(subject);
    }

    public List<Question> searchQuestions(String keyword) {
        return questionRepository.findByQuestionTitleContainingIgnoreCase(keyword);
    }

    public List<Question> filterQuestions(String subject, String difficulty) {
        if (subject != null && difficulty != null) {
            return questionRepository.findBySubjectAndDifficultyLevel(
                    subject, Question.DifficultyLevel.valueOf(difficulty.toUpperCase()));
        } else if (subject != null) {
            return questionRepository.findBySubject(subject);
        } else if (difficulty != null) {
            return questionRepository.findByDifficultyLevel(
                    Question.DifficultyLevel.valueOf(difficulty.toUpperCase()));
        }
        return questionRepository.findAll();
    }

    public Question addQuestion(QuestionRequest request) {

        Question question = Question.builder()
                .questionTitle(request.getQuestionTitle())
                .optionA(request.getOptionA())
                .optionB(request.getOptionB())
                .optionC(request.getOptionC())
                .optionD(request.getOptionD())
                .correctAnswer(request.getCorrectAnswer())
                .subject(request.getSubject())
                .difficultyLevel(request.getDifficultyLevel())
                .build();

        return questionRepository.save(question);
    }

    public Question updateQuestion(Long id, QuestionRequest request) {

        Question question = getQuestionById(id);

        question.setQuestionTitle(request.getQuestionTitle());
        question.setOptionA(request.getOptionA());
        question.setOptionB(request.getOptionB());
        question.setOptionC(request.getOptionC());
        question.setOptionD(request.getOptionD());
        question.setCorrectAnswer(request.getCorrectAnswer());
        question.setSubject(request.getSubject());
        question.setDifficultyLevel(request.getDifficultyLevel());

        return questionRepository.save(question);
    }

    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new QuestionNotFoundException(id);
        }
        questionRepository.deleteById(id);
    }

    public long getTotalCount() {
        return questionRepository.count();
    }

    private QuestionResponse toResponse(Question q) {
        return QuestionResponse.builder()
                .id(q.getId())
                .questionTitle(q.getQuestionTitle())
                .optionA(q.getOptionA())
                .optionB(q.getOptionB())
                .optionC(q.getOptionC())
                .optionD(q.getOptionD())
                .subject(q.getSubject())
                .difficultyLevel(q.getDifficultyLevel())
                .build();
    }
}
