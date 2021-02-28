package com.example.demo.database.Repository;

import com.example.demo.database.Entity.ReceiveEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceiveRepository extends JpaRepository<ReceiveEntity, Long> {
    
}
