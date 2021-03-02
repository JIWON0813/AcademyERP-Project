//---------------------------------
// 제목 : 수납관리(직원-재무)
// 파일명 : ReceiveController.java
// 작성자 : 최인아
//---------------------------------
package com.example.demo.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Optional; 

import com.example.demo.database.Entity.ReceiveEntity;
import com.example.demo.Service.LectureService;
import com.example.demo.Service.ReceiveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/")
@CrossOrigin("*")
public class ReceiveController {

    @Autowired
    private ReceiveService receiveService;

    @Autowired
    private LectureService lectureService;

    @GetMapping("/receive")
    public HashMap<String, Object> list() {
        return receiveService.list();
    }

    @PostMapping("/receive")
    public String insert(@RequestBody ReceiveEntity rec) {
        return receiveService.insert(rec); 
    }  
    
    //--상세보기
    @GetMapping("/receivedetail")
    public HashMap<String, Optional> detail(@RequestParam("id") Long id) {
        return receiveService.detail(id);    
    }

    @GetMapping("/receive/branches")
    public HashMap<String, List> selectBranch() {
        return receiveService.selectBranch();
    }

    //--삭제
    @DeleteMapping("/receive/{id}")
    public void delete(@PathVariable("id") Long id) {
        receiveService.delete(id);
    }

    // @GetMapping("/lecture/select")
    // public HashMap<String, Object> selectTeacher(@RequestParam("lecture") Long lecture) {
    //     return receiveService.selectList(lecture);
    // }

    // @GetMapping("/receive/student")
    // public HashMap<String, List> selectStudent() {
    //     return receiveService.selectStudent();
    // }

    
}
