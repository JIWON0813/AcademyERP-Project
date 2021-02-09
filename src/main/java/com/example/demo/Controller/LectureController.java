package com.example.demo.Controller;

import com.example.demo.database.DTO.LecturePagingVO;
import com.example.demo.database.Entity.LectureEntity;
import com.example.demo.Service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping(value = "/")
@CrossOrigin("*")
public class LectureController {

    @Autowired
    private LectureService lectureService;

    @GetMapping("/lecture")
    public HashMap<String, Object> list(
            LecturePagingVO vo,
            @RequestParam("branch") String branch,
            @RequestParam("condition") String condition,
            @RequestParam("keyword") String keyword,
            @RequestParam("currentPageNo") int currentPageNo,
            @RequestParam("recordsPerPage") int recordsPerPage) {
        vo.setCurrentPageNo(currentPageNo);
        vo.setRecordsPerPage(recordsPerPage);
        return lectureService.list(branch, condition, keyword,vo);
    }


    @GetMapping("/lecture/{id}")
    public HashMap<String, Object> detail(@PathVariable("id") Long id) {

        return lectureService.detail(id);
    }

    @PostMapping("/lecture")
    public String write(@RequestBody LectureEntity lec) {
        return lectureService.write(lec);
    }

    @DeleteMapping("/lecture/{id}")
    public void delete(@PathVariable("id") Long id) {
        lectureService.delete(id);

    }

    @PutMapping("lecture/{id}")
    public String update(@RequestBody LectureEntity lec, @PathVariable("id") Long id) {
        return lectureService.update(lec, id);
    }

    @GetMapping("/lecture/branches")
    public HashMap<String, List> selectBranch() {
        return lectureService.selectBranch();
    }


    @GetMapping("/lecture/select")
    public HashMap<String, Object> selectTeacher(@RequestParam("branch") Long branch) {
        return lectureService.selectList(branch);
    }

    @GetMapping("/lecture/teacher/{teacher}")
    public HashMap<String, Object> selectLecture(@PathVariable("teacher") Long teacher) {
        return lectureService.getTeacherLecture(teacher);
    }

}