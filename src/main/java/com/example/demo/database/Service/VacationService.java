package com.example.demo.database.Service;

import java.util.*;

import com.example.demo.database.DTO.*;
import com.example.demo.database.Repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class VacationService {

    @Autowired
    private VacationRepository VacationRepo;

    public VacationEntity vacation(int no){
        VacationEntity result = VacationRepo.vacation(no);
        return result;
    }

    public List<VacationEntity> getVacation(PagingVO vo){
        List<VacationEntity>list = VacationRepo.getVacation(vo);
        return list;
    }

    public List<VacationEntity> getVacation_user(HashMap<String,Object> to){
        List<VacationEntity>list = VacationRepo.getVacation_user(to);
        return list;
    }

    public int insertVacation(VacationEntity param){
        int result = VacationRepo.insertVacation(param);
        return result;
    }

    public int count(){
        return VacationRepo.count();
    }

    public int count_user(int no){
        return VacationRepo.count_user(no);
    }

}
