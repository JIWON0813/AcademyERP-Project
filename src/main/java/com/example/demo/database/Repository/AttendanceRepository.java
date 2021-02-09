package com.example.demo.database.Repository;

import com.example.demo.database.DTO.AttendanceDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.database.Entity.*;

public interface AttendanceRepository extends JpaRepository<AttendanceEntity, Long> {

}
