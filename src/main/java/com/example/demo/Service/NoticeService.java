// package com.example.demo.Service;

// import java.util.HashMap;
// import java.util.List;

// import com.example.demo.DTO.NoticeDTO;
// import com.example.demo.Entity.NoticeEntity;
// import com.example.demo.Mapper.NoticeMapper;
// import com.example.demo.Repository.NoticeRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// @Service
// public class NoticeService {

//     @Autowired
//     private NoticeRepository noticeRepository;

//     @Autowired
//     private NoticeMapper noticeMapper;

//     public HashMap<String, List> list() {
//         HashMap<String, List> result = new HashMap<>();
//         List<NoticeDTO> list = noticeMapper.getList();
//         result.put("message",list); 
        
//         return result;
//     }

//     public HashMap<String, Object> detail(Long id) {
//         HashMap<String, Object> result = new HashMap<>();
//         NoticeDTO list = noticeMapper.writeNotice(id);
//         result.put("message", list);

//         return result;
//     }

//     public String write(NoticeEntity not) {
//         NoticeEntity result =  noticeRepository.save(not);
//         return result.toString();
//     }

//     public void delete(Long id) {
//         noticeRepository.deleteById(id);
//     }

//     public String update(NoticeEntity not, Long id) {
//         not.setNo(id);
//         NoticeEntity result =  noticeRepository.save(not);
//         return result.toString();
//     }
    
// }
