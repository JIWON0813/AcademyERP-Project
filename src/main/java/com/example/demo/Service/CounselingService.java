package com.example.demo.Service;

import com.example.demo.Entity.*;
import com.example.demo.Repository.CounselingRepository;
import com.example.demo.Repository.LectureRepository;
import com.example.demo.Repository.ScoreRepository;
import com.example.demo.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@Service
public class CounselingService {

    @Autowired
    private CounselingRepository counselingRepository;

    public HashMap<String,List> getCounselingList(Long student,Long lecture) {
        HashMap<String,List> result = new HashMap<>();
        List<CounselingEntity> counselingList = counselingRepository.findAllByStudentAndLecture(student,lecture);
        result.put("counselingList",counselingList);

        return result;
    }

    public HashMap<String,Optional> getCounseling(Long id) {
        HashMap<String,Optional> result = new HashMap<>();
        Optional<CounselingEntity> list = counselingRepository.findById(id);
        result.put("list", list);
        return result;
    }

    public void write(CounselingEntity counseling) {

        counselingRepository.save(counseling);
    }

    public void delete(Long id) {
        counselingRepository.deleteById(id);

    }
    public void update(CounselingEntity counseling, Long id) {
        counseling.setNo(id);
        counselingRepository.save(counseling);
    }


}