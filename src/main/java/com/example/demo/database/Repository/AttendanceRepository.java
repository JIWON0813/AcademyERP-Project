package com.example.demo.database.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.database.DTO.*;

public interface AttendanceRepository extends JpaRepository<AttendanceDTO, Long> {

}
