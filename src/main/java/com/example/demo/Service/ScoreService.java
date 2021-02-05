package com.example.demo.Service;

import com.example.demo.Entity.LectureEntity;
import com.example.demo.Entity.ScoreEntity;
import com.example.demo.Entity.StudentDTO;
import com.example.demo.Repository.LectureRepository;
import com.example.demo.Repository.ScoreRepository;
import com.example.demo.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    public HashMap<String,Optional> getScoreList(Long student,Long lecture,Long exam) {
        HashMap<String,Optional> result = new HashMap<>();
        Optional<ScoreEntity> scoreList = scoreRepository.findByStudentAndLectureAndExam(student,lecture,exam);
        result.put("scoreList",scoreList);

        return result;
    }

    public HashMap<String,Object> getTotalScore(Long student,Long lecture) {
        HashMap<String,Object> result = new HashMap<>();
        int totalScore = scoreRepository.totalScore(student,lecture);
        result.put("totalScore",totalScore);
        return result;
    }

    public void write(List<ScoreEntity> score) {

        scoreRepository.saveAll(score);
    }

    public void delete(Long id) {
        scoreRepository.deleteById(id);

    }

    public void update(List<ScoreEntity> score) {
        scoreRepository.saveAll(score);
    }

}