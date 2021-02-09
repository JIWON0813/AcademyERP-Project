package com.example.demo.database.Repository;

import com.example.demo.database.DTO.*;

import com.example.demo.database.Entity.*;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;


@Mapper
@Repository
public interface LectureMapper {
	List<LectureDTO> getLectureList();
	LectureDTO getListDetail(long id);
 
	List<BranchEntity> getBranch();
	List<EmployeeEntity> getTeacher(int branch);
	List<RoomEntity> getRoom(int branch);
}
