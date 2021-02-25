package com.example.demo.database.Repository;
import com.example.demo.database.DTO.departmentDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface departmentInter extends JpaRepository<departmentDTO, Long> {

}