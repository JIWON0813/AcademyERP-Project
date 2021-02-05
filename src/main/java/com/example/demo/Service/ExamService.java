package com.example.demo.Service;

import com.example.demo.Entity.ExamEntity;
import com.example.demo.Repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;


    public  HashMap<String, Object> list(Long lecture) {
        HashMap<String, Object> result = new HashMap<>();
        List<ExamEntity> list = examRepository.findAllByLecture(lecture);
        int totalWeight = examRepository.totalWeight(lecture);
        result.put("totalWeight",totalWeight);
        result.put("list", list);
        return result;
    }

    public HashMap<String, Object> detail(Long id) {
        HashMap<String, Object> result = new HashMap<>();
        Optional<ExamEntity> list = examRepository.findById(id);
        result.put("list", list);
        return result;
    }

    public String write(ExamEntity exam) {
        ExamEntity result =  examRepository.save(exam);
        return result.toString();
    }

    public void delete(Long id) {
        examRepository.deleteById(id);

    }

    public String update(ExamEntity exam, Long id) {
        exam.setNo(id);
        ExamEntity result =  examRepository.save(exam);
        return result.toString();
    }

}