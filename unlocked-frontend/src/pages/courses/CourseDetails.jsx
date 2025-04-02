// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ChapterDropdown from "./ChapterDropdown";
// import "./CourseDetails.css";

// const CourseDetail = ({ courseId }) => {
//   const [course, setCourse] = useState(null);

//   useEffect(() => {
//     // Fetch course details
//     const fetchCourseDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/courses/${courseId}`
//         );
//         setCourse(response.data);
//       } catch (error) {
//         console.error("Error fetching course:", error);
//       }
//     };

//     fetchCourseDetails();
//   }, [courseId]);

//   // Unlock the next chapter after assessment
//   const unlockNextChapter = async (courseId, chapterId, score) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/unlock/chapter`,
//         null,
//         {
//           params: { courseId, chapterId, score },
//         }
//       );

//       if (response.data === "Next chapter unlocked!") {
//         alert("✅ Next chapter unlocked successfully!");
//         window.location.reload(); // Reload to show the unlocked chapter
//       } else {
//         alert("❌ Unable to unlock the next chapter. Try again.");
//       }
//     } catch (error) {
//       console.error("Error unlocking chapter:", error);
//     }
//   };

//   // Unlock the next module after completing module
//   const unlockNextModule = async (courseId, chapterId, moduleId) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/unlock/module`,
//         null,
//         {
//           params: { courseId, chapterId, moduleId },
//         }
//       );

//       if (response.data === "Next module unlocked!") {
//         alert("✅ Next module unlocked successfully!");
//         window.location.reload(); // Reload to show the unlocked module
//       } else {
//         alert("❌ Unable to unlock the next module. Try again.");
//       }
//     } catch (error) {
//       console.error("Error unlocking module:", error);
//     }
//   };

//   if (!course) {
//     return <div className="loading">Loading course...</div>;
//   }

//   return (
//     <div className="course-detail">
//       {/* Display the course title */}
//       <h2 className="course-title">{course.title || course.courseTitle}</h2>

//       {/* Loop through chapters and render ChapterDropdown */}
//       {course.chapters && course.chapters.length > 0 ? (
//         course.chapters.map((chapter) => (
//           <ChapterDropdown
//             key={chapter.chapterId || chapter.id}
//             chapter={chapter}
//             courseId={courseId}
//             unlockNextChapter={unlockNextChapter}
//             unlockNextModule={unlockNextModule} // Pass function to unlock next module
//           />
//         ))
//       ) : (
//         <div>No chapters available for this course.</div>
//       )}
//     </div>
//   );
// };

// export default CourseDetail;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ChapterDropdown from "./ChapterDropdown";
// import "./CourseDetails.css";

// const CourseDetail = ({ courseId }) => {
//   const [course, setCourse] = useState(null);

//   useEffect(() => {
//     // Fetch course details
//     const fetchCourseDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/courses/${courseId}`
//         );
//         setCourse(response.data);
//       } catch (error) {
//         console.error("Error fetching course:", error);
//       }
//     };

//     fetchCourseDetails();
//   }, [courseId]);

//   // Unlock the next chapter after assessment
//   const unlockNextChapter = async (courseId, chapterId, score) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/unlock/chapter`,
//         { courseId, chapterId, score }
//       );

//       if (response.data === "Next chapter unlocked!") {
//         alert("✅ Next chapter unlocked successfully!");
//         window.location.reload(); // Reload to show the unlocked chapter
//       } else {
//         alert("❌ Unable to unlock the next chapter. Try again.");
//       }
//     } catch (error) {
//       console.error("Error unlocking chapter:", error);
//       alert("❌ There was an error unlocking the chapter. Please try again.");
//     }
//   };

//   // Unlock the next module after completing module
//   const unlockNextModule = async (courseId, chapterId, moduleId) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/unlock/module`,
//         { courseId, chapterId, moduleId }
//       );

//       if (response.data === "Next module unlocked!") {
//         alert("✅ Next module unlocked successfully!");
//         window.location.reload(); // Reload to show the unlocked module
//       } else {
//         alert("❌ Unable to unlock the next module. Try again.");
//       }
//     } catch (error) {
//       console.error("Error unlocking module:", error);
//     }
//   };

//   if (!course) {
//     return <div className="loading">Loading course...</div>;
//   }

//   return (
//     <div className="course-detail">
//       {/* Display the course title */}
//       <h2 className="course-title">{course.title || course.courseTitle}</h2>

//       {/* Loop through chapters and render ChapterDropdown */}
//       {course.chapters && course.chapters.length > 0 ? (
//         course.chapters.map((chapter) => (
//           <ChapterDropdown
//             key={chapter.chapterId || chapter.id}
//             chapter={chapter}
//             courseId={courseId}
//             unlockNextChapter={unlockNextChapter}
//             unlockNextModule={unlockNextModule} // Pass function to unlock next module
//           />
//         ))
//       ) : (
//         <div>No chapters available for this course.</div>
//       )}
//     </div>
//   );
// };

// export default CourseDetail;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ChapterDropdown from "./ChapterDropdown";
import "./CourseDetails.css";

const CourseDetail = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [assessmentAttempted, setAssessmentAttempted] = useState(false);
  const [assessmentPassed, setAssessmentPassed] = useState(false);

  useEffect(() => {
    // Fetch course details
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/courses/${courseId}`
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  // Unlock the next chapter after assessment
  const unlockNextChapter = async (courseId, chapterId, score) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/unlock/chapter`,
        { courseId, chapterId, score }
      );

      if (response.data === "Next chapter unlocked!") {
        alert("✅ Next chapter unlocked successfully!");
        setAssessmentPassed(true);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        alert("❌ You need at least 70% to unlock the next chapter.");
        setAssessmentAttempted(true);
        setAssessmentPassed(false);
      }
    } catch (error) {
      console.error("Error unlocking chapter:", error);
      alert("❌ There was an error unlocking the chapter. Please try again.");
    }
  };

  // Unlock the next module after completing module
  const unlockNextModule = async (courseId, chapterId, moduleId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/unlock/module`,
        { courseId, chapterId, moduleId }
      );

      if (response.data === "Next module unlocked!") {
        alert("✅ Next module unlocked successfully!");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        alert("❌ Unable to unlock the next module. Try again.");
      }
    } catch (error) {
      console.error("Error unlocking module:", error);
    }
  };

  if (!course) {
    return <div className="loading">Loading course...</div>;
  }

  return (
    <div className="course-detail">
      {/* Display the course title */}
      <h2 className="course-title">{course.title || course.courseTitle}</h2>

      {/* Loop through chapters and render ChapterDropdown */}
      {course.chapters && course.chapters.length > 0 ? (
        course.chapters.map((chapter) => (
          <ChapterDropdown
            key={chapter.chapterId || chapter.id}
            chapter={chapter}
            courseId={courseId}
            unlockNextChapter={unlockNextChapter}
            unlockNextModule={unlockNextModule} // Pass function to unlock next module
            assessmentAttempted={assessmentAttempted}
            assessmentPassed={assessmentPassed}
          />
        ))
      ) : (
        <div>No chapters available for this course.</div>
      )}
    </div>
  );
};

export default CourseDetail;
