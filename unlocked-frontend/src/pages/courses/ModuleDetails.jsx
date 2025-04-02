// import React, { useState } from "react";
// import axios from "axios";
// import "./ModuleDetails.css";

// const ModuleDetails = ({ module, courseId, chapterId, unlockNextModule }) => {
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState("");

//   // Track user's answers
//   const handleAnswerChange = (questionId, selectedOption) => {
//     setAnswers({ ...answers, [questionId]: selectedOption });
//   };

//   // Validate all questions before submitting
//   const validateAnswers = () => {
//     return module.questions.every((question) => answers[question.questionId]);
//   };

//   // Handle submit with validation
//   const handleSubmit = async () => {
//     if (!validateAnswers()) {
//       setError("⚠️ Please answer all questions before submitting.");
//       return;
//     }

//     setError("");
//     setSubmitted(true);

//     // Unlock the next module
//     try {
//       await unlockNextModule(courseId, chapterId, module.moduleId);
//     } catch (error) {
//       console.error("Error unlocking next module:", error);
//     }
//   };

//   return (
//     <div className={`module-details ${module.unlocked ? "" : "locked"}`}>
//       <h3>{module.title || "Module Title"}</h3>
//       <p>{module.content || "Module content goes here."}</p>

//       {/* Show Questions & Answers */}
//       <h4>📝 Assessments:</h4>
//       {module.questions?.length > 0 ? (
//         <form className="question-list">
//           {module.questions.map((question, idx) => (
//             <div key={question.questionId} className="question">
//               <p>{`${idx + 1}. ${question.question}`}</p>
//               <div className="options">
//                 {question.options.map((option, optIdx) => (
//                   <label key={optIdx} className="option">
//                     <input
//                       type="radio"
//                       name={`question-${question.questionId}`}
//                       value={option}
//                       onChange={() =>
//                         handleAnswerChange(question.questionId, option)
//                       }
//                       disabled={submitted}
//                       checked={answers[question.questionId] === option}
//                     />
//                     {option}
//                   </label>
//                 ))}
//               </div>
//               {submitted && (
//                 <p
//                   className={
//                     answers[question.questionId] === question.correctAnswer
//                       ? "correct"
//                       : "incorrect"
//                   }
//                 >
//                   {answers[question.questionId] === question.correctAnswer
//                     ? "✅ Correct!"
//                     : "❌ Incorrect"}
//                 </p>
//               )}
//             </div>
//           ))}

//           {/* Error message if questions are not answered */}
//           {error && <p className="error">{error}</p>}

//           {/* Submit button */}
//           {!submitted && (
//             <button type="button" onClick={handleSubmit} className="submit-btn">
//               Submit Answers
//             </button>
//           )}
//         </form>
//       ) : (
//         <p>No questions available for this module.</p>
//       )}
//     </div>
//   );
// };

// export default ModuleDetails;

import React, { useState } from "react";
import axios from "axios";
import "./ModuleDetails.css";

const ModuleDetails = ({ module, courseId, chapterId, unlockNextModule }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Track user's answers
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  // Validate all questions before submitting
  const validateAnswers = () => {
    return module.questions.every((question) => answers[question.questionId]);
  };

  // Handle submit with validation
  const handleSubmit = async () => {
    if (!validateAnswers()) {
      setError("⚠️ Please answer all questions before submitting.");
      return;
    }

    setError("");
    setSubmitted(true);

    try {
      await unlockNextModule(courseId, chapterId, module.moduleId);
      setTimeout(() => window.location.reload(), 1000); // Auto-reload
    } catch (error) {
      console.error("Error unlocking next module:", error);
    }
  };

  return (
    <div className={`module-details ${module.unlocked ? "" : "locked"}`}>
      <h3>{module.title || "Module Title"}</h3>
      <p>{module.content || "Module content goes here."}</p>

      {/* Show Questions & Answers */}
      <h4>📝 Assessments:</h4>
      {module.questions?.length > 0 ? (
        <form className="question-list">
          {module.questions.map((question, idx) => (
            <div key={question.questionId} className="question">
              <p>{`${idx + 1}. ${question.question}`}</p>
              <div className="options">
                {question.options.map((option, optIdx) => (
                  <label key={optIdx} className="option">
                    <input
                      type="radio"
                      name={`question-${question.questionId}`}
                      value={option}
                      onChange={() =>
                        handleAnswerChange(question.questionId, option)
                      }
                      disabled={submitted}
                      checked={answers[question.questionId] === option}
                    />
                    {option}
                  </label>
                ))}
              </div>
              {submitted && (
                <p
                  className={
                    answers[question.questionId] === question.correctAnswer
                      ? "correct"
                      : "incorrect"
                  }
                >
                  {answers[question.questionId] === question.correctAnswer
                    ? "✅ Correct!"
                    : `❌ Incorrect. Correct answer: ${question.correctAnswer}`}
                </p>
              )}
            </div>
          ))}

          {/* Error message if questions are not answered */}
          {error && <p className="error">{error}</p>}

          {/* Submit button */}
          {!submitted && (
            <button type="button" onClick={handleSubmit} className="submit-btn">
              Submit Answers
            </button>
          )}
        </form>
      ) : (
        <p>No questions available for this module.</p>
      )}
    </div>
  );
};

export default ModuleDetails;
