package com.example.demo.database.Repository;

import com.example.demo.database.DTO.LectureEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LectureRepository extends JpaRepository<LectureEntity, Long> {

}