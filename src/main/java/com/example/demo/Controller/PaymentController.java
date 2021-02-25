package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.Map.Entry;

import com.example.demo.Service.*;
import com.example.demo.database.Entity.*;
import com.example.demo.database.Repository.EmployeeRepository;


@RestController
public class PaymentController {
    @Autowired
    private PaymentService PaymentService;
    @Autowired
	private VacationApplyService VacationApplyService;
    @Autowired
    private EmployeeRepository EmployeeService;

    final String sr ="selectSign";

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

    @GetMapping("/adpayment")
    public Map<String,Object> adpayment() {
        HashMap<String,Object> result = new HashMap<>();
        List<PaymentEntity> all = PaymentService.payment();
       
		List<EmployeeEntity> list = EmployeeService.findAll();
        result.put("user", list);
        result.put("list", all); 

        return result;
    }  

    @GetMapping("/paymentUsers")
    public Map<String,Object> paymentUsers() {
        HashMap<String,Object> result = new HashMap<>();
        List<EmployeeEntity> user = EmployeeService.findAll();
        result.put("user",user);
        return result;
    }



    //1: 휴가 //2: 출퇴
    @GetMapping("/payment/{id}/{no}")
    public Map<String,Object> paymentget( @PathVariable(value="id")int id,@PathVariable("no") int num) {
        HashMap<String,Object> result = new HashMap<>();
        PaymentEntity list = PaymentService.getpayment(id);
        String kinds = list.getKinds();
        String kinds_no = list.getKinds_no();
        List<HashMap<String, String>> table = new ArrayList<HashMap<String, String>>();


        String no[] = kinds_no.split("/");
        for(int i=0;i<no.length;i++){
            HashMap<String,Object> selectIndex= new HashMap<>();
            selectIndex.put("tableName", kinds);
            selectIndex.put("no",no[i]);
            table.add( PaymentService.tableSelect(selectIndex) );
        }


        result.put(sr,false);
        HashMap<String,Object> to= new HashMap<>();
        to.put("no", num);
        if((PaymentService.selectSign(to).size()>0)){
            result.put(sr,PaymentService.selectSign(to));
        }

        
        List<String> column= new ArrayList<String>();
        for( Entry<String, String> elem : table.get(0).entrySet() ){
            column.add(elem.getKey());
        }
        
        Collections.swap(column, 0, column.indexOf("no"));
        List<EmployeeEntity> user = EmployeeService.findAll();
        result.put("user",user);
        result.put("column",column);
        result.put("list", list); 
        result.put("table", table);
        return result;
    }


    @GetMapping("/payment/{no}")
    public Map<String,Object> paymentget( @PathVariable("no") int num) {
        HashMap<String,Object> result = new HashMap<>();
        PaymentEntity list = PaymentService.getpayment(num);
        List<EmployeeEntity> user = EmployeeService.findAll();
        String kinds = list.getKinds();
        String kinds_no = list.getKinds_no();
        List<Object> table = new ArrayList<Object>();

        String no[] = kinds_no.split("/");
        for(int i=0;i<no.length;i++){
            HashMap<String,Object> selectIndex= new HashMap<>();
            selectIndex.put("tableName", kinds);
            selectIndex.put("no",no[i]);
            table.add( PaymentService.tableSelect(selectIndex) );
        }

        result.put(sr,false);
        List<HashMap<String, String>> signList =new ArrayList<HashMap<String, String>>();
        String app=list.getApproved();
        if(app!=null && app.length()>0){
            String apparr[]=app.split("/");
            HashMap<String,Object> to = new HashMap<>();
            for(int i=0;i<apparr.length;i++){
                to.put("no", Integer.parseInt(apparr[i]));
                signList.add(PaymentService.selectSign(to)); 
            }
        } 
        result.put("signList",signList);
        result.put("user",user);
        result.put("list", list); 
        result.put("table", table);
        return result;
    }

    @PostMapping("/payment/approved")
    public int approved( @RequestParam("no")int no, @RequestParam("id")int id) {
        PaymentEntity get = PaymentService.getpayment(no);
        String app=get.getApproved();
        boolean check =true;
        if(app!=null){
            String appList[] = app.split("/");
            for(int i=0;i<appList.length;i++){
                if(Integer.parseInt(appList[i])==id){
                    check=false;
                }
            }   
        }else{
            app="";
        }

        if(check){
            HashMap<String,Object> to= new HashMap<>();
            app= app+id+"/";
            to.put("approved",app);
            to.put("no",no);
            return PaymentService.approved(to); 
        }
        return 0; 
    }

    @PostMapping("/payment")
    public int insert(@RequestBody PaymentEntity entity){
        return PaymentService.insert(entity);
    }

    @PostMapping("/upload")
    public String uploadSingle(@RequestParam("file") MultipartFile file,@RequestParam("no") int no) throws Exception {
        HashMap<String,Object> to= new HashMap<>();
        String filePath = System.getProperty("user.dir")+"/frontend/my-app/public/sign/";
        File target = new File(filePath, file.getOriginalFilename());
        try {
            file.transferTo(target);
            to.put("filename", file.getOriginalFilename());
            to.put("employee_no",no);
            PaymentService.sign(to);
        } catch (IOException e) {
            System.out.println(e);
        }
  
        return "uploaded";
    }

}
