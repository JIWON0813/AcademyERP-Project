package com.example.demo.database.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentEntity {
    private int no;
    private int employee_no;
    private String player;
    private String contents;
    private String approved;
    private String day;
    private int kinds;
    private String kinds_no;
}
