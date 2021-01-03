package com.example.demo.Controller;

import com.example.demo.DTO.PagingVO;
import com.example.demo.Entity.LectureEntity;
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
    public HashMap<String, Object> list(PagingVO vo
		, @RequestParam(value="currentPageNo", required=false)int currentPageNo
		, @RequestParam(value="recordsPerPage", required=false)int recordsPerPage) {
        vo.setCurrentPageNo(currentPageNo);
        vo.setRecordsPerPage(recordsPerPage);


        return lectureService.list(vo);
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

    @GetMapping("/branches")
    public HashMap<String, List> selectBranch() {
        return lectureService.selectBranch();
    }

    @GetMapping("/list")
    public HashMap<String, List> selectList(@RequestParam("branch") int branch) {
        return lectureService.selectList(branch);
    }

    @GetMapping("/teacher")
    public HashMap<String, List> selectTeacher(@RequestParam("branch") int branch) {
        return lectureService.selectTeacher(branch);
    }

    @GetMapping("/room")
    public HashMap<String, List> selectRoom(@RequestParam("branch") int branch) {
        return lectureService.selectRoom(branch);
    }

    @GetMapping("/part")
    public HashMap<String, List> selectPart(@RequestParam("branch") int branch) {
        return lectureService.selectPart(branch);
    }

    @GetMapping("/lectureSearch")
    public HashMap<String, List> searchList(
            @RequestParam("branch") String branch,
            @RequestParam("condition") String condition,
            @RequestParam("keyword") String keyword) {
        return lectureService.searchList(branch, condition, keyword);
    }
}