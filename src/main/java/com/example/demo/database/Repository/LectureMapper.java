package com.example.demo.database.Repository;

import com.example.demo.database.DTO.*;
import com.example.demo.database.Entity.BoardEntity;
import com.example.demo.database.Entity.BranchEntity;
import com.example.demo.database.Entity.RoomEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface LectureMapper {
	List<LectureDTO> getLectureList();
	LectureDTO getListDetail(long id);
	List<LectureDTO> getTime(int no);

	List<BranchEntity> getBranch();
	List<BoardEntity> getTeacher(int branch);
	List<RoomEntity> getRoom(int branch);
}