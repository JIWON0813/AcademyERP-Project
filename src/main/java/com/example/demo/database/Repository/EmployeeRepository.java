package com.example.demo.database.Repository;


import com.example.demo.database.Entity.EmployeeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
    Page<EmployeeEntity> findByVerify(Pageable pageable, int verify);
}
