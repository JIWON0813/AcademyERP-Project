// package com.example.demo.Controller;

// import com.example.demo.Entity.NoticeEntity;
// import com.example.demo.Service.NoticeService;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.util.HashMap;
// import java.util.List;

// @RestController
// @RequestMapping(value = "/")
// @CrossOrigin("*")
// public class NoticeController {

//     @Autowired
//     private NoticeService noticeService;

//     @GetMapping("/notice")
//     public HashMap<String, List> list() {
//         return noticeService.list();
//     }

//     @GetMapping("/notice/{id}")
//     public HashMap<String, Object> detail(@PathVariable("id") Long id) {
//         return noticeService.detail(id);
//     }

//     @PostMapping("/notice")
//     public String write(@RequestBody NoticeEntity not) {
//         return noticeService.write(not);
//     }

//     @DeleteMapping("/notice/{id}")
//     public void delete(@PathVariable("id") Long id) {
//         noticeService.delete(id);

//     }

//     @PutMapping("/notice/edit/{id}")
//     public String update(@RequestBody NoticeEntity not, @PathVariable("id") Long id) {
//         return noticeService.update(not, id);

//     }

// }