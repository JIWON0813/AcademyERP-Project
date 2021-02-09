package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.example.demo.database.DTO.*;
import com.example.demo.database.Repository.*;
import com.example.demo.database.Entity.*;
@RestController
@RequestMapping(value = "/api")
@Service
public class UserController {
	
	@Autowired
	private EmployeeRepository boardRepository;
	
	@Autowired
	private departmentInter department;

	@GetMapping("/users")
    public HashMap<String,List> hello() {
		HashMap<String,List> result = new HashMap<>();
		List<EmployeeEntity> list = boardRepository.findAll();
        result.put("list", list);

        return result;
	}
	
	@GetMapping("/user")
    public HashMap<String,Optional> user(@RequestParam("id") Long id) {
		HashMap<String,Optional> result = new HashMap<>();
		Optional<EmployeeEntity> list = boardRepository.findById(id);
        result.put("list", list);

        return result;
	}
		
	@GetMapping("/depart")
	public Map<String,List<departmentDTO>> dep(){
		HashMap<String,List<departmentDTO>> result = new HashMap<>();
		List<departmentDTO> dep = department.findAll();
		result.put("depart", dep);
		return result;
	}
}