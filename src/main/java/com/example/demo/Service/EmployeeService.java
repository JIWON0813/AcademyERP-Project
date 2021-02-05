package com.example.demo.Service;

import com.example.demo.Repository.EmployeeRepository;
import com.example.demo.database.DTO.EmployeeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Page<EmployeeEntity> getEmployeeList(Pageable pageable){

        return employeeRepository.findAll(pageable);
    }



}
