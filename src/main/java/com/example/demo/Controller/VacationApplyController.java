package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.Service.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.demo.database.DTO.*;
import com.example.demo.database.Repository.EmployeeRepository;

@RestController
public class VacationApplyController {
    @Autowired
	private VacationApplyService VacationApplyService;
    @Autowired
	private EmployeeRepository boardRepository;

	@PostMapping("/Vacation_apply")
    public int insert (@RequestBody VacationApplyEntity param){
        return VacationApplyService.insert(param);
    }



    @GetMapping("/Vacation_apply/{nowPage}/{cntPerPage}")
    public Map<String,Object> get (PagingVO vo, @PathVariable(value="nowPage")String nowPage
    , @PathVariable(value="cntPerPage")String cntPerPage) {
        List<EmployeeEntity> list = boardRepository.findAll();
        HashMap<String,Object> result = new HashMap<>();
        HashMap<String,Object> to= new HashMap<>();
        int total = VacationApplyService.count();

        if (nowPage == null && cntPerPage == null) {
            nowPage = "1";
            cntPerPage = "10";
        } else if (nowPage == null) {
            nowPage = "1";
        } else if (cntPerPage == null) { 
            cntPerPage = "10";
        }
        vo = new PagingVO(total, Integer.parseInt(nowPage), Integer.parseInt(cntPerPage));
        to.put("start",vo.getStart());
        to.put("cntPerPage",vo.getCntPerPage());
        result.put("list", VacationApplyService.get(to));
        result.put("page",vo);
        result.put("user",list);
        return result;
    }
}