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

    public HashMap<String, Object> list() {
        HashMap<String, Object> result = new HashMap<>();
        //HashMap<String,Object> map= new HashMap<>();
        List<ReceiveEntity> list = receiveRepository.findAll();
        //List<ReceiveDTO> list = receiveMapper.getReceiveList(map);
        result.put("message", list);

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
    
}
