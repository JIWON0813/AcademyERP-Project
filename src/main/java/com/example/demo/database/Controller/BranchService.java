package com.example.demo.database.Controller;

import com.example.demo.database.DTO.BranchEntity;
import com.example.demo.database.Repository.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(value = "/api2")
@Service
@CrossOrigin("*")
public class BranchService {

    @Autowired
    private BranchRepository branchRepository;

    @GetMapping("/branch")
    public HashMap<String,List> list() {
        HashMap<String,List> result = new HashMap<>();
        List<BranchEntity> list = branchRepository.findAll();
        result.put("message", list);
        return result;
    }

    @GetMapping("/branch/{id}")
    public HashMap<String, Optional> detail(@PathVariable("id") Long id) {
        HashMap<String, Optional> result = new HashMap<>();
        Optional<BranchEntity> list = branchRepository.findById(id);
        result.put("message", list);

        return result;
    }

    @PostMapping("/branch")
    public String write(@RequestBody BranchEntity branch) {
        BranchEntity result =  branchRepository.save(branch);
        return result.toString();
    }

    @DeleteMapping("/branch/{id}")
    public void delete(@PathVariable("id") Long id) {
        branchRepository.deleteById(id);

    }

    @PutMapping("branch/edit/{id}")
    public String update(@RequestBody BranchEntity branch,@PathVariable("id") Long id) {
        branch.setNo(id);
        BranchEntity result =  branchRepository.save(branch);
        return result.toString();
    }

}