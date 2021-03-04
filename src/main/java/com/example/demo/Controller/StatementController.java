package com.example.demo.Controller;

import com.example.demo.Service.StatementService;
import com.example.demo.database.DTO.StatementDTO;
import com.example.demo.database.Entity.*;
import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RequestMapping(value = "/")
@CrossOrigin("*")
@RestController
public class StatementController {
    @Autowired
    private StatementService statementService;

    @GetMapping("/statement")
    public HashMap<String,List> list(@RequestParam("user") Long user) {

        return statementService.list(user);
    }

    @GetMapping("/statement/{id}")
    public HashMap<String,Object> details(@PathVariable("id") Long id) {
        return statementService.detail(id);
    }

    @PostMapping("/statement")
    public void create(@RequestBody StatementDTO statement)
    {
        statementService.create(statement);
    };


    @PutMapping("/statement/{id}")
    public void update(@RequestBody StatementDTO dto, @PathVariable("id") Long id) {
        statementService.update(id, dto);
    }

    @DeleteMapping("/statement/{id}")
    public void delete(@PathVariable("id") Long id) {
        statementService.delete(id);
    }
}
