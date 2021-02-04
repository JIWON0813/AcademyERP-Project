package com.example.demo.database.Entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;
import lombok.*;
    @Entity
    @Table(name = "consult" )
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class ConsultEntity implements Serializable {
	
        private static final long serialVersionUID = 1L;

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column
        private long no;
            private String name;
            private String hp;
            private String schedule;
            private String memo;
            private Date regdate;
            private String route;
            private String writer;
    }

