package com.example.demo.database.Repository;

import com.example.demo.database.Entity.CounselingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CounselingRepository extends JpaRepository<CounselingEntity, Long> {

    List<CounselingEntity> findAllByStudentAndLecture(long student, long lecture);

}