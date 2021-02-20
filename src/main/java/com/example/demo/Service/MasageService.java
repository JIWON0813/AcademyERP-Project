package com.example.demo.Service;

import java.util.*;

import com.example.demo.database.Entity.*;
import com.example.demo.database.Mapper.MasageMapper;
import com.example.demo.database.Repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MasageService {
    
    @Autowired
    private MasageMapper masageMapper;

    public int MasageInsert(MasageEntity entity){
        int result = masageMapper.MasageInsert(entity); 
        return result;
    }

    public List<MasageEntity> MasageGet(){
        List<MasageEntity> result = masageMapper.MasageGet();
        return result;
    }

    public int MasagePut(HashMap<String,Object> map){
        return masageMapper.MasagePut(map);
    }

    public MasageEntity Masage(int no){
        return masageMapper.Masage(no);
    }

    public int MasageDelete(int no){
        return masageMapper.MasageDelete(no);
    }

}
