package com.example.demo.database.DTO;

import java.io.Serializable;

import javax.persistence.*;
import lombok.*;

    @Entity
    @Table(name = "lecture")
    @Data
    @AllArgsConstructor
    @NoArgsConstructor    
    public class LectureEntity implements Serializable {
	
        private static final long serialVersionUID = 1L;

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column
        private long no;
        private String name;
        private int teacher;
        private int price;
        private int students;
        private int room;
        private String start_date;
        private String end_date;
        private String day;
        private String start_time;
        private String end_time;
        private int part;
        private int branch;

        public long getNo() {
            return this.no;
        }

        public void setNo(long no) {
            this.no = no;
        }

        public String getName() {
            return this.name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getTeacher() {
            return this.teacher;
        }

        public void setTeacher(int teacher) {
            this.teacher = teacher;
        }

        public int getPrice() {
            return this.price;
        }

        public void setPrice(int price) {
            this.price = price;
        }

        public int getStudents() {
            return this.students;
        }

        public void setStudents(int students) {
            this.students = students;
        }

        public int getRoom() {
            return this.room;
        }

        public void setRoom(int room) {
            this.room = room;
        }

        public String getStart_date() {
            return this.start_date;
        }

        public void setStart_date(String start_date) {
            this.start_date = start_date;
        }

        public String getEnd_date() {
            return this.end_date;
        }

        public void setEnd_date(String end_date) {
            this.end_date = end_date;
        }

        public String getDay() {
            return this.day;
        }

        public void setDay(String day) {
            this.day = day;
        }

        public String getStart_time() {
            return this.start_time;
        }

        public void setStart_time(String start_time) {
            this.start_time = start_time;
        }

        public String getEnd_time() {
            return this.end_time;
        }

        public void setEnd_time(String end_time) {
            this.end_time = end_time;
        }

        public int getPart() {
            return this.part;
        }

        public void setPart(int part) {
            this.part = part;
        }

        public int getBranch() {
            return this.branch;
        }

        public void setBranch(int branch) {
            this.branch = branch;
        }
		

        
    }

