package com.example.demo.Service;

import com.example.demo.database.DTO.StudentDTO;
import com.example.demo.database.Entity.LectureEntity;
import com.example.demo.database.Entity.StudentEntity;
import com.example.demo.database.Mapper.StuAttMapper;
import com.example.demo.database.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StuAttMapper stuAttMapper;

    //여진
    public HashMap<String, List> getStudentList(Long lecture) {
        HashMap<String,List> result = new HashMap<>();
        List<StudentEntity> studentList = studentRepository.findAllByLecture(lecture);
        result.put("studentList",studentList);

        return result;
    }
    public HashMap<String, List> getStudentSearch(String name) {
        HashMap<String,List> result = new HashMap<>();
        System.out.println(name);
        List<StudentEntity> studentList = studentRepository.findAllByNameContaining(name);
        System.out.println(studentList);
        result.put("studentList",studentList);
        return result;
    }
    public HashMap<String,List> getPayList(long student) {
        HashMap<String,List> result = new HashMap<>();
        List<StudentDTO> payList = stuAttMapper.getPayList(student);
        result.put("payList",payList);
        return result;
    }
}
