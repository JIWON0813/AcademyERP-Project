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

    public List<VacationEntity> getVacation(){
        List<VacationEntity>list = VacationRepo.getVacation();
        return list;
    }

}
