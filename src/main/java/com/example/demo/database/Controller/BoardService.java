package com.example.demo.database.Controller;

import com.example.demo.database.DTO.*;
import com.example.demo.database.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api")
@Service
public class BoardService {
	
	@Autowired
	private BoardRepository boardRepository;

	@Autowired
	private departmentInter department;

	@GetMapping("/users")
    public Map<String,List<BoardEntity>> hello() {
		HashMap<String,List<BoardEntity>> result = new HashMap<>();
		List<BoardEntity> list = boardRepository.findAll();
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
	
	@GetMapping("/user")
    public Map<String,Optional<BoardEntity>> user(@RequestParam("id") Long id) {
		HashMap<String,Optional<BoardEntity>> result = new HashMap<>();
		Optional<BoardEntity> list = boardRepository.findById(id); 
        result.put("list", list);

        return result;
    }


}