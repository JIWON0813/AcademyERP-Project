package com.example.demo.Repository;

import com.example.demo.Entity.LectureEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LectureRepository extends JpaRepository<LectureEntity, Long> {
    List<LectureEntity> findAllByTeacher(Long teacher);
}