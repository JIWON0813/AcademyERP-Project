package com.example.demo.database.Controller;

import com.example.demo.database.DTO.*;
import com.example.demo.database.Repository.LectureMapper;
import com.example.demo.database.Repository.LectureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


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
       List<LectureDTO> list = lectureMapper.getLectureList();
       result.put("message", list);
       return result;
   }

    @GetMapping("/lecture/{id}")
    public HashMap<String, Object> detail(@PathVariable("id") Long id) {
        HashMap<String, Object> result = new HashMap<>();
        LectureDTO list = lectureMapper.getListDetail(id);
        result.put("list", list);

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

    @GetMapping("/branches")
    public HashMap<String,List> selectBranch(){
        HashMap<String,List> result = new HashMap<>();
        List<BranchEntity> list = lectureMapper.getBranch();
        result.put("list", list);
        return result;
    }
    @GetMapping("/teacher")
    public HashMap<String,List> selectTeacher(@RequestParam("branch") int branch){
        HashMap<String,List> result = new HashMap<>();
        List<BoardEntity> list = lectureMapper.getTeacher(branch);
        result.put("list", list);
        return result;
    }
    @GetMapping("/room")
    public HashMap<String,List> selectRoom(@RequestParam("branch") int branch){
        HashMap<String,List> result = new HashMap<>();
        List<RoomEntity> list = lectureMapper.getRoom(branch);
        result.put("list", list);
        return result;
    }
}