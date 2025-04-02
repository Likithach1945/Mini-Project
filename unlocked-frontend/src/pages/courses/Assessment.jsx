// import React, { useState } from "react";
// import "./ModuleDetails.css"; // Reuse the module styles for consistency

// const Assessment = ({ assessment }) => {
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   if (
//     !assessment ||
//     !assessment.questions ||
//     assessment.questions.length === 0
//   ) {
//     return <p>No assessment available for this chapter.</p>;
//   }

//   // Track user's answers
//   const handleAnswerChange = (questionId, selectedOption) => {
//     setAnswers({ ...answers, [questionId]: selectedOption });
//   };

//   // Submit answers
//   const handleSubmit = () => {
//     setSubmitted(true);
//   };

//   return (
//     <div className="module-details">
//       <h3>{assessment.name || "Chapter Assessment"}</h3>
//       <h4>📝 Assessment Questions:</h4>
//       <form className="question-list">
//         {assessment.questions.map((question, idx) => (
//           <div key={question.questionId} className="question">
//             <p>{`${idx + 1}. ${question.question}`}</p>
//             <div className="options">
//               {question.options.map((option, optIdx) => (
//                 <label key={optIdx} className="option">
//                   <input
//                     type="radio"
//                     name={`question-${question.questionId}`}
//                     value={option}
//                     onChange={() =>
//                       handleAnswerChange(question.questionId, option)
//                     }
//                     disabled={submitted}
//                   />
//                   {option}
//                 </label>
//               ))}
//             </div>
//             {submitted && (
//               <p
//                 className={
//                   answers[question.questionId] === question.correctAnswer
//                     ? "correct"
//                     : "incorrect"
//                 }
//               >
//                 {answers[question.questionId] === question.correctAnswer
//                   ? "✅ Correct!"
//                   : `❌ Correct Answer: ${question.correctAnswer}`}
//               </p>
//             )}
//           </div>
//         ))}
//         {!submitted && (
//           <button type="button" onClick={handleSubmit} className="submit-btn">
//             Submit Assessment
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Assessment;

import React, { useState } from "react";
import "./ModuleDetails.css";

const Assessment = ({ assessment, unlockNextChapter, courseId, chapterId }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0); // Track score

  // Track user's answers
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  // Calculate the score
  const calculateScore = () => {
    let correctAnswers = 0;
    assessment.questions.forEach((question) => {
      if (answers[question.questionId] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return (correctAnswers / assessment.questions.length) * 100;
  };

  // Submit answers
  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);

    // If score >= 70, unlock next chapter
    if (finalScore >= 70) {
      unlockNextChapter(courseId, chapterId, finalScore);
    } else {
      alert("❌ Score is less than 70%. Try again!");
    }
  };

  return (
    <div className="module-details">
      <h3>{assessment.name || "Chapter Assessment"}</h3>
      <h4>📝 Assessment Questions:</h4>
      <form className="question-list">
        {assessment.questions.map((question, idx) => (
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
                  : `❌ Correct Answer: ${question.correctAnswer}`}
              </p>
            )}
          </div>
        ))}
        {!submitted && (
          <button type="button" onClick={handleSubmit} className="submit-btn">
            Submit
          </button>
        )}
      </form>
      {submitted && <h4>Your Score: {score}%</h4>}
    </div>
  );
};

export default Assessment;
