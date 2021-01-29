package com.example.demo.database.Repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import com.example.demo.database.DTO.*;
import java.util.*;

@Mapper
@Repository
public interface AttendancdRepository2 {
    List<AttendanceDTO> att(PagingVO vo);
    int count();
    int countFind(HashMap<String,Object> to);
    int countFind2(HashMap<String,Object> to);
    int countget(HashMap<String,Object> to);
    int countget2(HashMap<String,Object> to);
    List<AttendanceDTO> attfind(HashMap<String,Object> map);
    List<AttendanceDTO> attfind2(HashMap<String,Object> map);
    List<AttendanceDTO> attfind3(HashMap<String,Object> map);
    List<AttendanceDTO> attgetNo(HashMap<String,Object> map);
    List<AttendanceDTO> attgetNoday(HashMap<String,Object> map);
    int intest(int no);
    int out(int no);
    int night(int no);
    List<AttendanceDTO> datecheck(HashMap<String,Object> map);
    List<AttendanceDTO> cyear(int year);
    List<AttendanceDTO> gettoday(HashMap<String,Object> param);
    
}  