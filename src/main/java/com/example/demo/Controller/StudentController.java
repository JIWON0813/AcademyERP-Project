package com.example.demo.Controller;

import java.util.*;

import com.example.demo.Service.StudentService;
import com.example.demo.database.DTO.LectureDTO;
import com.example.demo.database.DTO.Stu_AttDTO;
import com.example.demo.database.DTO.StudentDTO;
import com.example.demo.database.Entity.LectureEntity;
import com.example.demo.database.Entity.StudentEntity;
import com.example.demo.database.Mapper.StuAttMapper;
import com.example.demo.database.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Service
@CrossOrigin("*")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentService studentService;

    @Autowired
    private StuAttMapper stuattmapper;
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
        List<LectureDTO> list = stuattmapper.getLec();
        result.put("list", list);
        return result;
    }

    @GetMapping("/ins_att/{lec}")
    public HashMap<String, List> LecStulist(@PathVariable String lec) {
        System.out.println("asdasdasd" + lec);
        HashMap<String,List> result = new HashMap<>();
        List<StudentDTO> list = stuattmapper.getLecStu(lec);
        result.put("list", list);
        return result;
    }

    @GetMapping("/searchStudent/{searchKey}")
    public Page<StudentEntity> searchStudent(@PathVariable String searchKey,Pageable pageable) {
        return studentRepository.findAll(pageable,searchKey);
    }


    //여진
    @GetMapping("/students/{lecture}")
    public HashMap<String, List> studentList(@PathVariable("lecture") Long lecture) {
        return studentService.getStudentList(lecture);
    }
    @GetMapping("/students/user")
    public HashMap<String, List> studentSearch(@RequestParam("name") String name) {
        return studentService.getStudentSearch(name);
    }
    @GetMapping("/students/user/{student}")
    public HashMap<String,List> payList(@PathVariable("student") long student) {
        return studentService.getPayList(student);
    }
}

