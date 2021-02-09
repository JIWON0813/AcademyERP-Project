package com.example.demo.database.Repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import com.example.demo.database.Entity.*;
import java.util.*;

@Mapper
@Repository
public interface DBInterface {
    List<DTO> att();
    List<DTO> attfind(HashMap<String,Object> map);
    List<DTO> attfind2(HashMap<String,Object> map);
    List<DTO> attfind3(HashMap<String,Object> map);
    int intest(int no);
    int out(int no);
    int night(int no);
    List<DTO> datecheck(HashMap<String,Object> map);
    List<DTO> cyear(int year);
}