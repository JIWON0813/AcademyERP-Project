package com.example.demo.Repository;

import com.example.demo.Entity.CounselingEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface CounselingRepository extends JpaRepository<CounselingEntity, Long> {

    List<CounselingEntity> findAllByStudentAndLecture(long student, long lecture);

}