package com.example.demo.database.Mapper;

import com.example.demo.database.Entity.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MasageMapper {
    int MasageInsert(MasageEntity entity);
    List<MasageEntity> MasageGet();
}