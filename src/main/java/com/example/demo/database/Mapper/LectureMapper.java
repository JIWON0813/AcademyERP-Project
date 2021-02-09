package com.example.demo.database.Mapper;

import com.example.demo.database.DTO.*;
import com.example.demo.database.Entity.BoardEntity;
import com.example.demo.database.Entity.BranchEntity;
import com.example.demo.database.Entity.RoomEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface LectureMapper {
	List<LectureDTO> getLectureList(HashMap<String,Object> map);
	int totalCount(HashMap<String,Object> map);
	LectureDTO getListDetail(long id);
	List<BoardEntity> getTeacher(long branch);

	List<LectureDTO> getTime(int no);

}