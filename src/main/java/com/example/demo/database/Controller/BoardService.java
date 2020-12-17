package com.example.demo.database.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.example.demo.database.DTO.BoardEntity;
import com.example.demo.database.Repository.BoardRepository;

@RestController
@RequestMapping(value = "/api")
@Service
public class BoardService {
	
	@Autowired
	private BoardRepository boardRepository;
	

	@GetMapping("/users")
    public HashMap<String,List> hello() {
		HashMap<String,List> result = new HashMap<>();
		List<BoardEntity> list = boardRepository.findAll();
        result.put("message", list);

        return result;
	}
	
	@GetMapping("/user")
    public HashMap<String,Optional> user(@RequestParam("id") Long id) {
		HashMap<String,Optional> result = new HashMap<>();
		Optional<BoardEntity> list = boardRepository.findById(id);
        result.put("message", list);

        return result;
	}
	

}