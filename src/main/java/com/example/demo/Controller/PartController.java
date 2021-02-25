package com.example.demo.Controller;

import com.example.demo.database.Entity.PartEntity;
import com.example.demo.Service.PartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@RestController
@RequestMapping(value = "/")
@CrossOrigin("*")
public class PartController {

    @Autowired
    private PartService partService;

    @GetMapping("/part/{id}")
    public HashMap<String, Object> detail(@PathVariable("id") Long id) {
        return partService.detail(id);
    }

    @PostMapping("/part")
    public String write(@RequestBody PartEntity part) {
        return partService.write(part);
    }

    @DeleteMapping("/part/{id}")
    public void delete(@PathVariable("id") Long id) {
        partService.delete(id);
    }

    @PutMapping("/part/{id}")
    public String update(@RequestBody PartEntity part, @PathVariable("id") Long id) {
        return partService.update(part, id);
    }

}