package com.example.demo.database.Entity;

import java.io.Serializable;

import javax.persistence.*;
import lombok.*;

    @Entity
    @Table(name = "stu_att")
    @Data
    @AllArgsConstructor
    @NoArgsConstructor    
    public class Stu_AttEntity implements Serializable {
	
        private static final long serialVersionUID = 1L;

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column
        private long no;
        private int lecture;
        private String date;
        private String name;
        private int att;
    }