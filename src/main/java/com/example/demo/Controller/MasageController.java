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
import org.springframework.web.bind.annotation.RequestBody;
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
				if(Integer.parseInt(index)==id){
					for(EmployeeEntity user : users){
						if(user.getNo()==Integer.parseInt(index)){
							entity.setPost(user.getName());
						}
	
						if(entity.getTo().equals(String.valueOf(user.getNo()))){
							entity.setTo(user.getName());
						}
					}
					resultList.add(entity);
				}
			}
		}
		result.put("masageList", resultList);
		return result;
	} 
} 