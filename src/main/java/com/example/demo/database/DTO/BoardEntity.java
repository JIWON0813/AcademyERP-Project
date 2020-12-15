package com.example.demo.database.DTO;

import java.io.Serializable;

import javax.persistence.*;
import lombok.*;



    @Entity
    @Table(name = "employee")
    @Getter
    @Setter
    @Data
    public class BoardEntity implements Serializable {
	
        private static final long serialVersionUID = 1L;

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column
        private long no;
        private String name;
        private String id;
        private String password;
        private String hp;
        private String email;
        private String birth;
        private String address;
        private String sex;
        private String rank;
        private int salary;
        private String profile_name;
        private int profile_size;
        private int verify;
        private String regidate;
        private String department;
        private String branch;

        
    }

