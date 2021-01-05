package com.example.demo.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;


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

