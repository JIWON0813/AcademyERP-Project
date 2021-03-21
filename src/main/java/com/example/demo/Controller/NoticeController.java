//---------------------------------
// 제목 : 공지사항
// 파일명 : NoticeController.java
// 작성자 : 최인아
//---------------------------------
package com.example.demo.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.example.demo.database.Entity.NoticeEntity;
import com.example.demo.Service.NoticeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/")
@CrossOrigin("*")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping("/notice")
    public HashMap<String, Object> list() {
        return noticeService.list();
    }

    @GetMapping("/noticedetail")
    public HashMap<String, Optional> detail(@RequestParam("id") Long id) {
        return noticeService.detail(id);    
    }

    @PostMapping("/notice")
    public String write(@RequestBody NoticeEntity not) {
        return noticeService.write(not);
    }

    @DeleteMapping("/notice/{id}")
    public void delete(@PathVariable("id") Long id) {
        noticeService.delete(id);
    }

    // @PutMapping("/notice/edit/{id}")
    // public String update(@RequestBody NoticeEntity not, @PathVariable("id") Long id) {
    //     return noticeService.update(not, id);
    // }

    // @GetMapping("/notice/employee")
    // public HashMap<String, List> selectEmployee() {
    //     return noticeService.selectEmployee();
    // }
    
}
