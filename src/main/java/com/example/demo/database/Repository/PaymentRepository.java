package com.example.demo.database.Repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import com.example.demo.database.DTO.*;
import java.util.*;

@Mapper
@Repository
public interface PaymentRepository {
    PaymentEntity getpayment(int no);
    List<PaymentEntity> payment();
    int approved(HashMap<String,Object> to);
}  