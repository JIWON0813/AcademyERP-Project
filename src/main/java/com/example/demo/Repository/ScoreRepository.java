package com.example.demo.Repository;

import com.example.demo.Entity.ScoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScoreRepository extends JpaRepository<ScoreEntity, Long> {

    Optional<ScoreEntity> findByStudentAndLectureAndExam(long student, long lecture,long exam);
}