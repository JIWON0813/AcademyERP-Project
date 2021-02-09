package com.example.demo.database.Repository;

import com.example.demo.database.Entity.LectureEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LectureRepository extends JpaRepository<LectureEntity, Long> {
    List<LectureEntity> findAllByTeacher(Long teacher);
}