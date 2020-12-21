package com.example.demo.database.Repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import com.example.demo.database.DTO.*;
import java.util.*;

@Mapper
@Repository
public interface AttendancdRepository2 {
    List<AttendanceEntity> att();
    List<AttendanceEntity> attfind(HashMap<String,Object> map);
    List<AttendanceEntity> attfind2(HashMap<String,Object> map);
    List<AttendanceEntity> attfind3(HashMap<String,Object> map);
    int intest(int no);
    int out(int no);
    int night(int no);
    List<AttendanceEntity> datecheck(HashMap<String,Object> map);
    List<AttendanceEntity> cyear(int year);
} 