package com.example.demo.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.example.demo.DTO.ConsultDTO;
import com.example.demo.Entity.ConsultEntity;
import com.example.demo.Mapper.ConsultMapper;
import com.example.demo.Repository.ConsultRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConsultService {

    @Autowired
    private ConsultRepository consultRepository;

    @Autowired
    private ConsultMapper consultMapper;

    public HashMap<String, Object> list(String keyword) {
        HashMap<String, Object> result = new HashMap<>();
        HashMap<String,Object> map = new HashMap<>();
        map.put("keyword", keyword);
        List<ConsultDTO> list = consultMapper.getList(map);
        result.put("message",list); 
        
        return result;
    }

    public HashMap<String, Optional> detail(Long id) {
        HashMap<String, Optional> result = new HashMap<>();
        Optional<ConsultEntity> list = consultRepository.findById(id);
        result.put("list", list);

        return result;
    }

    // public HashMap<String, Object> detail(Long id) {
    //     HashMap<String, Object> result = new HashMap<>();
    //     List<ConsultDTO> list = consultMapper.getListDetail(id);
    //     result.put("message", list);

    //     return result;
    // }

    public String write(ConsultEntity con) {
        ConsultEntity result =  consultRepository.save(con);
        return result.toString();
    }

    public void delete(Long id) {
        consultRepository.deleteById(id);
    }

    public String update(ConsultEntity con, Long id) {
        con.setNo(id);
        ConsultEntity result =  consultRepository.save(con);
        return result.toString();
    }
    
}
