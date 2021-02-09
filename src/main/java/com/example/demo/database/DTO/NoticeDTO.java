package com.example.demo.database.DTO;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeDTO {

    private long no;
    private String title;
    private String section;
    private String content;
    private int empno;
    private Date regdate;
    private long hits;
    
    
}
