package com.example.demo.database.Repository;

import com.example.demo.database.Entity.CostEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CostRepository extends JpaRepository<CostEntity, Long> {
    
}
