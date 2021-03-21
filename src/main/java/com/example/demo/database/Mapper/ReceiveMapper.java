package com.example.demo.database.Mapper;

import java.util.HashMap;
import java.util.List;

import com.example.demo.database.DTO.ReceiveDTO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReceiveMapper {
    List<ReceiveDTO> getReceiveList(HashMap<String,Object> map);
    
}
