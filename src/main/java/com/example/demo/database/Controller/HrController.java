package com.example.demo.database.Controller;

import java.util.*;

import com.example.demo.database.DTO.EmployeeDTO;
import com.example.demo.database.Repository.HrMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Service
@CrossOrigin("*")

public class HrController {

    @Autowired
    private HrMapper hrmapper;

    @GetMapping("/salary")
    public HashMap<String, List> Salary() {
        HashMap<String,List> result = new HashMap<>();
        List<EmployeeDTO> list = hrmapper.getSal();
        result.put("list", list);
        return result;
    }

    @GetMapping("/salary_emp/{no}")
    public HashMap<String, List> SalaryEmp(@PathVariable int no) {
        System.out.println(no);
        HashMap<String,List> result = new HashMap<>();
        List<EmployeeDTO> list = hrmapper.getSalEmp(no);
        result.put("list", list);
        return result;
    }
    
    
}
