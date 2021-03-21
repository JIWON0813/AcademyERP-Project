//---------------------------------
// 제목 : 비용관리(직원-개인)
// 파일명 : CostService.java
// 작성자 : 최인아
//---------------------------------
package com.example.demo.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.example.demo.database.Entity.CostEntity;
import com.example.demo.database.Mapper.CostMapper;
import com.example.demo.database.Repository.CostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CostService {

    @Autowired
    private CostMapper costMapper;
    
    @Autowired
    private CostRepository costRepository;

    public HashMap<String, Object> list() {
        HashMap<String, Object> result = new HashMap<>();
        //HashMap<String,Object> map= new HashMap<>();
        List<CostEntity> list = costRepository.findAll();
        //List<ReceiveDTO> list = receiveMapper.getReceiveList(map);
        result.put("message", list);
        return result;
    }

    public HashMap<String, Optional> detail(Long id) {
        HashMap<String, Optional> result = new HashMap<>();
        Optional<CostEntity> list = costRepository.findById(id);
        result.put("list", list);
        return result;
    }

    public String insert(CostEntity cost) {
        CostEntity result =  costRepository.save(cost);
        return result.toString();
    }

    public void delete(Long id) {
        costRepository.deleteById(id);
    }

}
