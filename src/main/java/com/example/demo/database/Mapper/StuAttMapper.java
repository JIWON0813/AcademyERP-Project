package com.example.demo.database.Mapper;

import com.example.demo.database.DTO.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface StuAttMapper {
    List<Stu_AttDTO> getAtt(String name);
    List<LectureDTO> getLec();
    List<StudentDTO> getLecStu(String lec);
}
