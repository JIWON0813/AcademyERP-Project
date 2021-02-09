package com.example.demo.database.Repository;

import com.example.demo.database.DTO.AttendanceDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<AttendanceDTO, Long> {

}
