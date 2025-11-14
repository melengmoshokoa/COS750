import { useContext } from "react";
import { QuizContext } from "./context/QuizContext";
import "./Quizzes.css";
import woodBg from "./assests/wood.png";

function Quizzes() {
  const { currentQuizId, setCurrentQuizId } = useContext(QuizContext);

  const lessons = [
    { id: 1, title: "Factory Pattern", desc: "Problem & Solution" },
    { id: 2, title: "Singleton Pattern", desc: "Ensure single instance" },
    { id: 3, title: "Observer Pattern", desc: "Event-driven updates" },
    { id: 4, title: "Decorator Pattern", desc: "Enhance object behavior" },
    { id: 5, title: "Strategy Pattern", desc: "Switchable algorithms" },
    { id: 6, title: "Adapter Pattern", desc: "Interface conversion" },
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

          <p className="progress-label">PROGRESS</p>
          <div className="ProgressBar">
            <div className="ProgressFill" style={{ width: "28%" }}></div>
          </div>
          <p className="progress-percent">28%</p>
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