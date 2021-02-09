package com.example.demo.database.Repository;

import com.example.demo.database.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LectureRepository extends JpaRepository<LectureEntity, Long> {

}