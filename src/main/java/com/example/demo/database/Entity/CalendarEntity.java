package com.example.demo.database.Entity;

import java.io.Serializable;


import javax.persistence.*;
import lombok.*;

    @Table(name = "calendar" )
    @Entity
    @Getter
    @Setter
    public class CalendarEntity implements Serializable {
	
        private static final long serialVersionUID = 1L;

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column
        private long id;
        private String title;
        private String start;
        private String end;
        private String color;
    }

