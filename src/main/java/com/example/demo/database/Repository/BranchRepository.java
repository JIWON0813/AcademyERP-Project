package com.example.demo.database.Repository;

import com.example.demo.database.DTO.BranchEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BranchRepository extends JpaRepository<BranchEntity, Long> {

}