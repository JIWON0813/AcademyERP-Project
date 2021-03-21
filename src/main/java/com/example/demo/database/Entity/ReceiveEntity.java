package com.example.demo.database.Entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "receive")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceiveEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long no;
    private long student;
    private long lecture;
    private String date;
    private String pay;
    private String unpaid;
    private String status;
    private String hp;
    private long branch;

    
}
