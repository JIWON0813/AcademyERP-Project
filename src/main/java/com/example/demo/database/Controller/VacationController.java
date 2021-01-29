package com.example.demo.database.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.*;

import com.example.demo.database.Service.*;
import com.example.demo.database.DTO.*;

@RestController
public class VacationController {
    @Autowired
	private VacationService VacationService;

	@GetMapping("/getVacation")
    public Map<String,List<VacationEntity>> getVacation() {
		HashMap<String,List<VacationEntity>> result = new HashMap<>();
        result.put("list", VacationService.getVacation()); 

        return result;
	} 
}
