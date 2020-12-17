package com.example.demo.database.Repository;

import com.example.demo.database.DTO.BoardEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {

}