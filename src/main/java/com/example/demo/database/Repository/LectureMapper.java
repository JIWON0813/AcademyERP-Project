package com.example.demo.database.Repository;

import com.example.demo.database.DTO.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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