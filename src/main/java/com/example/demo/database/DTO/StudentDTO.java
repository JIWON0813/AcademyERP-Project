package com.example.demo.database.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class StudentDTO {
    private long no;
    private String name;
    private String hp;
    private String email;
    private String birth;
    private String address;
    private long lecture;
    private String gender;
    private String regdate;
    private String lecname;

    //여진
    private long lectureNo;
    private String lectureName;
    private int price;
    private String start_date;
    private String end_date;
}