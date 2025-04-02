//package com.unlocked.unlocked.controllers;
//
//import com.unlocked.unlocked.models.Assessment;
//import com.unlocked.unlocked.models.Chapter;
//import com.unlocked.unlocked.models.Course;
//import com.unlocked.unlocked.models.Module;
//import com.unlocked.unlocked.repositories.CourseRepository;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Optional;
//
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("/api/unlock")
//public class UnlockController {
//
//    private final CourseRepository courseRepository;
//
//    public UnlockController(CourseRepository courseRepository) {
//        this.courseRepository = courseRepository;
//    }
//
//    // Unlock next module after completing one
//    @PostMapping("/module")
//    public ResponseEntity<String> unlockNextModule(@RequestParam String courseId, @RequestParam String chapterId, @RequestParam String moduleId) {
//        Optional<Course> courseOpt = courseRepository.findById(courseId);
//
//        if (courseOpt.isPresent()) {
//            Course course = courseOpt.get();
//
//            course.getChapters().forEach(chapter -> {
//                if (chapter.getChapterId().equals(chapterId)) {
//                    for (int i = 0; i < chapter.getModules().size(); i++) {
//                        Module module = chapter.getModules().get(i);
//                        if (module.getModuleId().equals(moduleId) && i + 1 < chapter.getModules().size()) {
//                            chapter.getModules().get(i + 1).setUnlocked(true);
//                        }
//                    }
//                }
//            });
//
//            courseRepository.save(course);
//            return ResponseEntity.ok("Next module unlocked!");
//        }
//
//        return ResponseEntity.badRequest().body("Course not found.");
//    }
//
//    // Unlock next chapter after passing assessment
//    @PostMapping("/chapter")
//    public ResponseEntity<String> unlockNextChapter(@RequestParam String courseId, @RequestParam String chapterId, @RequestParam int score) {
//        Optional<Course> courseOpt = courseRepository.findById(courseId);
//
//        if (courseOpt.isPresent()) {
//            Course course = courseOpt.get();
//
//            for (int i = 0; i < course.getChapters().size(); i++) {
//                Chapter chapter = course.getChapters().get(i);
//                if (chapter.getChapterId().equals(chapterId)) {
//                    // Check if the score is >= 70 to unlock next chapter
//                    if (score >= 70 && i + 1 < course.getChapters().size()) {
//                        course.getChapters().get(i + 1).setUnlocked(true);
//                        courseRepository.save(course);
//                        return ResponseEntity.ok("Next chapter unlocked!");
//                    } else if (score < 70) {
//                        return ResponseEntity.badRequest().body("Score is less than 70%. Try again!");
//                    }
//                }
//            }
//
//            return ResponseEntity.badRequest().body("Chapter not found.");
//        }
//
//        return ResponseEntity.badRequest().body("Course not found.");
//    }
//}

package com.unlocked.unlocked.controllers;

import com.unlocked.unlocked.service.AssessmentService;
import com.unlocked.unlocked.service.UnlockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/unlock")
public class UnlockController {
    @Autowired
    private UnlockService unlockService;

    @PostMapping("/module")
    public ResponseEntity<?> unlockNextModule(@RequestBody Map<String, String> payload) {
        boolean success = unlockService.unlockNextModule(
                payload.get("courseId"),
                payload.get("chapterId"),
                payload.get("moduleId")
        );
        return success ? ResponseEntity.ok("Next module unlocked!") : ResponseEntity.badRequest().body("Module unlock failed.");
    }

    @Autowired
    private AssessmentService assessmentService;

    // Endpoint to unlock the next chapter after completing the assessment
    @PostMapping("/chapter")
    public ResponseEntity<?> unlockNextChapter(@RequestBody Map<String, Object> payload) {
        String courseId = (String) payload.get("courseId");
        String chapterId = (String) payload.get("chapterId");
        int score = (int) payload.get("score");

        // Call service to unlock the next chapter
        boolean success = assessmentService.unlockNextChapter(courseId, chapterId, score);

        // Return appropriate response based on the success of the operation
        if (success) {
            return ResponseEntity.ok("Next chapter unlocked!");
        } else {
            return ResponseEntity.status(400).body("Failed to unlock next chapter. Ensure the score is above 70%.");
        }
    }
}

