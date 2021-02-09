package com.example.demo.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import com.example.demo.database.DTO.*;
import com.example.demo.Service.*;

@RestController
public class AttController {
	
	@Autowired
	private AttService attservice;

	@GetMapping("/Attget")
    public Map<String,Optional<AttendanceEntity>> attget(@RequestParam("no") Long no) {
		HashMap<String,Optional<AttendanceEntity>> result = new HashMap<>();
        result.put("list", attservice.attget(no)); 

        return result;
	} 
	
	@PutMapping("/Attupdate/{no}")
	public String attupdate(@RequestBody AttendanceEntity dto ,@PathVariable("no") Long no){      
        return attservice.attput(no,dto);
	}

	

	@DeleteMapping("/Attupdate/{no}")
	public void attdelete(@PathVariable("no") Long no){
		attservice.attdelete(no);       
	}
	
	

} 