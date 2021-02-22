package com.example.demo.database.Entity;

import java.io.Serializable;

import javax.persistence.*;



import lombok.*;

@Entity
@Table(name = "student")
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentEntity implements Serializable {

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
    private Integer lecture;
    private String gender;
    private String regdate;
    private String lecname;

}
