package com.example.demo.Controller;

import com.example.demo.database.Entity.CurriculumEntity;
import com.example.demo.database.Repository.CurriculumRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
@Service
@CrossOrigin("*")
public class CurriculumController {
    @Autowired
    private CurriculumRepository curriculumRepository;

    @PostMapping("/ins_curri")
    public String write(@RequestBody CurriculumEntity cur) {
        CurriculumEntity result =  curriculumRepository.save(cur);
        return result.toString();
    }

    @GetMapping("/getcurri/{lecture}")
    public Page<CurriculumEntity> getCurri(@PathVariable int lecture,Pageable pageable) {
        lecture = 5;
        return curriculumRepository.findAll(pageable,lecture);
    }
}
