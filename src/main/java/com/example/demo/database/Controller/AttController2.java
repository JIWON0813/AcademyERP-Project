package com.example.demo.database.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

import com.example.demo.database.DTO.*;
import com.example.demo.database.Repository.*;

@RestController
@RequestMapping("/api2")
public class AttController2 {
    final String _un = "undefined";
    @Autowired
    private AttendancdRepository2 attRepo;

    @GetMapping("/att") 
    public Map<String,List<AttendanceEntity>> demo() {
        HashMap<String,List<AttendanceEntity>> result = new HashMap<>();
		List<AttendanceEntity> list = attRepo.att();
        result.put("list", list);
 
        return result;
    } 



    @GetMapping("/attfind")
    public Map<String,List<AttendanceEntity>> demo2(@RequestParam("day") String day, @RequestParam("name") String name,@RequestParam("dep") String dep){
        if(name.equals(_un)) name="";
        if(dep.equals(_un)) dep="";
        HashMap<String,List<AttendanceEntity>> result =new HashMap<>();
        HashMap<String,Object> to= new HashMap<>();
        if(day.equals(_un) || day.equals("")) {
            to.put("day",day); 
            to.put("name",name);
            to.put("dep",dep);
            List<AttendanceEntity> list = attRepo.attfind2(to);
            result.put("list", list);
        }else{
            to.put("day",day); 
            to.put("name",name);
            to.put("dep",dep);
            List<AttendanceEntity> list = attRepo.attfind(to);
            result.put("list", list); 
        }

        return result;  
    } 
    @GetMapping("/attfind3")
    public Map<String,List<AttendanceEntity>> demo3(@RequestParam("start") String start,@RequestParam("end") String end, @RequestParam("name") String name,@RequestParam("dep") String dep){
        if(name.equals(_un)) name="";
        if(dep.equals(_un)) dep="";
        HashMap<String,List<AttendanceEntity>> result =new HashMap<>();
        HashMap<String,Object> to= new HashMap<>();
    
            to.put("start",start); 
            to.put("end",end); 
            to.put("name",name);
            to.put("dep",dep);
            List<AttendanceEntity> list = attRepo.attfind3(to);
            result.put("list", list); 


        return result;  
    } 

    @PostMapping("/in")
    public int in(@RequestBody AttendanceEntity dto) {
        int result;
        HashMap<String,Object> to= new HashMap<>();
        to.put("no",dto.getNo()); 
        List<AttendanceEntity> temp=attRepo.datecheck(to);
        if(temp.isEmpty()){
            result=attRepo.intest(dto.getNo());
        }else{ 
            result=0;
        }
        return result;
    } 

    @GetMapping("/out")
    public int out(@RequestParam("no") int no) {
        int result;
        HashMap<String,Object> to= new HashMap<>();
        to.put("no",no); 
        List<AttendanceEntity> temp=attRepo.datecheck(to);
        if(!temp.isEmpty()){
            result=attRepo.out(no);
        }else{
            result=0;
        }
        return result;
    } 

    @GetMapping("/night")
    public int night(@RequestParam("no") int no) {
        int result;
        HashMap<String,Object> to= new HashMap<>();
        to.put("no",no); 
        List<AttendanceEntity> temp=attRepo.datecheck(to);
        if(!temp.isEmpty()){
            result=attRepo.night(no);
        }else{
            result=0;
        }
        return result;
    } 

    @GetMapping("/attCyear")
    public Map<String,List<AttendanceEntity>> cyear(@RequestParam("year") int year){
        HashMap<String,List<AttendanceEntity>> result =new HashMap<>();
        
        List<AttendanceEntity> list = attRepo.cyear(year);
        result.put("list", list); 


        return result;  
    } 
}