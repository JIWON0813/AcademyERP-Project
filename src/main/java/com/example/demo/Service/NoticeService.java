package com.example.demo.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.example.demo.DTO.NoticeDTO;
//import com.example.demo.DTO.NoticeDTO;
import com.example.demo.Entity.NoticeEntity;
//import com.example.demo.Mapper.NoticeMapper;
import com.example.demo.Repository.NoticeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoticeService {


    @Autowired
    private NoticeRepository noticeRepository;
    // @Autowired
    // private NoticeMapper noticemapper;

    public HashMap<String, Object> list() {
        HashMap<String, Object> result = new HashMap<>();
        List<NoticeEntity> list = noticeRepository.findAll();
        //List<NoticeDTO> list = noticemapper.getNoticeList(result);
        result.put("message", list);

        return result;
    }

    public HashMap<String, Optional> detail(Long id) {
        HashMap<String, Optional> result = new HashMap<>();
        Optional<NoticeEntity> list = noticeRepository.findById(id);
        //NoticeDTO list = noticeMapper.getNotice(id);
        result.put("list", list);

        return result;
    }

    public String write(NoticeEntity not) {
        NoticeEntity result =  noticeRepository.save(not);
        return result.toString();
    }

    public void delete(Long id) {
        System.out.println("진심");
        noticeRepository.deleteById(id);
    }

    public String update(NoticeEntity not, Long id) {
        not.setNo(id);
        NoticeEntity result =  noticeRepository.save(not);
        return result.toString();
    }
    
}
