package com.example.demo.Controller;


import com.example.demo.database.Entity.EmployeeEntity;
import com.example.demo.Service.EmployeeService;
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

    @PostMapping("/employee")
    public int insertEmployee(@RequestBody EmployeeEntity employee){
        return employeeService.insertEmployee(employee);

    }

}
