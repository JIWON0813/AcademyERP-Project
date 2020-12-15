package com.example.demo.database.Repository;

import com.example.demo.database.DTO.BoardEntity;
import com.example.demo.database.DTO.BranchEntity;
import com.example.demo.database.DTO.LectureEntity;
import com.example.demo.database.DTO.RoomEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Mapper
@Repository
public interface LectureMapper {
	List<LectureEntity> getLectureList();
	List<LectureEntity> getListDetail(long id);

	List<BranchEntity> getBranch();
	List<BoardEntity> getTeacher(int branch);
	List<RoomEntity> getRoom(int branch);
}