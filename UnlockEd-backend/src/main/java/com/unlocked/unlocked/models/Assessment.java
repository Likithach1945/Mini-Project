
package com.unlocked.unlocked.models;

//import com.unlocked.unlocked.models.Question;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

public class Assessment {
    private List<Question> questions;

    public Assessment() {
    }

    public Assessment(List<Question> questions) {
        this.questions = questions;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}


//package com.unlocked.unlocked.models;
//
//import com.unlocked.unlocked.models.Question;
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//import java.util.List;
//
//@Document(collection = "assessments")
//public class Assessment {
//    @Id
//    private String id;
//    private String chapterId;
//    private List<Question> questions;
//    private int score;
//    private boolean passed;
//
//    public Assessment(String chapterId, List<Question> questions, int score) {
//        this.chapterId = chapterId;
//        this.questions = questions;
//        this.score = score;
//        this.passed = score > 70; // Pass condition
//    }
//
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public String getChapterId() {
//        return chapterId;
//    }
//
//    public void setChapterId(String chapterId) {
//        this.chapterId = chapterId;
//    }
//
//    public List<Question> getQuestions() {
//        return questions;
//    }
//
//    public void setQuestions(List<Question> questions) {
//        this.questions = questions;
//    }
//
//    public int getScore() {
//        return score;
//    }
//
//    public void setScore(int score) {
//        this.score = score;
//        this.passed = score > 70; // Update pass condition when score changes
//    }
//
//    public boolean isPassed() {
//        return passed;
//    }
//}
//
