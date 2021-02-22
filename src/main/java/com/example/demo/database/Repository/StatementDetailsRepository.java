package com.example.demo.database.Repository;

import com.example.demo.database.Entity.StatementDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StatementDetailsRepository extends JpaRepository<StatementDetailsEntity, Long> {
    List<StatementDetailsEntity> findAllByStatement(Long statement);
    void deleteByStatement(Long id);


}