package com.example.demo.database.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatementDetailsDTO {
    private long no;
    private long statement;
    private String note;
    private int line;
    private int debtor;
    private int creditor;
    private long account;
    private long customer;
}
