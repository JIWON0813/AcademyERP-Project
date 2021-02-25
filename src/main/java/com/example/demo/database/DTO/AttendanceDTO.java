package com.example.demo.database.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttendanceDTO {
    private int no;
    private int employee_no;
    private String day;
    private String start_time;
    private String end_time;
    private String name;
    private String rank;
    private String department;
    private int night;

}
