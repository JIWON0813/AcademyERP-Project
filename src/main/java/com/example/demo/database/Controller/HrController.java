package com.example.demo.database.Controller;

import java.util.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import com.example.demo.database.DTO.EmployeeDTO;
import com.example.demo.database.DTO.LectureDTO;
import com.example.demo.database.Repository.HrMapper;
import com.example.demo.database.Repository.LectureMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.DateSelector;

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

    @GetMapping("/salary_emp/{no}")
    public HashMap<String, List> SalaryEmp(@PathVariable int no) {
        System.out.println(no);
        HashMap<String, List> result = new HashMap<>();
        List<EmployeeDTO> list = hrmapper.getSalEmp(no);
        result.put("list", list);
        return result;
    }

    @GetMapping("/lec_time/{no}")
    public HashMap<String, List> Lecture(@PathVariable int no) throws ParseException {
        System.out.println(no);
        HashMap<String, List> result = new HashMap<>();
        List<LectureDTO> list = lectureMapper.getTime(no);
        // System.out.println(list.get(0).toString());
        DateSelector dr = new DateSelector();
        List<String> slist = dr.Iteratoring(list);
        System.out.println("////////"+ slist.get(0));
        result.put("list", slist);
        return result;
    }
    
}
