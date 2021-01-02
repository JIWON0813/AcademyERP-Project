package com.example.demo.database.Service;

import com.example.demo.database.DTO.EmployeeEntity;
import com.example.demo.database.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;


@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Page<EmployeeEntity> getEmployeeList(Pageable pageable){
        return employeeRepository.findAll(pageable);
    }


}
