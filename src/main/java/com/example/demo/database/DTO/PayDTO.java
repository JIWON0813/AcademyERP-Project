package com.example.demo.database.DTO;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Iterator;

@Getter
@Setter
public class PayDTO {
    private long no;
    private String merchantUID;
    private String impUID;
    private BigDecimal paid_amount;
    private long custom_data;
    private String pay_method;
    private String name;
    private Date paid_at;
    private String reason;
    private BigDecimal cancel_request_amount;

}
