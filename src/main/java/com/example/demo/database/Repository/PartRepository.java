package com.example.demo.database.Repository;

import com.example.demo.database.Entity.PartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartRepository extends JpaRepository<PartEntity, Long> {
    List<PartEntity> findAllByBranch(Long branch);
}