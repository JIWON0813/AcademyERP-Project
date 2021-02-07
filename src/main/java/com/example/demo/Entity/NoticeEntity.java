package com.example.demo.Entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "notice")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoticeEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long no;
    private String title;
    private String section;
    private String content;
    private String empno;
    private Date regdate;
    private long hits;

    
}
