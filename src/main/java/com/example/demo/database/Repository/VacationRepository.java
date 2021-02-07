package com.example.demo.database.Repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import com.example.demo.database.DTO.*;
import java.util.*;

@Mapper
@Repository
public interface VacationRepository {
    List<VacationEntity> getVacation(PagingVO vo);
    int insertVacation(VacationEntity param);
    int count();
    VacationEntity vacation(int no);
}  
