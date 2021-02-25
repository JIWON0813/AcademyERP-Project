package com.example.demo.database.Repository;


import com.example.demo.database.Entity.Stu_AttEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Stu_AttRepository extends JpaRepository <Stu_AttEntity, Long> {
    //Optional<Stu_AttDTO> findByName(String name);
}