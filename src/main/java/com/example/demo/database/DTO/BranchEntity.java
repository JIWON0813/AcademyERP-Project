package com.example.demo.database.DTO;

import java.io.Serializable;

import javax.persistence.*;
import lombok.*;


    @Entity
    @Table(name = "branch")
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class BranchEntity implements Serializable {
	
        private static final long serialVersionUID = 1L;

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column
        private long no;
        private String name;
        private String address;
        private String hp;
        private String owner;
        

        
    }

