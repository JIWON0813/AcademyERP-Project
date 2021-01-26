package com.example.demo.Service;

import com.example.demo.Entity.PartEntity;
import com.example.demo.Repository.PartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@Service
public class PartService {

    @Autowired

    private PartRepository partRepository;


    public List<PartEntity> list(Long branch) {
            return partRepository.findAllByBranch(branch);
    }

    public HashMap<String, Object> detail(Long id) {
        HashMap<String, Object> result = new HashMap<>();
        Optional<PartEntity> list = partRepository.findById(id);
        result.put("list", list);

        return result;
    }

    public String write(PartEntity part) {
        PartEntity result =  partRepository.save(part);
        return result.toString();
    }

    public void delete(Long id) {
        partRepository.deleteById(id);

    }

    public String update(PartEntity part, Long id) {
        part.setNo(id);
        PartEntity result =  partRepository.save(part);
        return result.toString();
    }

}