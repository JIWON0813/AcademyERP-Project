package com.example.demo.database.DTO;

import java.io.Serializable;

import javax.persistence.*;
import lombok.*;
 



@Table(name = "vacation")
@Entity
@Getter
@Setter
public class VacationEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long no;
    private int employee_no;
    private String day;
    private String name;
}