package com.example.demo.database.Entity;

import java.io.Serializable;

import javax.persistence.*;
import lombok.*;
 


@Entity
@Table(name = "department")
@Getter
@Setter
@Data
public class departmentDTO implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long no;
    private String name;



}
