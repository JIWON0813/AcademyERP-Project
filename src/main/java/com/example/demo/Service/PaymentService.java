package com.example.demo.Service;

import java.util.*;

import com.example.demo.database.DTO.*;
import com.example.demo.database.Repository.*;
import com.example.demo.database.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PaymentService {

    @Autowired
    private PaymentRepository PaymentRepo;

    public PaymentEntity getpayment(int no){
        return PaymentRepo.getpayment(no);
    }

    public List<PaymentEntity> payment(){
        return PaymentRepo.payment();
    }
   
    public int approved(HashMap<String,Object> to){
        return PaymentRepo.approved(to);
    }

    public int sign(HashMap<String,Object> to){
        return PaymentRepo.sign(to);
    }

    public String selectSign(HashMap<String,Object> no){
        return PaymentRepo.selectSign(no);
    }

    public int insert(PaymentEntity entity){
        return PaymentRepo.insert(entity);
    }

}
