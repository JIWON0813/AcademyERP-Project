
package com.example.demo.database.Entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;
import lombok.*;



@Entity
@Table(name = "employee")
@Getter
@Setter
@Data
public class EmployeeEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long no;

    private String name;
    private String id;
    private String password;
    private String hp;
    private String email;
    private String birth;
    private String address;
    private String rank;
    private int salary;
    private String profile_name;
    private Integer profile_size;
    private int verify;
    private Date regidate;
    private int department;
    private int branch;


}