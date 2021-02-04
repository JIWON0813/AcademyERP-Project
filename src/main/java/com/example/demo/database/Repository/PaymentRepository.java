package com.example.demo.database.Repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import com.example.demo.database.DTO.*;
import java.util.*;

@Mapper
@Repository
public interface PaymentRepository {
    List<PaymentEntity> getpayment(PagingVO vo);
    List<PaymentEntity> payment();
}  