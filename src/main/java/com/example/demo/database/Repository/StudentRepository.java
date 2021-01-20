package com.example.demo.database.Repository;

import javax.transaction.Transactional;

import com.example.demo.database.DTO.StudentDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface StudentRepository extends PagingAndSortingRepository<StudentDTO, Long> {

    @Transactional
    @Modifying
    @Query(value="update student set hp = :#{#student.hp},email = :#{#student.email},birth = :#{#student.birth},lecture = :#{#student.lecture} where no = :#{#student.no}", nativeQuery=true)
    Integer update(@Param("student") StudentDTO student);

    Page<StudentDTO> findAll(Pageable pageable);

}
