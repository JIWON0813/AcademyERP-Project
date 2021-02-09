package com.example.demo.database.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VacationApplyEntity {
    private int no;
    private int employee_no;
    private String start_day;
    private String end_day;
    private String use_vacation;
    private String day;
}
