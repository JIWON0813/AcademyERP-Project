package com.example.demo.database.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LectureDTO {
    private long no;
    private String name;
    private int teacher;
    private String instructor;
    private int price;
    private int students;
    private int room;
    private String classRoom;
    private String start_date;
    private String end_date;
    private String day;
    private String start_time;
    private String end_time;
    private int part;
    private int branch;
    private int currentStudents;
    private String office;
    private String field;
}
