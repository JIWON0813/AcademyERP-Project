package com.example.demo.database.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import com.example.demo.database.Service.*;
import com.example.demo.database.DTO.*;
import com.example.demo.database.Repository.EmployeeRepository;

@RestController
public class PaymentController {
    @Autowired
    private PaymentService PaymentService;
    @Autowired
	private VacationService VacationService;
    @Autowired
    private EmployeeRepository EmployeeService;
   

    @GetMapping("/payment/{nowPage}/{cntPerPage}/{id}")
    public Map<String,Object> payment(PagingVO vo, @PathVariable(value="nowPage")String nowPage
    , @PathVariable(value="cntPerPage")String cntPerPage, @PathVariable(value="id")int id) {
        HashMap<String,Object> result = new HashMap<>();
        List<PaymentEntity> all = PaymentService.payment();
        int total=0;
        List<PaymentEntity> tempList =  new ArrayList<PaymentEntity>();
        List<PaymentEntity> resultList =  new ArrayList<PaymentEntity>();

        for(int i=0;i<all.size();i++){
            String[] temp=all.get(i).getPlayer().split("/");
            for(int l=0;l<temp.length;l++){
                if(Integer.parseInt(temp[l])==id){
                    total++;
                    tempList.add(all.get(i));
                }
            }
        }

        if(total>0){
            if (nowPage == null && cntPerPage == null) {
                nowPage = "1";
                cntPerPage = "10";
            } else if (nowPage == null) {
                nowPage = "1";
            } else if (cntPerPage == null) { 
                cntPerPage = "10";
            }

            vo = new PagingVO(total, Integer.parseInt(nowPage), Integer.parseInt(cntPerPage));
            int first=0;
            int last = tempList.size();
            int last2 = vo.getCntPerPage()+vo.getStart()-1;    
            if(last>last2){
                first=vo.getStart();    
                last=last2;
            }
            for(int i=first;i<last;i++){
                resultList.add(tempList.get(i));
            }
        }

		List<EmployeeEntity> list = EmployeeService.findAll();
        result.put("user", list);
        result.put("list", resultList); 
        result.put("page",vo);
        return result;
    }  


    //1: 휴가 //2: 출퇴
    @GetMapping("/payment/{id}")
    public Map<String,Object> paymentget( @PathVariable(value="id")int id) {
        HashMap<String,Object> result = new HashMap<>();
        PaymentEntity list = PaymentService.getpayment(id);
        List<EmployeeEntity> user = EmployeeService.findAll();
        int kinds = list.getKinds();
        String kinds_no = list.getKinds_no();
        List<Object> table = new ArrayList<Object>();

        switch(kinds){
            case 1 : 
                String no[] = kinds_no.split("/");
                for(int i=0;i<no.length;i++)
                    table.add( VacationService.vacation(Integer.parseInt(no[i])) );
                break;
            case 2 : 
                
                break;  
            default :      
        }
        
        result.put("user",user);
        result.put("list", list); 
        result.put("table", table);
        return result;
    }

}
