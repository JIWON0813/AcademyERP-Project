
package com.example.demo.database.Repository;

import com.example.demo.database.Entity.CurriculumEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CurriculumRepository extends PagingAndSortingRepository<CurriculumEntity, Long> {
    @Transactional
    @Modifying

        Page<CurriculumEntity> findAll(Pageable pageable);
        @Query(value="select * from curriculum c where c.lecture = :#{#lecture}",nativeQuery=true)
        Page<CurriculumEntity> findAll(Pageable pageable, @Param("lecture") int lecture);
}

