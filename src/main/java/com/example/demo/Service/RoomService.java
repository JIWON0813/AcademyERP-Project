package com.example.demo.Service;

import com.example.demo.database.Entity.*;
import com.example.demo.database.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<RoomEntity> list(Long branch) {
        return roomRepository.findAllByBranch(branch);
    }

    public HashMap<String, Object> detail(Long id) {
        HashMap<String, Object> result = new HashMap<>();
        Optional<RoomEntity> list = roomRepository.findById(id);
        result.put("list", list);

        return result;
    }

    public String write(RoomEntity room) {
        RoomEntity result =  roomRepository.save(room);
        return result.toString();
    }

    public void delete(Long id) {
        roomRepository.deleteById(id);
    }

    public String update(RoomEntity room, Long id) {
        room.setNo(id);
        RoomEntity result =  roomRepository.save(room);
        return result.toString();
    }

}