package com.example.demo.database.Mapper;

import com.example.demo.database.Entity.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface MasageMapper {
    int MasageInsert(MasageEntity entity);
    List<MasageEntity> MasageGet();
    int MasagePut(HashMap<String,Object> map);
    MasageEntity Masage (int no);
    int MasageDelete(int no);
}