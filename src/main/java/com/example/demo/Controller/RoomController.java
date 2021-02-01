package com.example.demo.Controller;

import com.example.demo.DTO.LecturePagingVO;
import com.example.demo.Entity.LectureEntity;
import com.example.demo.Entity.RoomEntity;
import com.example.demo.Service.LectureService;
import com.example.demo.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping(value = "/")
@CrossOrigin("*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/room/{id}")
    public HashMap<String, Object> detail(@PathVariable("id") Long id) {

        return roomService.detail(id);
    }

    @PostMapping("/room")
    public String write(@RequestBody RoomEntity room) {

        return roomService.write(room);
    }

    @DeleteMapping("/room/{id}")
    public void delete(@PathVariable("id") Long id) {
        roomService.delete(id);

    }

    @PutMapping("/room/{id}")
    public String update(@RequestBody RoomEntity room, @PathVariable("id") Long id) {
        return roomService.update(room, id);
    }

}