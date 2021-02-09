package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import com.example.demo.Service.*;
import com.example.demo.database.DTO.*;

@RestController
public class VacationController {
    @Autowired
	private VacationService VacationService;

	@GetMapping("/getVacation/{nowPage}/{cntPerPage}")
    public Map<String,Object> getVacation(PagingVO vo, @PathVariable(value="nowPage")String nowPage
    , @PathVariable(value="cntPerPage")String cntPerPage) {
        HashMap<String,Object> result = new HashMap<>();
        HashMap<String,Object> to= new HashMap<>();
        int total = VacationService.count();

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
        result.put("list", VacationService.getVacation(vo)); 
        result.put("page",vo);
        return result;
    }  

    @GetMapping("/getVacation/{nowPage}/{cntPerPage}/{no}")
    public Map<String,Object> getVacation_user(PagingVO vo, @PathVariable(value="nowPage")String nowPage
    , @PathVariable(value="cntPerPage")String cntPerPage, @PathVariable(value = "no")int no) {
        HashMap<String,Object> result = new HashMap<>();
        HashMap<String,Object> to= new HashMap<>();
        int total = VacationService.count_user(no);

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
        to.put("no",no);
        result.put("list", VacationService.getVacation_user(to)); 
        result.put("page",vo);
        return result;
    }
    
    @PostMapping("/Vacation")  
    public int VacationInsert (@RequestBody VacationEntity param){
        return VacationService.insertVacation(param);
    }

    
}
