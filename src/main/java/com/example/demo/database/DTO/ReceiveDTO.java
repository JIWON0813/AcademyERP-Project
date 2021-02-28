package com.example.demo.database.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReceiveDTO {

    private long no;
    private int student;
    private int lecture;
    private String date;
    private String pay;
    private String unpaid;
    private String status;
    private String hp;
    private int branch;
}
