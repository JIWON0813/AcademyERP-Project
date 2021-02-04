package com.example.demo.Repository;

import com.example.demo.database.Entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
}
