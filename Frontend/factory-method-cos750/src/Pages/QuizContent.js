// src/components/QuizContent.js

import React, { useState, useContext } from "react";
import "./QuizContent.css";
import woodBg from "./assests/wood.png";
import { quizzes } from "./data/quizzes";
import { QuizContext } from "./context/QuizContext";

function QuizContent() {
  const { currentQuizId, completed, setCompleted } = useContext(QuizContext);

  // Get quiz based on selected lesson
  const quiz = quizzes.find((q) => q.id === currentQuizId);
  const questions = quiz.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const currentQ = questions[currentIndex];

  // Select answer
  const selectAnswer = (qIndex, optionIndex) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  // Navigation
  const handleNext = () => {
    if (currentIndex < questions.length - 1)
      setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0)
      setCurrentIndex((prev) => prev - 1);
  };

  // Final Submit
  const handleSubmit = () => {
    if (submitted) return;

    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });

    if (correct === questions.length) {
      // Mark quiz as completed
      setCompleted((prev) => ({
        ...prev,
        [currentQuizId]: true,
      }));
    }

    setSubmitted(true);
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

          {currentQ.options &&
            currentQ.options.map((opt, i) => (
              <div
                className="option"
                key={i}
                onClick={() => selectAnswer(currentIndex, i)}
              >
                <input
                  type="radio"
                  checked={answers[currentIndex] === i}
                  readOnly
                />
                <label>{opt}</label>
              </div>
            ))}
        </div>
      )}

      {/* Navigation */}
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

      {/* After submit */}
      {submitted && (
        <p className="submitted-text">
          Quiz Submitted {completed[currentQuizId] ? "✔ Correct!" : "❌ Try Again"}
        </p>
      )}
    </div>
  );
}

export default QuizContent;
