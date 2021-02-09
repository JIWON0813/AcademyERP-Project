package com.example.demo.Controller;

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

import com.example.demo.Service.*;
import com.example.demo.database.DTO.*;

@RestController
@RequestMapping("/api2")
public class AttController2 {
    
    final String _un = "undefined";
    String start="start";
    
	@Autowired
	private AttService attservice;

    @GetMapping("/att/{nowPage}/{cntPerPage}") 
    public Map<String,Object> att(PagingVO vo
            , @PathVariable(value="nowPage")String nowPage
            , @PathVariable(value="cntPerPage")String cntPerPage) {

                int total = attservice.count();
                if (nowPage == null && cntPerPage == null) {
                    nowPage = "1";
                    cntPerPage = "10";
                } else if (nowPage == null) {
                    nowPage = "1";
                } else if (cntPerPage == null) { 
                    cntPerPage = "10";
                }
                vo = new PagingVO(total, Integer.parseInt(nowPage), Integer.parseInt(cntPerPage));
                HashMap<String,Object> result = new HashMap<>();
                result.put("list", attservice.att(vo));
                result.put("page", vo);


 
                return result;
    } 

    @GetMapping("/users")
    public HashMap<String,List> users() {
        return attservice.users();
	}

    @GetMapping("/attfind/{nowPage}/{cntPerPage}")
    public Map<String,Object> attfind(@RequestParam("day") String day, @RequestParam("name") String name,@RequestParam("dep") String dep
        ,PagingVO vo, @PathVariable(value="nowPage")String nowPage
        , @PathVariable(value="cntPerPage")String cntPerPage){
        HashMap<String,Object> to= new HashMap<>();
        HashMap<String,Object> result =new HashMap<>();
        if(name.equals(_un) || name.length()<1) name="";
        if(dep.equals(_un) || dep.length()<1) dep="";
        to.put("day",day); 
        to.put("name",name);
        to.put("dep",dep);
        int total;
        if(day.equals(_un) || day.equals("")) {
            total = attservice.countFind2(to);
        }else{
            total = attservice.countFind(to);
        }
        if (nowPage == null && cntPerPage == null) {
            nowPage = "1";
            cntPerPage = "10";
        } else if (nowPage == null) {
            nowPage = "1";
        } else if (cntPerPage == null) { 
            cntPerPage = "10";
        }
        vo = new PagingVO(total, Integer.parseInt(nowPage), Integer.parseInt(cntPerPage));
        to.put(start,vo.getStart());
        to.put("cntPerPage",vo.getCntPerPage());
        if(day.equals(_un) || day.equals("")) {
            List<AttendanceDTO> list = attservice.attfind(to);
            result.put("list", list);
        }else{
            List<AttendanceDTO> list = attservice.attfind2(to);
            result.put("list", list); 
        }
        result.put("page", vo);
        result.put("find", total);
        return result;
    } 

    @GetMapping("/attgetno/{nowPage}/{cntPerPage}")
    public Map<String,Object> getatt(@RequestParam("day") String day, @RequestParam("name") String name,@RequestParam("dep") String dep
        ,PagingVO vo, @PathVariable(value="nowPage")String nowPage
        , @PathVariable(value="cntPerPage")String cntPerPage){
        HashMap<String,Object> to= new HashMap<>();
        HashMap<String,Object> result =new HashMap<>();
        if(name.equals(_un) || name.length()<1) name="";
        if(dep.equals(_un) || dep.length()<1) dep="";
        to.put("day",day); 
        to.put("no",name); 
        to.put("dep",dep);
        int total;
        if(day.equals(_un) || day.equals("")) {
            total = attservice.countget2(to);
        }else{
            total = attservice.countget(to);
        }
        if (nowPage == null && cntPerPage == null) {
            nowPage = "1";
            cntPerPage = "10";
        } else if (nowPage == null) {
            nowPage = "1";
        } else if (cntPerPage == null) { 
            cntPerPage = "10";
        }
        vo = new PagingVO(total, Integer.parseInt(nowPage), Integer.parseInt(cntPerPage));
        to.put(start,vo.getStart());
        to.put("cntPerPage",vo.getCntPerPage());
        if(day.equals(_un) || day.equals("")) {
            List<AttendanceDTO> list = attservice.attgetNo(to);
            result.put("list", list);
        }else{
            List<AttendanceDTO> list = attservice.attgetNoday(to);
            result.put("list", list); 
        }
        result.put("page", vo);
        result.put("find", total);
        return result;
    } 
    
    @GetMapping("/attfind3")
    public Map<String,List<AttendanceDTO>> demo3(@RequestParam("start") String start,@RequestParam("end") String end, @RequestParam("name") String name,@RequestParam("dep") String dep){
        if(name.equals(_un)) name="";
        if(dep.equals(_un)) dep="";
        HashMap<String,List<AttendanceDTO>> result =new HashMap<>();
        HashMap<String,Object> to= new HashMap<>();
    
        to.put("start",start); 
        to.put("end",end); 
        to.put("name",name);
        to.put("dep",dep);
        
        result.put("list", attservice.attfind3(to)); 

        return result; 
    } 

    @PostMapping("/in")
    public int in(@RequestBody AttendanceDTO dto) {
        int result;
        HashMap<String,Object> to= new HashMap<>();
        to.put("no",dto.getNo()); 
        List<AttendanceDTO> temp=attservice.datecheck(to);
        if(temp.isEmpty()){
            result=attservice.insert(dto.getNo());
        }else{ 
            result=0;
        }
        return result;
    } 

    @GetMapping("/today")
    public Map<String,List<AttendanceDTO>> todayget(@RequestParam("no") int no){
        HashMap<String,List<AttendanceDTO>> result= new HashMap<>();
        HashMap<String,Object> param= new HashMap<>();
        param.put("no",no);
        SimpleDateFormat format1 = new SimpleDateFormat ("yyyy-MM-dd");   
        Date date = new Date();
        String time = format1.format(date);

        param.put("today",time);
        result.put("today",attservice.gettoday(param));

        return result;
    }

    @GetMapping("/out")
    public int out(@RequestParam("no") int no) {
        int result;
        HashMap<String,Object> to= new HashMap<>();
        to.put("no",no); 
        List<AttendanceDTO> temp=attservice.datecheck(to);
        if(!temp.isEmpty()){
            result=attservice.out(no);
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
        List<AttendanceDTO> temp=attservice.datecheck(to);
        if(!temp.isEmpty()){
            result=attservice.night(no);
        }else{
            result=0;
        }
        return result;
    } 

    @GetMapping("/attCyear")
    public Map<String,List<AttendanceDTO>> cyear(@RequestParam("year") int year){
        HashMap<String,List<AttendanceDTO>> result = new HashMap<>();
        result.put("list", attservice.cyear(year)); 
        return result;  
    } 
}