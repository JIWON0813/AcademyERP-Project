package com.example.demo.Repository;

import com.example.demo.Entity.ExamEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamRepository extends JpaRepository<ExamEntity, Long> {

    List<ExamEntity> findAllByLecture(long lecture);
}