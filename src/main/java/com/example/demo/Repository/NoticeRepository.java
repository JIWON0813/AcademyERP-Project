package com.example.demo.Repository;

import com.example.demo.Entity.NoticeEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<NoticeEntity, Long> {
    
}
