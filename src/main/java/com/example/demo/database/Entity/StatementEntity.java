package com.example.demo.database.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "statement")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatementEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long no;
    private int workplace;
    private long employee;
    private long branch;
    private String allNote;
    private String proofDate;
    private String reportingDate;

}

