package com.example.demo.database.Service;

import java.util.*;

import com.example.demo.database.DTO.*;
import com.example.demo.database.Repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PaymentService {

    @Autowired
    private PaymentRepository PaymentRepo;

    public List<PaymentEntity> getpayment(PagingVO vo){
        return PaymentRepo.getpayment(vo);
    }

    public List<PaymentEntity> payment(){
        return PaymentRepo.payment();
    }
   

}
