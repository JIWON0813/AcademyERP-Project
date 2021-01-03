package com.example.demo.Repository;

import javax.transaction.Transactional;

import com.example.demo.Entity.StudentDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentRepository extends JpaRepository<StudentDTO, Long> {
    
    @Transactional
    @Modifying
    @Query(value="update student set hp = :#{#student.hp},email = :#{#student.email},birth = :#{#student.birth},curri = :#{#student.curri} where no = :#{#student.no}", nativeQuery=true)
    Integer update(@Param("student") StudentDTO student);

}
