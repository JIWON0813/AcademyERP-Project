package com.example.demo.database.Service;

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

}
