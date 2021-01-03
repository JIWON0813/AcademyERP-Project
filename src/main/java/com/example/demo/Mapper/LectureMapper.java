package com.example.demo.Mapper;

import com.example.demo.DTO.LectureDTO;
import com.example.demo.DTO.PagingVO;
import com.example.demo.Entity.BoardEntity;
import com.example.demo.Entity.BranchEntity;
import com.example.demo.Entity.PartEntity;
import com.example.demo.Entity.RoomEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;


@Mapper
public interface LectureMapper {
	List<LectureDTO> getLectureList(PagingVO vo);
	int totalCount();

	LectureDTO getListDetail(long id);
	List<LectureDTO> getSearchList(HashMap<String,Object> map);

	List<BranchEntity> getBranch();
	List<List<Object>> getList(int branch);
	List<BoardEntity> getTeacher(int branch);
	List<RoomEntity> getRoom(int branch);
	List<PartEntity> getPart(int branch);

}
