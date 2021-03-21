package com.example.demo.database.Entity;

import java.io.Serializable;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "costList")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CostEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long no;
    private String section;
    private String reason;
    private String allcost;
    private String date;
    private String state;    
}
