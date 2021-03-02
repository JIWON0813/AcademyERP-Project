//---------------------------------
// 제목 : 공지사항
// 파일명 : NoticeService.java
// 작성자 : 최인아
//---------------------------------
package com.example.demo.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.example.demo.database.Entity.NoticeEntity;
//import com.example.demo.Mapper.NoticeMapper;
import com.example.demo.database.Repository.NoticeRepository;

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
        noticeRepository.deleteById(id);
    }

    // public HashMap<String,List> selectEmployee(){
    //     HashMap<String,List> result = new HashMap<>();
    //     List<EmployeeEntity> list = employeeRepository.findAll();
    //     result.put("list", list);
    //     return result;
    // }

    // public String update(NoticeEntity not, Long id) {
    //     not.setNo(id);
    //     NoticeEntity result =  noticeRepository.save(not);
    //     return result.toString();
    // }
    
}
