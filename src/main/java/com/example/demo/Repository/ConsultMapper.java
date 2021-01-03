package com.example.demo.Repository;

import java.util.HashMap;
import java.util.List;

import com.example.demo.Entity.ConsultEntity;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ConsultMapper {

    int insertConsult(HashMap<String,Object> map);
    List<ConsultEntity> selectConsult();
    
}
