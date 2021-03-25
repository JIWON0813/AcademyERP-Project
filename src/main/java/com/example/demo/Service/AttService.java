package com.example.demo.Service;

import java.util.*;

import com.example.demo.database.DTO.*;

import com.example.demo.database.Repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.database.Entity.*;

@Service
public class AttService {
    
    @Autowired
    private AttendanceRepository attRepo;
    @Autowired
    private AttendancdRepository2 attRepo2;
    @Autowired
	private EmployeeRepository3 employee;

    public Optional<AttendanceEntity> attget(long no){
        Optional<AttendanceEntity> list = attRepo.findById(no); 
        return list;
    }

    public String attput(long no, AttendanceEntity dto){
        dto.setNo(no);
        AttendanceEntity result = attRepo.save(dto); 
        return result.toString();
    }

    public void attdelete(Long no){
        attRepo.deleteById(no);
    }


/////

    public List<AttendanceDTO> att(PagingVO vo){
        List<AttendanceDTO>list = attRepo2.att(vo);
        return list;
    }

    public int count(){
        return attRepo2.count();
    }

    public int countFind(HashMap<String,Object> to){
        return attRepo2.countFind(to);
    }

    public int countFind2(HashMap<String,Object> to){
        return attRepo2.countFind2(to);
    }

    public int countget(HashMap<String,Object> to){
        return attRepo2.countget(to);
    }

    public int countget2(HashMap<String,Object> to){
        return attRepo2.countget2(to);
    }

    public HashMap<String,List> users(){
        HashMap<String,List> result = new HashMap<>();
        List<EmployeeEntity2> list = employee.findAll();
        result.put("list", list);
        return result;
    }

    public List<AttendanceDTO> attfind(HashMap<String,Object> to){
        List<AttendanceDTO> list = attRepo2.attfind2(to);
        return list;
    }

    public List<AttendanceDTO> attfind2(HashMap<String,Object> to){
        List<AttendanceDTO> list = attRepo2.attfind(to);
        return list;
    }

    public List<AttendanceDTO> attfind3(HashMap<String,Object> to){
        List<AttendanceDTO> list = attRepo2.attfind3(to);
        return list;
    }

    public List<AttendanceDTO> attgetNo(HashMap<String,Object> to){
        List<AttendanceDTO> list = attRepo2.attgetNo(to);
        return list;
    }

    public List<AttendanceDTO> attgetNoday(HashMap<String,Object> to){
        List<AttendanceDTO> list = attRepo2.attgetNoday(to);
        return list;
    }

    public List<AttendanceDTO> datecheck(HashMap<String,Object> to){
        List<AttendanceDTO> list = attRepo2.datecheck(to);
        return list;
    }

    public int insert(int no){
        return attRepo2.intest(no);
    }

    public int out(int no){
        return attRepo2.out(no);
    }

    public int night(int no){
        return attRepo2.night(no);
    }

    public List<AttendanceDTO> cyear(int year){
        List<AttendanceDTO> list =attRepo2.cyear(year);
        return list;
    }

    public List<AttendanceDTO> gettoday(HashMap<String,Object> param){
        List<AttendanceDTO> result = attRepo2.gettoday(param);
        return result;
    }
}
