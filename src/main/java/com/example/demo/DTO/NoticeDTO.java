package com.example.demo.DTO;

import lombok.Data;
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
    private Data regdate;
    private int hits;
    
}
