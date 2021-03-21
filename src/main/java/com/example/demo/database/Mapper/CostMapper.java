package com.example.demo.database.Mapper;

import java.util.HashMap;
import java.util.List;

import com.example.demo.database.DTO.CostDTO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CostMapper {
    List<CostDTO> getCostList(HashMap<String,Object> map);
    
}
