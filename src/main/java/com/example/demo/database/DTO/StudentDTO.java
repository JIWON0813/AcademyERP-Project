package com.example.demo.database.DTO;

import java.io.Serializable;

import javax.persistence.*;


import lombok.*;

    @Entity
    @Table(name = "student")
    @Getter
    @Setter
    @Data
public class StudentDTO implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long no;
    private String name;
    private String hp;
    private String email;
    private String birth;
    private String address;
    private String curri;
    private String gender;
    private String regdate;

    public Long getNo() {
        return this.no;
    }

    public void setNo(Long no) {
        this.no = no;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHp() {
        return this.hp;
    }

    public void setHp(String hp) {
        this.hp = hp;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBirth() {
        return this.birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCurri() {
        return this.curri;
    }

    public void setCurri(String curri) {
        this.curri = curri;
    }

    public String getGender() {
        return this.gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getRegdate() {
        return this.regdate;
    }

    public void setRegdate(String regdate) {
        this.regdate = regdate;
    }

}
