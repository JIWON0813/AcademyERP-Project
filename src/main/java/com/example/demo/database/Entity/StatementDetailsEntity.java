package com.example.demo.database.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "statement_details")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatementDetailsEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column
    private long no;
    private long statement;
    private String note;
    private int line;
    private int debtor;
    private int creditor;
    private long account;
    private long customer;

}

