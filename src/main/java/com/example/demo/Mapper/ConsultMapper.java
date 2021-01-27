package com.example.demo.Mapper;

import java.util.List;

import com.example.demo.DTO.ConsultDTO;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface ConsultMapper {
    List<ConsultDTO> getList();
    ConsultDTO insertConsult(long id);
    
    
}
 