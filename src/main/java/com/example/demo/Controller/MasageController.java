package com.example.demo.Controller;




import java.util.*;

import com.example.demo.Service.MasageService;
import com.example.demo.database.Entity.*;
import com.example.demo.database.Repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Service
public class MasageController {
	
	@Autowired
	private MasageService ms;
	@Autowired
    private EmployeeRepository EmployeeService;

	@PostMapping("/masage")
    public int masageInsert(@RequestBody MasageEntity entity) {
		return ms.MasageInsert(entity);
	} 

	@GetMapping("/masage/{id}")
    public HashMap<String,List<MasageEntity>> masageGet(@PathVariable(value = "id") int id) {
		HashMap<String,List<MasageEntity>> result = new HashMap<String,List<MasageEntity>>();
		List<MasageEntity> list = ms.MasageGet();
		List<MasageEntity> resultList = new ArrayList<MasageEntity>();
		List<EmployeeEntity> users = EmployeeService.findAll();
		for(MasageEntity entity : list){
			String[] arr = entity.getPost().split("/");
			for(String index : arr){
				if(Integer.parseInt(index)==id){ //아이디 체크
					if(!entity.getReading().contains(String.valueOf(id))){ // 읽은거 확인
						for(EmployeeEntity user : users){  
							if(user.getNo()==Integer.parseInt(index)){ //no를 이름
								entity.setPost(user.getName());
							}
							
							if(entity.getTo().equals(String.valueOf(user.getNo()))){ //no를 이름
								entity.setTo(user.getName());
							}
						}
						resultList.add(entity);
					}
					
				}
			}
		}
		result.put("masageList", resultList);
		return result;
	} 
	
	@PutMapping("/masage/{no}/{id}")
    public int masagePut(@PathVariable("no") int no, @PathVariable("id") int id) {
		HashMap<String,Object> map = new HashMap<String,Object>();
		map.put("no",no);
		map.put("id",id+"/");
		if(ms.MasagePut(map)>0){
			MasageEntity masage = ms.Masage(no);
			if(masage.getPost().equals(masage.getReading())){
				ms.MasageDelete(no);
			}
		}
		return 1;
	}
} 