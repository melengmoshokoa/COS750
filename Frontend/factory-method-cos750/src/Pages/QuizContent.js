import React, { useState, useContext, useEffect } from "react";
import "./QuizContent.css";
import woodBg from "./assests/wood.png";
import { quizzes } from "./data/quizzes";
import { QuizContext } from "./context/QuizContext";

function QuizContent() {
  const { currentQuizId, completed, setCompleted } = useContext(QuizContext);

  const quiz = quizzes.find((q) => q.id === currentQuizId);
  const questions = quiz.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // ✅ Reset state when a new quiz is selected
  useEffect(() => {
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
  }, [currentQuizId]);

  const currentQ = questions[currentIndex];

  // Select answer
  const selectAnswer = (qIndex, optionIndex) => {
    if (submitted) return;

    setAnswers((prev) => ({
      ...prev,
      [qIndex]: questions[qIndex].options[optionIndex],
    }));
  };

  // Navigation
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Final Submit
  const handleSubmit = () => {
    if (submitted) return;

    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });

    setScore(correct);

    if (correct === questions.length) {
      setCompleted((prev) => ({
        ...prev,
        [currentQuizId]: true,
      }));
    }

    setSubmitted(true);
  };

  const getOptionClass = (qIndex, optIndex) => {
    if (!submitted) return "";

    const correctAnswer = questions[qIndex].answer;
    const userAnswer = answers[qIndex];
    const optionText = questions[qIndex].options[optIndex];

    if (optionText === correctAnswer) return "correct-option";
    if (optionText === userAnswer) return "wrong-option";

    return "";
  };

  return (
    <div
      className="QuizContent"
      style={{
        backgroundImage: `url(${woodBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <div className="quiz-header">
        <h2>⚡ {quiz.title} ⚡</h2>
        <span className="question-count">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="quiz-progress">
        <div
          className="quiz-progress-fill"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Question Box */}
      {currentQ && (
        <div className="question-box">
          <h3>{currentQ.question}</h3>
          {currentQ.options.map((opt, i) => (
            <div
              className={`option ${getOptionClass(currentIndex, i)}`}
              key={i}
              onClick={() => selectAnswer(currentIndex, i)}
            >
              <input type="radio" checked={answers[currentIndex] === opt} readOnly />
              <label>{opt}</label>
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      {!submitted && (
        <div className="quiz-nav">
          <button className="prev-btn" onClick={handlePrev} disabled={currentIndex === 0}>
            ← PREV
          </button>

          {currentIndex === questions.length - 1 ? (
            <button className="submit-btn" onClick={handleSubmit}>
              SUBMIT ✔
            </button>
          ) : (
            <button className="next-btn" onClick={handleNext}>
              NEXT →
            </button>
          )}
        </div>
      )}

      {/* After submit */}
      {submitted && (
        <div className="results-box">
          <p className="submitted-text">
            Your Score: <strong>{score}</strong> / {questions.length}
          </p>
          {completed[currentQuizId] ? (
            <p className="perfect-score">🎉 Perfect Score! Quiz Completed ✔</p>
          ) : (
            <p className="try-again">❌ Not perfect. Review and try again!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizContent;
