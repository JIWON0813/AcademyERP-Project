package com.example.demo.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


@Entity
@Table(name = "score")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScoreEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column
    private long no;
    private long student;
    private long lecture;
    private int score;
    private long exam;
    private Date regdate;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ExamEntity examEntity;


}

