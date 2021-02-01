package com.example.demo.Repository;

import com.example.demo.Entity.PartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartRepository extends JpaRepository<PartEntity, Long> {

    List<PartEntity> findAllByBranch(Long branch);

}