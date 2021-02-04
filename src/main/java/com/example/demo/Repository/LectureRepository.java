package com.example.demo.Repository;

import com.example.demo.database.Entity.LectureEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LectureRepository extends JpaRepository<LectureEntity, Long> {

}