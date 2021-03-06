package com.example.demo.database.Repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.*;

import com.example.demo.database.Entity.*;
@Mapper
@Repository
public interface VacationApplyRepository {
    int insert(VacationApplyEntity dto);
    List<VacationApplyEntity> get(HashMap<String,Object> to);
    int count();
    VacationApplyEntity getApply(int no);
    int put(VacationApplyEntity dto);
    int delete(int no);
}  
