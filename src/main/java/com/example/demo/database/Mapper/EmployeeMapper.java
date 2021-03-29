package com.example.demo.database.Mapper;

import com.example.demo.database.Entity.EmployeeEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface EmployeeMapper {
    List<EmployeeEntity> getEmployeeList(HashMap<String,Object> map);

}