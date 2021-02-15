
package com.example.demo.database.Repository;

import com.example.demo.database.Entity.StudentEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface StudentRepository extends PagingAndSortingRepository<StudentEntity, Long> {
    @Transactional
    @Modifying
    @Query(value="update student set hp = :#{#student.hp},email = :#{#student.email},birth = :#{#student.birth},lecture = :#{#student.lecture} where no = :#{#student.no}", nativeQuery=true)
    Integer update(@Param("student") StudentEntity student);
        Page<StudentEntity> findAll(Pageable pageable);

    // //여진
    // List<StudentDTO> findAllByLecture(long lecture);
}

