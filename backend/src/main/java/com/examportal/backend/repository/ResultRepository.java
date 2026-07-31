package com.examportal.backend.repository;

import com.examportal.backend.entity.Result;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

    List<Result> findByUserIdOrderByExamDateDesc(Long userId);

    List<Result> findAllByOrderByExamDateDesc();

    @Query("SELECT MAX(r.percentage) FROM Result r WHERE r.user.id = ?1")
    Optional<Double> findMaxPercentageByUserId(Long userId);

    @Query("SELECT AVG(r.percentage) FROM Result r WHERE r.user.id = ?1")
    Optional<Double> findAvgPercentageByUserId(Long userId);

    @Query("SELECT MAX(r.percentage) FROM Result r")
    Optional<Double> findHighestScore();

    long countByUserId(Long userId);
}
