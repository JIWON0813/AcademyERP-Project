package com.example.demo.database.Controller;

import com.example.demo.database.DTO.LectureEntity;
import com.example.demo.database.Repository.LectureMapper;
import com.example.demo.database.Repository.LectureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(value = "/api2")
@Service
@CrossOrigin("*")
public class LectureService {
    @Autowired
    private LectureMapper lectureMapper;

    @Autowired
    private LectureRepository lectureRepository;

    @GetMapping("/lecture")
    public HashMap<String,List> list() {
        HashMap<String,List> result = new HashMap<>();
        List<LectureEntity> list = lectureRepository.findAll();
        result.put("message", list);
        return result;
    }

    @GetMapping("/lecture/{id}")
    public HashMap<String, Optional> detail(@PathVariable("id") Long id) {
        HashMap<String, Optional> result = new HashMap<>();
        Optional<LectureEntity> list = lectureRepository.findById(id);
        result.put("message", list);

        return result;
    }

    @PostMapping("/lecture")
    public String write(@RequestBody LectureEntity lec) {
        LectureEntity result =  lectureRepository.save(lec);
        return result.toString();
    }

    @DeleteMapping("/lecture/{id}")
    public void delete(@PathVariable("id") Long id) {
        lectureRepository.deleteById(id);

    }

    @PutMapping("lecture/edit/{id}")
    public String update(@RequestBody LectureEntity lec,@PathVariable("id") Long id) {
        lec.setNo(id);
        LectureEntity result =  lectureRepository.save(lec);
        return result.toString();
    }

  /*  @GetMapping("/branch")
    public Map<String,List<>> getBranch(){
        HashMap<String,List<>> result =new HashMap<>();
        HashMap<String,Object> to= new HashMap<>();

        return result;
    }*/
}