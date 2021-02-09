package com.example.demo.Service;

import java.util.*;

import com.example.demo.database.DTO.*;
import com.example.demo.database.Repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class VacationApplyService {

    @Autowired
    private VacationApplyRepository VacationApplyRepo;

    public int insert(VacationApplyEntity dto){
        int result = VacationApplyRepo.insert(dto);
        return result;
    }

    public List<VacationApplyEntity> get(HashMap<String,Object> to){
        List<VacationApplyEntity> result = VacationApplyRepo.get(to);
        return result;
    }

    public int count(){
        int result = VacationApplyRepo.count();
        return result;
    }

    public VacationApplyEntity getApply(int no){
        return VacationApplyRepo.getApply(no);
    }


}
