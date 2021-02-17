package com.example.demo.database.Entity;

import java.io.Serializable;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "lecture")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long no;
    private String name;
    private long teacher;
    private int price;
    private int students;
    private long room;
    private String start_date;
    private String end_date;
    private String day;
    private String start_time;
    private String end_time;
    private long part;
    private long branch;

}

