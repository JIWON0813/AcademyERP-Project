package com.example.demo.database.Repository;

import com.example.demo.database.Entity.StatementEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatementRepository extends JpaRepository<StatementEntity, Long> {

}