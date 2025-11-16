import { useContext } from "react";
import { QuizContext } from "./context/QuizContext";
import "./Quizzes.css";
import woodBg from "./assests/wood.png";

function Quizzes() {
  const { currentQuizId, setCurrentQuizId } = useContext(QuizContext);

  const lessons = [
    { id: 1, title: "Problem Recognition", desc: "What is the issue?" },
    { id: 2, title: "Definition & Intent", desc: "What does it solve?" },
    { id: 3, title: "Structure Understanding", desc: "How does the pattern work?" },
    { id: 4, title: "Implementation", desc: "How do you code it?" },
    { id: 5, title: "Real-World Analogy", desc: "How can I visualize it?" },
    { id: 6, title: "Evaluation & Use-Case", desc: "When to use it?" },
  ];

  const handleQuizClick = (quizId) => {
    setCurrentQuizId(quizId);
  };

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
      {/* Left Side - Progress & Quiz List */}
      <div className="left-panel">
        <div className="Progress">
          <div className="ProgressHeader">
            <div>
              <h1>DESIGN PATTERNS</h1>
              <h2>Mastery Course</h2>
            </div>
          </div>

          {/* <p className="progress-label">PROGRESS</p>
          <div className="ProgressBar">
            <div className="ProgressFill" style={{ width: "28%" }}></div>
          </div>
          <p className="progress-percent">28%</p> */}
        </div>

        <div className="scroll-container">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`QuizItem ${currentQuizId === lesson.id ? 'active' : ''}`}
              onClick={() => handleQuizClick(lesson.id)}
            >
              <h1>{lesson.title}</h1>
              <p>{lesson.desc}</p>
            </div>
          ))}
        </div>

        <div className="footer">
          <p>🎮 LEVEL UP YOUR CODING SKILLS</p>
        </div>
      </div>

    </div>
  );
}

export default Quizzes;