package com.example.demo.database.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.database.Service.*;
import com.example.demo.database.DTO.*;

@RestController
public class VacationApplyController {
    @Autowired
	private VacationApplyService VacationApplyService;

	@PostMapping("/Vacation_apply")
    public int insert (@RequestBody VacationApplyEntity param){
        return VacationApplyService.insert(param);
    }
}