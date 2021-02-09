package com.example.demo.database.Mapper;

import com.example.demo.database.DTO.LectureDTO;
import com.example.demo.database.Entity.BoardEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface LectureMapper {
    List<LectureDTO> getLectureList(HashMap<String,Object> map);
    int totalCount(HashMap<String,Object> map);

    LectureDTO getListDetail(long id);

    List<BoardEntity> getTeacher(long branch);

    List<LectureDTO> getTime(int no);
}