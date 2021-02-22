package com.example.demo.database.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Getter
@Setter
public class StatementDTO {
    private long no;
    private int workplace;
    private long employee;
    private long branch;
    private String allNote;
    private String proofDate;
    private String reportingDate;
    private List<StatementDetailsDTO> list;

}
