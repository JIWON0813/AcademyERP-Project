package com.example.demo.Repository;

import com.example.demo.Entity.ScoreEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ScoreRepository extends JpaRepository<ScoreEntity, Long> {

    Optional<ScoreEntity> findByStudentAndLectureAndExam(long student, long lecture,long exam);

    @Query(value = "SELECT sum(a.score*(b.weight*0.01)) FROM score a " +
            "inner join exam b ON a.exam = b.no WHERE a.student =:student AND a.lecture =:lecture",nativeQuery = true)
    int totalScore(@Param("student") long student,
                   @Param("lecture") long lecture);
}