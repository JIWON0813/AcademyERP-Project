//---------------------------------
// 제목 : 수납관리(직원- 재무)
// 파일명 : ReceiveService.java
// 작성자 : 최인아
//---------------------------------
package com.example.demo.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.example.demo.database.DTO.ReceiveDTO;
import com.example.demo.database.Entity.BranchEntity;
import com.example.demo.database.Entity.ReceiveEntity;
import com.example.demo.database.Mapper.ReceiveMapper;
import com.example.demo.database.Repository.BranchRepository;
import com.example.demo.database.Repository.ReceiveRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReceiveService {


    @Autowired
    private ReceiveMapper receiveMapper;
    
    @Autowired
    private ReceiveRepository receiveRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private LectureService lectureService;

    // @Autowired
    // private StudentRepository studentRepository;

    public HashMap<String, Object> list() {
        HashMap<String, Object> result = new HashMap<>();
        //HashMap<String,Object> map= new HashMap<>();
        List<ReceiveEntity> list = receiveRepository.findAll();
        //List<ReceiveDTO> list = receiveMapper.getReceiveList(map);
        System.out.println("2222222");
        result.put("message", list);
        return result;
    }

    public HashMap<String, Optional> detail(Long id) {
        HashMap<String, Optional> result = new HashMap<>();
        Optional<ReceiveEntity> list = receiveRepository.findById(id);
        result.put("list", list);
        return result;
    }

    public String insert(ReceiveEntity rec) {
        ReceiveEntity result =  receiveRepository.save(rec);
        return result.toString();
    }

    public HashMap<String,List> selectBranch(){
        HashMap<String,List> result = new HashMap<>();
        List<BranchEntity> list = branchRepository.findAll();
        result.put("list", list);
        return result;
    }

    public void delete(Long id) {
        receiveRepository.deleteById(id);
    }

    // public HashMap<String,Object> selectList(Long lecture){
    //     HashMap<String,Object> result = new HashMap<>();
    //     List<LectureEntity> lectureList = lectureService.list(lecture);
    //     result.put("lectureList", lectureList);
    //     return result;
    // }

    // public HashMap<String,List> selectStudent(){
    //     HashMap<String,List> result = new HashMap<>();
    //     List<StudentEntity> list1 = (List<StudentEntity>) studentRepository.findAll();
    //     result.put("list1", list1);
    //     return result;
    // }
    
}
