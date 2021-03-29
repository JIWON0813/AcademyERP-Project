package com.example.demo.Controller;


import com.example.demo.Service.EmployeeService;
import com.example.demo.database.Entity.EmployeeEntity;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "http://localhost:3000")
@Log
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/employee")
    public List<EmployeeEntity> getEmployeeList(@RequestBody HashMap map){
        log.info((String)map.get("currentPage"));
        log.info((String)map.get("size"));
        log.info((String)map.get("verify"));
        return employeeService.getEmployeeList(map);
    }

    @GetMapping("/employee/{id}")
    public EmployeeEntity getEmployee(@PathVariable Long id){
        return employeeService.getEmployee(id);
    }

    @PostMapping("/employee/insert")
    public int insertEmployee(@RequestBody EmployeeEntity employee){
        return employeeService.insertEmployee(employee);
    }

    @DeleteMapping("/employee")
    public void deleteEmployee(@RequestParam Long no){
        employeeService.deleteEmployee(no);
    }

    @PutMapping("/permitEmployee")
    public int permitEmployee(@RequestBody EmployeeEntity employee){
        return employeeService.permitEmployee(employee);
    }

}
