package com.example.demo.database.DTO;

public class AttendanceEntity {
    private int no;
    private int employee_no;
    private String day;
    private String start_time;
    private String end_time;
    private String name;
    private String rank;
    private String department;
    private int night;

    public int getNight() {
        return this.night;
    }

    public void setNight(int night) {
        this.night = night;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRank() {
        return this.rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }


    public int getNo() {
        return this.no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public int getEmployee_no() {
        return this.employee_no;
    }

    public void setEmployee_no(int employee_no) {
        this.employee_no = employee_no;
    }

    public String getDay() {
        return this.day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getStart_time() {
        return this.start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getEnd_time() {
        return this.end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

}
