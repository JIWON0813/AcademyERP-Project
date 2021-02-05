package com.example.demo.Controller;

import com.example.demo.Entity.ScoreEntity;
import com.example.demo.Service.ScoreService;

import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(value = "/")
@CrossOrigin("*")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    @GetMapping("/score")
    public HashMap<String,Optional> scoreList(@RequestParam("student") Long student,
                                               @RequestParam("lecture") Long lecture,
                                               @RequestParam("exam") Long exam) {
        return scoreService.getScoreList(student,lecture,exam);
    }

    @GetMapping("/score-total")
    public HashMap<String, Object> totalScore(@RequestParam("student") Long student,
                                              @RequestParam("lecture") Long lecture){
        return scoreService.getTotalScore(student,lecture);
    }

    @PostMapping("/score")
    public void write(@RequestBody String scoreArray) {
        JSONObject jObject = new JSONObject(scoreArray);
        List<ScoreEntity> dataList = new ArrayList<> ();
        JSONArray jArray = jObject.getJSONArray("scoreArray");
        for (int i = 0; i < jArray.length(); i++) {
            JSONObject order = jArray.getJSONObject(i);
            Gson gson = new Gson();
            ScoreEntity data = gson.fromJson(order.toString(), ScoreEntity.class);
            dataList.add(data);
        }
       scoreService.write(dataList);
    }

    @DeleteMapping("/score/{id}")
    public void delete(@PathVariable("id") Long id) {
        scoreService.delete(id);

    }

}