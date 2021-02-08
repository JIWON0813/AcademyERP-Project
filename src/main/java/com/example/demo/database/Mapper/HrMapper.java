package com.example.demo.database.Mapper;

import com.example.demo.database.DTO.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface HrMapper {
    List<EmployeeDTO> getSal();
    List<EmployeeDTO> getSalEmp(int no);
}

