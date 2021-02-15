package com.example.demo.Service;

import com.example.demo.database.DTO.StudentDTO;
import com.example.demo.database.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // //여진
    // public HashMap<String, List> getStudentList(Long lecture) {
    //     HashMap<String,List> result = new HashMap<>();
    //     List<StudentDTO> studentList = studentRepository.findAllByLecture(lecture);
    //     result.put("studentList",studentList);

    //     return result;
    // }
}

