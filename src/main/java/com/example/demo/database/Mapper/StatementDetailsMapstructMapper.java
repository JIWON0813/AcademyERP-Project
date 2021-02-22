package com.example.demo.database.Mapper;

import com.example.demo.database.DTO.StatementDetailsDTO;
import com.example.demo.database.Entity.StatementDetailsEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StatementDetailsMapstructMapper extends GenericMapper<StatementDetailsDTO, StatementDetailsEntity>{

}