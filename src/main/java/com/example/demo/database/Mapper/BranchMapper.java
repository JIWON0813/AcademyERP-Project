package com.example.demo.database.Mapper;

import java.util.*;

import com.example.demo.database.DTO.BranchDTO;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface BranchMapper {
    List<BranchDTO> getList(HashMap<String,Object> map);
    BranchDTO getListDetail(long id);    
}
 