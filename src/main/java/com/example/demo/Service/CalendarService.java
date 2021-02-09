package com.example.demo.Service;

import java.util.*;


import com.example.demo.database.DTO.CalendarEntity;

import com.example.demo.database.Repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CalendarService {
    
    @Autowired
    private CalendarRepository CalRepo;

    public List<CalendarEntity> Calendar(){
        List<CalendarEntity> list = CalRepo.findAll(); 
        return list;
    }

    public CalendarEntity insert(CalendarEntity entity){
        CalendarEntity result = CalRepo.save(entity); 
        return result;
    }

    public String put(CalendarEntity entity){
        
        CalendarEntity result = CalRepo.save(entity); 
        return result.toString();
    }

    public void delete(Long no){
        CalRepo.deleteById(no);
    }



}
