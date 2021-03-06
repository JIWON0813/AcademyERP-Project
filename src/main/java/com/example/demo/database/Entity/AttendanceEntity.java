package com.example.demo.database.Entity;

import java.io.Serializable;

import javax.persistence.*;
import lombok.*;
 



@Table(name = "attendance")
@Entity
@Getter
@Setter
public class AttendanceEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long no;
    private int employee_no;
    private String day;
    private String start_time;
    private String end_time; 
    private int night;

}
