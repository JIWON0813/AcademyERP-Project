package com.example.demo.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;



import com.example.demo.database.DTO.LectureDTO;

public class DateSelector {

    public List<String> Datereturn(String start, String end, String day) throws ParseException {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        
        Date d1 = df.parse(start);
        Date d2 = df.parse(end);
        String[] dayArr = day.split(",");
        System.out.println(dayArr.length);
        int[] week2 = new int[dayArr.length];
        for(int i = 0;i<dayArr.length;i++){
            System.out.println(dayArr[i]);
                switch(dayArr[i]){
                case "일":
                    week2[i] = 1;
                    break ;
                case "월":
                week2[i] = 2;
                    break ;
                case "화":
                week2[i] = 3;
                    break ;
                case "수":
                week2[i] = 4;
                    break ;
                case "목":
                week2[i] = 5;
                    break ;
                case "금":
                week2[i] = 6;
                    break ;
                case "토":
                week2[i] = 7;
                    break ;
            } 
            System.out.println(week2[i]);
        }
        
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();

        c1.setTime(d1);
        c2.setTime(d2);
        ArrayList<String> list = new ArrayList<String>();

        while (c1.compareTo(c2) != 1) {
            String Indate = df.format(c1.getTime());
            //String fin = "{ id:0,color:'#f20707',title:'plz',start:'" +Indate+"',end: '" +Indate+"'}";
            
            int dayNum = c1.get(Calendar.DAY_OF_WEEK);
            
            for(int i=0;i<dayArr.length;i++){
            if (dayNum==week2[i]){
                list.add(Indate);
                
            }
            }
            c1.add(Calendar.DATE, 1);
        }

        // Iterator<String> empIterator = list.iterator();
        // while(empIterator.hasNext()) {
        //     System.out.println(empIterator.next());
        // }

        return list;
    }


    public List<String> Iteratoring(List<LectureDTO> list) throws ParseException {
        List<String> slist =null;
        Iterator<LectureDTO> empIterator = list.iterator();
        while (empIterator.hasNext()) {
            String str = empIterator.next().toString();
            String[] arr =  str.split("/");
            String start = arr[0];
            String end = arr[1];
            String day = arr[2];
            System.out.println(start);
            System.out.println(end);
            System.out.println(day);
            DateSelector dr = new DateSelector();
            slist = dr.Datereturn(start, end, day);
        }

        Iterator<String> empIterator1 = slist.iterator();
        while(empIterator1.hasNext()) {
            System.out.println(empIterator1.next());
        }
        
        return slist;
    }

}
