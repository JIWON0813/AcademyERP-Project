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
    private BigDecimal paidAmount;
    private long customData;
    private String payMethod;
    private String name;
    private Date paidAt;
    private String reason;
    private BigDecimal cancel_request_amount;

}
