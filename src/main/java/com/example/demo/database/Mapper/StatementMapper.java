package com.example.demo.database.Mapper;

import com.example.demo.database.DTO.StatementDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;

@Mapper
public interface StatementMapper {
    int InsertStatement(StatementDTO dto);
    void InsertStatementDetail(HashMap<String,Object> map);
}