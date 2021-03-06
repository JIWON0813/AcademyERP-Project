package com.example.demo.Controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import com.example.demo.database.Entity.*;
import com.example.demo.database.Repository.*;

@RestController
@Service
public class AttController {
	
	@Autowired
	private AttendanceRepository attRepo;

	@GetMapping("/Attget")
    public Map<String,Optional<AttendanceEntity>> attget(@RequestParam("no") Long no) {
		HashMap<String,Optional<AttendanceEntity>> result = new HashMap<>();
		Optional<AttendanceEntity> list = attRepo.findById(no);
        result.put("list", list); 

        return result;
	} 
	
	@PutMapping("/Attupdate/{no}")
	public String attupdate(@RequestBody AttendanceEntity dto ,@PathVariable("no") Long no){
		dto.setNo(no);
		AttendanceEntity result = attRepo.save(dto);
        return result.toString();
	}

	@DeleteMapping("/Attupdate/{no}")
	public int attdelete(@PathVariable("no") Long no){
		attRepo.deleteById(no);    
		return 1;      
	}
	
	

} 