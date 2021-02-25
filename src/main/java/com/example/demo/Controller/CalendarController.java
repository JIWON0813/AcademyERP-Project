package com.example.demo.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import com.example.demo.database.Entity.*;
import com.example.demo.Service.*;

@RestController
public class CalendarController {
	
	@Autowired
	private CalendarService Calservice;

	@GetMapping("/Calendar")
    public Map<String,List<CalendarEntity>> getcalendar() {
		HashMap<String,List<CalendarEntity>> result = new HashMap<>();
        result.put("list", Calservice.Calendar()); 

        return result;
	} 

	@PostMapping("/Calendar")
	public String insertCalendar(@RequestBody CalendarEntity entity){
		return Calservice.insert(entity).toString();
	}

	@DeleteMapping("/Calendar/{id}")
	public void deleteCalendar(@PathVariable("id") Long id){
		Calservice.delete(id);
	}

	@PutMapping("/Calendars")
	public String insertCalendar2(@RequestBody CalendarEntity entity){
		return Calservice.put(entity);
	}

} 