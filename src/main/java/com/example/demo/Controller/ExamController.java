package com.example.demo.Controller;

import com.example.demo.database.Entity.ExamEntity;
import com.example.demo.database.Entity.PartEntity;
import com.example.demo.Service.ExamService;
import com.example.demo.Service.PartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@RestController
@RequestMapping(value = "/")
@CrossOrigin("*")
public class ExamController {

    @Autowired
    private ExamService examService;

    @GetMapping("/exam")
    public HashMap<String, Object> list(@RequestParam("lecture") Long lecture) {

        return examService.list(lecture);
    }

    @GetMapping("/exam/{id}")
    public HashMap<String, Object> detail(@PathVariable("id") Long id) {

        return examService.detail(id);
    }


    @PostMapping("/exam")
    public String write(@RequestBody ExamEntity exam) {

        return examService.write(exam);
    }

    @DeleteMapping("/exam/{id}")
    public void delete(@PathVariable("id") Long id) {
        examService.delete(id);

    }

    @PutMapping("/exam/{id}")
    public String update(@RequestBody ExamEntity exam, @PathVariable("id") Long id) {
        return examService.update(exam, id);
    }


}