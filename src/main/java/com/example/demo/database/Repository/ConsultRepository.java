package com.example.demo.database.Repository;
import com.example.demo.database.Entity.ConsultEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultRepository extends JpaRepository<ConsultEntity, Long> {

}