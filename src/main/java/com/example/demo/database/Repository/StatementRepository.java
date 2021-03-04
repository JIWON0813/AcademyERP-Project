package com.example.demo.database.Repository;

import com.example.demo.database.Entity.StatementEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StatementRepository extends JpaRepository<StatementEntity, Long> {

    List<StatementEntity> findAllByEmployee(Long user);

}