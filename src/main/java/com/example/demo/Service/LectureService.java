package com.example.demo.Service;

import com.example.demo.DTO.LectureDTO;
import com.example.demo.DTO.PagingVO;
import com.example.demo.Entity.*;
import com.example.demo.Mapper.LectureMapper;
import com.example.demo.Repository.LectureRepository;
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

   public HashMap<String,Object> list(PagingVO vo) {
       HashMap<String,Object> result = new HashMap<>();
       int totalCount = lectureMapper.totalCount();
       vo.setTotalRecordCount(totalCount);

       if (totalCount > 0) {
           List<LectureDTO> list = lectureMapper.getLectureList(vo);
         result.put("message", list);
         result.put("paging", vo);
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
        List<BranchEntity> list = lectureMapper.getBranch();
        result.put("list", list);
        return result;
    }
    public HashMap<String,List> selectList(int branch){
        HashMap<String,List> result = new HashMap<>();
        List<List<Object>> list = lectureMapper.getList(branch);
        System.out.println(list);
        result.put("list",list);
        /*        result.put("teacher", list.get(0));
        result.put("room",list.get(1));
        result.put("part",list.get(3));*/
        return result;
    }

    public HashMap<String,List> selectTeacher(int branch){
        HashMap<String,List> result = new HashMap<>();
        List<BoardEntity> list = lectureMapper.getTeacher(branch);
        result.put("list", list);
        return result;
    }
    public HashMap<String,List> selectRoom(int branch){
        HashMap<String,List> result = new HashMap<>();
        List<RoomEntity> list = lectureMapper.getRoom(branch);
        result.put("list", list);
        return result;
    }
    public HashMap<String,List> selectPart(int branch){
        HashMap<String,List> result = new HashMap<>();
        List<PartEntity> list = lectureMapper.getPart(branch);
        result.put("list", list);
        return result;
    }
    public HashMap<String,List> searchList(String branch, String condition, String keyword) {
        HashMap<String,List> result = new HashMap<>();
        HashMap<String,Object> map= new HashMap<>();
        if(branch==""){
            branch = "null";
        }
        map.put("branch",branch);
        map.put("condition",condition);
        map.put("keyword",keyword);
        List<LectureDTO> list = lectureMapper.getSearchList(map);
        result.put("message", list);
        return result;
    }

}