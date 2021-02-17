package com.example.demo.database.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "pay")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PayEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long no;
    private String merchantUID;
    private String impUID;
    private BigDecimal paidAmount;
    private long customData;
    private String payMethod;
    private String name;
    private Date paidAt;
    private String reason;
    private int cancel;

}