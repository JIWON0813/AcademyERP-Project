package com.example.demo.database.Repository;

import com.example.demo.database.Entity.PayEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PayRepository extends JpaRepository<PayEntity, Long> {
    List<PayEntity> findAllByCustomData(Long student);

    @Query(value = "update pay set cancel = 1,reason=:reason where impUId=:impUID",nativeQuery = true)
    void cancel(@Param("reason") String reason,
               @Param("impUID") String impUID);
}