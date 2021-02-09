package com.example.demo.Service;

import com.example.demo.database.DTO.LectureDTO;
import com.example.demo.database.DTO.LecturePagingVO;
import com.example.demo.database.Entity.*;
import com.example.demo.database.Mapper.LectureMapper;
import com.example.demo.database.Repository.BranchRepository;
import com.example.demo.database.Repository.LectureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;


@Service
public class LectureService {
    @Autowired
    private LectureMapper lectureMapper;

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private RoomService roomService;

    @Autowired
    private PartService partService;

    @Autowired
    private BranchRepository branchRepository;

    public HashMap<String,Object> list(String branch, String condition, String keyword,
                                             LecturePagingVO vo) {
        HashMap<String,Object> result = new HashMap<>();
        HashMap<String,Object> map= new HashMap<>();
        if(branch==""){
            branch = "null";
        }
        map.put("branch",branch);
        map.put("condition",condition);
        map.put("keyword",keyword);
        map.put("vo",vo);

        int totalCount = lectureMapper.totalCount(map);
        vo.setTotalRecordCount(totalCount);

        if (totalCount > 0) {
            List<LectureDTO> list = lectureMapper.getLectureList(map);
            result.put("message", list);
            result.put("paging",vo);
        }

        return result;
    }


    public HashMap<String, Object> detail(Long id) {
        HashMap<String, Object> result = new HashMap<>();
        LectureDTO list = lectureMapper.getListDetail(id);
        result.put("list", list);

        return result;
    }

    public String write(LectureEntity lec) {
        LectureEntity result =  lectureRepository.save(lec);
        return result.toString();
    }

    public void delete(Long id) {
        lectureRepository.deleteById(id);

    }

    public String update(LectureEntity lec, Long id) {
        lec.setNo(id);
        LectureEntity result =  lectureRepository.save(lec);
        return result.toString();
    }

    public HashMap<String,List> selectBranch(){
        HashMap<String,List> result = new HashMap<>();
        List<BranchEntity> list = branchRepository.findAll();
        result.put("list", list);
        return result;
    }


    public HashMap<String,Object> selectList(Long branch){
        HashMap<String,Object> result = new HashMap<>();
        List<BoardEntity> teacherList = lectureMapper.getTeacher(branch);
        List<RoomEntity> roomList = roomService.list(branch);
        List<PartEntity> partList = partService.list(branch);
        result.put("teacherList", teacherList);
        result.put("roomList", roomList);
        result.put("partList", partList);
        return result;
    }

}