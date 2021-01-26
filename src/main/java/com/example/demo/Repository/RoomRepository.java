package com.example.demo.Repository;

import com.example.demo.Entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<RoomEntity, Long> {

    List<RoomEntity> findAllByBranch(Long branch);

}