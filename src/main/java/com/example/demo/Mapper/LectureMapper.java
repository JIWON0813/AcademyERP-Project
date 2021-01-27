package com.example.demo.Mapper;

import com.example.demo.DTO.LectureDTO;
import com.example.demo.DTO.LecturePagingVO;
import com.example.demo.Entity.BoardEntity;
import com.example.demo.Entity.BranchEntity;
import com.example.demo.Entity.PartEntity;
import com.example.demo.Entity.RoomEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;


@Mapper
public interface LectureMapper {
	List<LectureDTO> getLectureList(HashMap<String,Object> map); 
	int totalCount(HashMap<String,Object> map);

	LectureDTO getListDetail(long id);

	List<BranchEntity> getBranch();
	List<BoardEntity> getTeacher(int branch);
	List<RoomEntity> getRoom(int branch);
	List<PartEntity> getPart(int branch);

}
