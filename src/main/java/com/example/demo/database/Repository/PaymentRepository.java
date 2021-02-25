package com.example.demo.database.Repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import java.util.*;
import com.example.demo.database.Entity.*;
@Mapper
@Repository
public interface PaymentRepository {
    PaymentEntity getpayment(int no);
    List<PaymentEntity> payment();
    int approved(HashMap<String,Object> to);
    int sign(HashMap<String,Object> to); 
    int insert(PaymentEntity entity);
    HashMap<String, String> selectSign(HashMap<String,Object> to);
    HashMap<String, String> tableSelect(HashMap<String,Object> to);
    int deleteSign(int no);
}  