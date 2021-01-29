package com.example.demo.database.Repository;

import com.example.demo.database.DTO.EmployeeEntity;
import com.example.demo.database.DTO.BranchEntity;
import com.example.demo.database.DTO.LectureDTO;
import com.example.demo.database.DTO.RoomEntity;
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
