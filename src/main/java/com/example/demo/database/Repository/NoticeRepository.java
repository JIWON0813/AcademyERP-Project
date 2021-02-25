package com.example.demo.database.Repository;

import com.example.demo.database.Entity.NoticeEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<NoticeEntity, Long> {
    
}
