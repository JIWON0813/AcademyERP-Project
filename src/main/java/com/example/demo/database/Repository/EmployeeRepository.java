package com.example.demo.database.Repository;

import com.example.demo.database.DTO.EmployeeEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {

} 