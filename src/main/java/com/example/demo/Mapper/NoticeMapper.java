package com.example.demo.Mapper;

import java.util.List;

import com.example.demo.DTO.NoticeDTO;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface NoticeMapper {
    List<NoticeDTO> getList();
    NoticeDTO writeNotice(long id);
    
    
}
 