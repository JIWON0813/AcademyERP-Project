package com.example.demo.Controller;

import java.util.*;
import java.text.ParseException;

import com.example.demo.database.DTO.EmployeeDTO;
import com.example.demo.database.DTO.LectureDTO;
import com.example.demo.database.Mapper.HrMapper;
import com.example.demo.database.Mapper.LectureMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.DateSelector;

@RestController
@RequestMapping("/api")
@Service
@CrossOrigin("*")

public class HrController {

    @Autowired
    private HrMapper hrmapper;

    @Autowired
    private LectureMapper lectureMapper;

    @GetMapping("/salary")
    public HashMap<String, List> Salary() {
        HashMap<String, List> result = new HashMap<>();
        List<EmployeeDTO> list = hrmapper.getSal();
        result.put("list", list);
        return result;
    }

    @GetMapping("/sal_edit/{no}")
    public HashMap<String, List> SalaryEmp(@PathVariable int no) {
        System.out.println(no);
        HashMap<String, List> result = new HashMap<>();
        List<EmployeeDTO> list = hrmapper.getSalEmp(no);
        result.put("list", list);
        return result;
    }

    @PostMapping("/sal_edit_com/{name}")
    public int salaryEdit(@RequestBody EmployeeDTO employee ,@PathVariable String name){
        System.out.println(name);
        EmployeeDTO list = employee;
        list.setName(employee.getName());
        list.setSalary(employee.getSalary());
        System.out.println(list.getName());
        return hrmapper.updateSalary(list);
    }

    @GetMapping("/lec_time/{no}")
    public HashMap<String, List> Lecture(@PathVariable int no) throws ParseException {
        System.out.println(no);
        HashMap<String, List> result = new HashMap<>();
        List<LectureDTO> list = lectureMapper.getTime(no);
        // System.out.println(list.get(0).toString());
        DateSelector ds = new DateSelector();
        List<String> slist = ds.Iteratoring(list);
        System.out.println("////////"+ slist.get(0));
        result.put("list", slist);
        return result;
    }

}
