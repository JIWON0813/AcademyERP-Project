package com.example.demo.database.DTO;

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
        private int teacher;
        private int price;
        private int students;
        private int room;
        private String start_date;
        private String end_date;
        private String day;
        private String start_time;
        private String end_time;
        private int part;
        private int branch;

        
    }

