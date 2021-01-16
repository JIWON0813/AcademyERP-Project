package com.example.demo.database.Controller;


import com.example.demo.database.DTO.EmployeeEntity;
import com.example.demo.database.Repository.EmployeeRepository;
import com.example.demo.database.Service.EmployeeService;
import lombok.extern.flogger.Flogger;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/employee")
    public Page<EmployeeEntity> getEmployeeList(Pageable pageable){
        return employeeService.getEmployeeList(pageable);
    }



}
