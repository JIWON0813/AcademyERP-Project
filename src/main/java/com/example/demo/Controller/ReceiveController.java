package com.example.demo.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.example.demo.database.Entity.ReceiveEntity;
import com.example.demo.Service.ReceiveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/")
@CrossOrigin("*")
public class ReceiveController {

    @Autowired
    private ReceiveService receiveService;

    @GetMapping("/receive")
    public HashMap<String, Object> list() {
        return receiveService.list();
    }

    @PostMapping("/receive")
    public String insert(@RequestBody ReceiveEntity rec) {
        return receiveService.insert(rec);
    }   

    @GetMapping("/receive/branches")
    public HashMap<String, List> selectBranch() {
        return receiveService.selectBranch();
    }

    
}
