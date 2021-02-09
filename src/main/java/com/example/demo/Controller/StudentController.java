package com.example.demo.Controller;

import java.util.*;

import com.example.demo.database.Entity.StudentDTO;
import com.example.demo.database.Repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Service
@CrossOrigin("*")

public class StudentController {
    
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/students")
    public HashMap<String, List<StudentDTO>> Studnets() {
        HashMap<String,List<StudentDTO>> result = new HashMap<>();
        List<StudentDTO> slist = studentRepository.findAll();
        result.put("listdata", slist);

        return result;
    }

    @GetMapping("/student/{no}")
    public HashMap<String, Optional<StudentDTO>> Studnet(@PathVariable Long no) {
        System.out.println("QWEQWEQWEQWEQWE  " + no);
        HashMap<String,Optional<StudentDTO>> result = new HashMap<>();
        Optional<StudentDTO> slist = studentRepository.findById(no);
        
        result.put("listdata", slist);

        return result;
    }

    @PostMapping("/ins_stu")
    public String addStudnet(@RequestBody StudentDTO student) {
        
        System.out.println(student.getEmail());
        StudentDTO result = studentRepository.save(student);

        return result.toString();
    }

    @DeleteMapping("/{no}")
    public void deleteStudent(@PathVariable Long no) {
        studentRepository.deleteById(no);
    }

    @PostMapping("/edit_stu/{no}")
    public void editStudent(@RequestBody StudentDTO student,@PathVariable Long no) {
        System.out.println(student.getHp());
        studentRepository.update(student);
    }
}
