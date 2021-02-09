package com.example.demo.database.Repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import com.example.demo.database.DTO.*;
import java.util.*;
import com.example.demo.database.Entity.*;

@Mapper
@Repository
public interface VacationRepository {
    List<VacationEntity> getVacation(PagingVO vo);
    List<VacationEntity> getVacation_user(HashMap<String,Object> to);
    int insertVacation(VacationEntity param);
    int count();
    int count_user(int no);
    VacationEntity vacation(int no);
}  
