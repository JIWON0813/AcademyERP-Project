package com.example.demo.database.Controller;

import java.util.*;

import com.example.demo.database.DTO.LectureDTO;
import com.example.demo.database.DTO.Stu_AttDTO;

import com.example.demo.database.DTO.StudentDTO;
import com.example.demo.database.Repository.StuAttMapper;
import com.example.demo.database.Repository.Stu_AttRepository;
import com.example.demo.database.Repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Autowired
    // private Stu_AttRepository stu_attRepository;
    private StuAttMapper stuattmapper;

    @GetMapping("/students")
    public Page<StudentDTO> Students(Pageable pageable) {
        return studentRepository.findAll(pageable);
        
    }

    // @GetMapping("/students")
    // public HashMap<String, List<StudentDTO>> Students() {
    //     HashMap<String,List<StudentDTO>> result = new HashMap<>();
    //     List<StudentDTO> slist = studentRepository.findAll();
    //     result.put("listdata", slist);

    //     return result;
    // }

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

    @GetMapping("/stu_att/{name}")
    public HashMap<String, List> Stu_att(@PathVariable String name) {
        System.out.println("QWEQWEQWEQWEQWE  " + name);
        HashMap<String,List> result = new HashMap<>();
        List<Stu_AttDTO> alist = stuattmapper.getAtt(name);
        
        result.put("attdata", alist);

        return result;
    }

    @GetMapping("/stu_att")
    public HashMap<String, List> Leclist() {
        HashMap<String,List> result = new HashMap<>();
        List<LectureDTO> alist = stuattmapper.getLec();
        result.put("lecdata", alist);
        return result;
    }
}
