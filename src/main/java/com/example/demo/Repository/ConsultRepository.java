package com.example.demo.Repository;
import com.example.demo.Entity.ConsultEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultRepository extends JpaRepository<ConsultEntity, Long> {

}