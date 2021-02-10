/*
package com.example.demo.database.Repository;

import com.example.demo.database.DTO.StudentDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface StudentRepository extends JpaRepository<StudentDTO, Long> {
    @Transactional
    @Modifying
    @Query(value="update student set hp = :#{#student.hp},email = :#{#student.email},birth = :#{#student.birth},curri = :#{#student.curri} where no = :#{#student.no}", nativeQuery=true)
    Integer update(@Param("student") StudentDTO student);


    //여진
    List<StudentDTO> findAllByLecture(long lecture);
}
*/
