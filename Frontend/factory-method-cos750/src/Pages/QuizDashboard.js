import React, { useState } from "react";
import "./QuizDashboard.css";
import Quizzes from "./Quizzes";
import QuizContent from "./QuizContent";
import woodBg from "./assests/wood.png";

function QuizDashboard() {
  const [selectedLesson, setSelectedLesson] = useState(0); 

  return (
    <div className="QuizDashboard">
      <div className="dashboard-container2">
        {/* LEFT SIDE — LESSON LIST */}
        <div className="sidebar">
          <Quizzes onSelectLesson={setSelectedLesson} selectedLesson={selectedLesson} />
        </div>

        {/* RIGHT SIDE — ACTIVE QUIZ */}
        <div className="quiz-content-area">
          <QuizContent lessonNumber={selectedLesson + 1} />
        </div>
      </div>
    </div>
  );
}

export default QuizDashboard;
