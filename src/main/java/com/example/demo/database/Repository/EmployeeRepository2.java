package com.example.demo.database.Repository;

import javax.transaction.Transactional;

import com.example.demo.database.Entity.EmployeeEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository2 extends PagingAndSortingRepository<EmployeeEntity, Long> {
    
    //세호
    @Transactional
    @Modifying
        Page<EmployeeEntity> findAll(Pageable pageable);
        @Query(value="select * from employee e where e.name = :#{#searchKey}",nativeQuery=true)
        Page<EmployeeEntity> findAll(Pageable pageable, @Param("searchKey") String searchKey);
}
