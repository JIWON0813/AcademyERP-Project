package com.example.demo.database.Repository;

import java.util.HashMap;
import java.util.List;

import com.example.demo.database.DTO.ConsultEntity;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ConsultMapper {

    int insertConsult(HashMap<String,Object> map);
    List<ConsultEntity> selectConsult();
    
}
