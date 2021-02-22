package com.example.demo.Service;

import com.example.demo.database.Entity.PartEntity;
import com.example.demo.database.Entity.PayEntity;
import com.example.demo.database.Entity.RoomEntity;
import com.example.demo.database.Repository.PayRepository;
import com.example.demo.database.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@Service
public class PayService {

    @Autowired
    private PayRepository payRepository;

    public String complete(PayEntity pay) {
        PayEntity result = payRepository.save(pay);
        return result.toString();
    }

    public HashMap<String, List> list(long student) {
        HashMap<String, List> result = new HashMap<>();
        System.out.println(student);
        List<PayEntity> list = payRepository.findAllByCustomData(student);
        result.put("list", list);
        return result;
    }

    public void cancel(String reason, String impUID) {
        payRepository.cancel(reason,impUID);
    }

}