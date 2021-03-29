package com.example.demo.database.Mapper;

import com.example.demo.database.DTO.StatementDTO;
import com.example.demo.database.Entity.StatementEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StatementMapStructMapper extends GenericMapper<StatementDTO, StatementEntity> {

}