package com.example.demo.DTO;


import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConsultDTO {

    private long no;
    private String name;
    private String hp;
    private String schedule;
    private String memo;
    private String route;
    private String writer;
    private Date regdate;
    
}
