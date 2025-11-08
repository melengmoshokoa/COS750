import React from "react";
import "./Quizzes.css";
// import progressIcon from "./assets/progress_icon.svg"; 
import woodBg from './assests/wood.png' 

function Quizzes() {
  return (
    <div
      className="Quizzes"
      style={{
        backgroundImage: `url(${woodBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "center",
      }}
    >
      <div className="Progress">
        <div className="ProgressHeader">
          {/* <img src={progressIcon} alt="progress icon" /> */}
          <div>
            <h1>FACTORY PATTERN</h1>
            <h2>Design Mastery Course</h2>
          </div>
        </div>

        <p className="progress-label">PROGRESS</p>
        <div className="ProgressBar">
          <div className="ProgressFill" style={{ width: "28%" }}></div>
        </div>
        <p className="progress-percent">28%</p>
      </div>

      <div className="scroll-container">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="QuizItem">
            {/* <img src={progressIcon} alt="progress icon" /> */}
            <h1>LESSON {i + 1}</h1>
            <p>Problem & Solution</p>
          </div>
        ))}
      </div>

      <div className="footer">
        <p>🎮 LEVEL UP YOUR CODING SKILLS</p>
      </div>
    </div>
  );
}

export default Quizzes;
