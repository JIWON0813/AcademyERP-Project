package com.example.demo.database.Entity;

import java.io.Serializable;

import javax.persistence.*;



import lombok.*;

@Entity
@Table(name = "curriculum")
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CurriculumEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
        private Long no;
        private int lecture;
        private String start_date;
        private String end_date;
        private String curriculum;
        private String detail;
        private String lname;
}