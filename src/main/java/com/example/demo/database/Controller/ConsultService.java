package com.example.demo.database.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.example.demo.database.DTO.ConsultEntity;
import com.example.demo.database.Repository.ConsultRepository;


@RestController
@RequestMapping(value = "/api2")
@Service
@CrossOrigin("*")
public class ConsultService {

    @Autowired
    private ConsultRepository consultRepository;

    @GetMapping("/consult")
    public HashMap<String,List> list() {
        HashMap<String,List> result = new HashMap<>();
        List<ConsultEntity> list = consultRepository.findAll();
        result.put("message", list);
        return result;
    }

    @GetMapping("/consult/{id}")
    public HashMap<String, Optional> detail(@PathVariable("id") Long id) {
        HashMap<String, Optional> result = new HashMap<>();
        Optional<ConsultEntity> list = consultRepository.findById(id);
        result.put("message", list);

        return result;
    }

    @PostMapping("/consult")
    public String write(@RequestBody ConsultEntity con) {
        ConsultEntity result =  consultRepository.save(con);
        return result.toString();
    }

    @DeleteMapping("/consult/{id}")
    public void delete(@PathVariable("id") Long id) {
        consultRepository.deleteById(id);

    }

    @PutMapping("consult/edit/{id}")
    public String update(@RequestBody ConsultEntity con,@PathVariable("id") Long id) {
        con.setNo(id);
        ConsultEntity result =  consultRepository.save(con);
        return result.toString(); 
    }

}