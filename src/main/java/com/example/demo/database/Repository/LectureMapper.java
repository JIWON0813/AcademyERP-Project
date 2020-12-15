package com.example.demo.database.Repository;

import java.util.HashMap;
import java.util.List;

import com.example.demo.database.DTO.LectureEntity;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;


@Mapper
@Repository
public interface LectureMapper {
	int insertLecture(HashMap<String,Object> map);
	List<LectureEntity> selectLecture();
}