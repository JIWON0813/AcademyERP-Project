package com.example.demo.Controller;

import com.example.demo.database.Entity.ConsultEntity;
import com.example.demo.Service.ConsultService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping(value = "/")
@CrossOrigin("*")
public class ConsultController {

    @Autowired
    private ConsultService consultService;

    @GetMapping("/consult")
    public HashMap<String, Object> list(@RequestParam("keyword") String keyword) {
        System.out.println("1111111111111111111");
        return consultService.list(keyword);
    }

    // @GetMapping("/consult/{id}")
    // public HashMap<String, Object> detail(@PathVariable("id") Long id) {
    //     System.out.println("11111111111121");
    //     return consultService.detail(id);
    // }

    @GetMapping("/consultdetail")
    public HashMap<String, Optional> detail(@RequestParam("id") Long id) {
        return consultService.detail(id);    
    }

    @PostMapping("/consult")
    public String write(@RequestBody ConsultEntity con) {
        return consultService.write(con);
    }

    @DeleteMapping("/consult/{id}")
    public void delete(@PathVariable("id") Long id) {
        consultService.delete(id);

    }

    @PutMapping("/consult/edit/{id}")
    public String update(@RequestBody ConsultEntity con, @PathVariable("id") Long id) {
        return consultService.update(con, id);

    }

}