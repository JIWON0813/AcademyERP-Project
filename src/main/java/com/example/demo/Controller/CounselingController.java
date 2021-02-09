package com.example.demo.Controller;

import com.example.demo.database.Entity.CounselingEntity;
import com.example.demo.Service.CounselingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(value = "/")
@CrossOrigin("*")
public class CounselingController {

    @Autowired
    private CounselingService counselingService;


    @GetMapping("/counseling")
    public HashMap<String, List> counselingList(@RequestParam("student") Long student,
                                                    @RequestParam("lecture") Long lecture)
     {
        return counselingService.getCounselingList(student, lecture);
    }

    @GetMapping("/counseling/{id}")
    public HashMap<String,Optional> counseling(@PathVariable("id") Long id) {
        return counselingService.getCounseling(id);
    }

    @PostMapping("/counseling")
    public void write(@RequestBody CounselingEntity counseling) {

        counselingService.write(counseling);
    }

    @DeleteMapping("/counseling/{id}")
    public void delete(@PathVariable("id") Long id) {
        counselingService.delete(id);

    }
    @PutMapping("/counseling/{id}")
    public void update(@RequestBody CounselingEntity counseling, @PathVariable("id") Long id) {
        counselingService.update(counseling, id);
    }

}