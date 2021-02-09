package com.example.demo.database.Repository;

import com.example.demo.database.Entity.ExamEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExamRepository extends JpaRepository<ExamEntity, Long> {

    List<ExamEntity> findAllByLecture(long lecture);

    @Query(value = "SELECT SUM(e.weight) FROM exam e where e.lecture=:lecture",nativeQuery = true)
    int totalWeight(@Param("lecture") long lecture);
}