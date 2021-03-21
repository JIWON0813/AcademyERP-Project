//---------------------------------
// 제목 : 비용관리(직원-개인)
// 파일명 : CostController.java
// 작성자 : 최인아
//---------------------------------
package com.example.demo.Controller;

import java.util.HashMap;
import java.util.Optional;

import com.example.demo.Service.CostService;
import com.example.demo.database.Entity.CostEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/")
@CrossOrigin("*")
public class CostController {

    @Autowired
    private CostService costService;

    //--목록
    @GetMapping("/cost")
    public HashMap<String, Object> list() {
        return costService.list();
    }

    //--상세보기
    @GetMapping("/costdetail")
    public HashMap<String, Optional> detail(@RequestParam("id") Long id) {
        return costService.detail(id);    
    }

    //--등록
    @PostMapping("/cost")
    public String insert(@RequestBody CostEntity cost) {
        return costService.insert(cost); 
    }   

    //--삭제
    @DeleteMapping("/cost/{id}")
    public void delete(@PathVariable("id") Long id) {
        costService.delete(id);
    }

}
