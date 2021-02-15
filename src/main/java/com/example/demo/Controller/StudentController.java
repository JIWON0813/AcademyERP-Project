package com.example.demo.Controller;

import java.util.*;

import com.example.demo.Service.StudentService;
import com.example.demo.database.Entity.StudentEntity;
//import com.example.demo.database.DTO.StudentDTO;
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
    private StudentService studentService;

    // @GetMapping("/students")
    // public HashMap<String, List<StudentEntity>> Studnets() {
    //     HashMap<String,List<StudentEntity>> result = new HashMap<>();
    //     List<StudentEntity> slist = studentRepository.findAll();
    //     result.put("listdata", slist);

    //     return result;
    // }

    @GetMapping("/students")
    public Page<StudentEntity> Studnets(Pageable pageable) {
        // HashMap<String,List<StudentEntity>> result = new HashMap<>();
            return studentRepository.findAll(pageable);
        

        
    }

    @GetMapping("/student/{no}")
    public HashMap<String, Optional<StudentEntity>> Studnet(@PathVariable Long no) {
        System.out.println("QWEQWEQWEQWEQWE  " + no);
        HashMap<String,Optional<StudentEntity>> result = new HashMap<>();
        Optional<StudentEntity> slist = studentRepository.findById(no);

        result.put("listdata", slist);

        return result;
    }

    @PostMapping("/ins_stu")
    public String addStudnet(@RequestBody StudentEntity student) {

        System.out.println(student.getEmail());
        StudentEntity result = studentRepository.save(student);

        return result.toString();
    }

    @DeleteMapping("/{no}")
    public void deleteStudent(@PathVariable Long no) {
        studentRepository.deleteById(no);
    }

 @PostMapping("/edit_stu/{no}")
    public void editStudent(@RequestBody StudentEntity student,@PathVariable Long no) {
        System.out.println(student.getHp());
        studentRepository.update(student);
    }


    // //여진
    // @GetMapping("/students/{lecture}")
    // public HashMap<String, List> studentList(@PathVariable("lecture") Long lecture) {
    //     return studentService.getStudentList(lecture);
    // }
}

