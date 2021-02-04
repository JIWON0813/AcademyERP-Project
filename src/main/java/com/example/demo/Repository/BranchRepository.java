package com.example.demo.Repository;

import com.example.demo.database.Entity.BranchEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BranchRepository extends JpaRepository<BranchEntity, Long> {

}