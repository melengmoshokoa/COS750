import React, { useState, useContext, useEffect } from "react";
import "./QuizContent.css";
import woodBg from "./assests/wood.png";
import { quizzes } from "./data/quizzes";
import { QuizContext } from "./context/QuizContext";
import { supabase } from "../supabaseClient";
import { badgeAPI, userAPI } from "../services/apiService";

function QuizContent() {
  const { currentQuizId, completed, setCompleted } = useContext(QuizContext);

  const quiz = quizzes.find((q) => q.id === currentQuizId);
  const questions = quiz.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [userId, setUserId] = useState(null);
  const [currentXP, setCurrentXP] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load logged-in user - MATCHING STORYBOARD PATTERN
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
          setIsLoading(false);
          return;
        }

        if (!session || !session.user) {
          console.log("No active session");
          setIsLoading(false);
          return;
        }

        const currentUserId = session.user.id;
        setUserId(currentUserId);

        // Try to get user, if not exists, create them (LIKE STORYBOARD)
        let userData;
        try {
          userData = await userAPI.getUser(currentUserId);
          console.log("User data loaded:", userData.data);
          setCurrentXP(userData.data.xp || 0);
        } catch (err) {
          // User doesn't exist, create them
          console.log('User not found in quiz, creating new user...');
          try {
            await userAPI.createUser(currentUserId);
            userData = { data: { xp: 0, level: 1 } };
            setCurrentXP(0);
            console.log('New user created successfully');
          } catch (createErr) {
            console.error('Error creating user:', createErr);
            setCurrentXP(0);
          }
        }
      } catch (err) {
        console.error("Error in fetchUser:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Reset quiz state on quiz change
  useEffect(() => {
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
  }, [currentQuizId]);

  const currentQ = questions[currentIndex];

  const selectAnswer = (qIndex, optionIndex) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: questions[qIndex].options[optionIndex],
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (submitted) return;

    // Calculate quiz score
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });

    setScore(correct);
    setSubmitted(true);

    // Check if user is logged in
    if (!userId) {
      alert("You must be logged in to earn XP or badges!");
      return;
    }

    console.log("=== QUIZ SUBMISSION START ===");
    console.log("User ID:", userId);
    console.log("Quiz ID:", currentQuizId);
    console.log("Score:", correct, "/", questions.length);

    // XP calculation
    const XP_PER_QUESTION = 10;
    const xpEarned = correct * XP_PER_QUESTION;
    const newTotalXP = currentXP + xpEarned;

    console.log("Current XP:", currentXP);
    console.log("XP Earned:", xpEarned);
    console.log("New Total XP:", newTotalXP);

    try {
      // Update XP in backend
      console.log("Calling updateXP API...");
      const xpResult = await userAPI.updateXP(userId, newTotalXP);
      console.log("XP update result:", xpResult);
      setCurrentXP(newTotalXP);
      console.log("✓ XP updated successfully");
    } catch (err) {
      console.error("✗ Error updating XP:", err);
      console.error("Error details:", err.message);
      alert(`Failed to update XP: ${err.message}`);
      return; // Don't continue if XP update fails
    }

    // Award badge only on perfect score
    if (correct > 6 ) {
      console.log("Perfect score! Awarding badge...");
      
      setCompleted((prev) => ({
        ...prev,
        [currentQuizId]: true,
      }));

      const badgeKey = `phase_${currentQuizId}_mastery`;
      const badgeName = `${quiz.title} Mastery`;

      console.log("Badge Key:", badgeKey);
      console.log("Badge Name:", badgeName);

      try {
        console.log("Calling awardBadge API...");
        const badgeResult = await badgeAPI.awardBadge(
          userId, 
          badgeKey, 
          badgeName, 
          xpEarned
        );
        console.log("Badge award result:", badgeResult);
        console.log("✓ Badge awarded successfully");
      } catch (err) {
        console.error("✗ Badge error:", err);
        console.error("Badge error details:", err.message);
        // Don't alert for badge errors - might be duplicate badge
        console.log("Badge may have already been awarded");
      }
    } else {
      console.log("Not perfect score - no badge awarded");
    }

    console.log("=== QUIZ SUBMISSION END ===");
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

  // Show loading state
  if (isLoading) {
    return (
      <div
        className="QuizContent"
        style={{
          backgroundImage: `url(${woodBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ 
          background: "rgba(255, 255, 255, 0.9)", 
          padding: "30px", 
          borderRadius: "10px",
          textAlign: "center"
        }}>
          <h3>Loading quiz...</h3>
          <p>Please wait while we prepare your quiz</p>
        </div>
      </div>
    );
  }

  // Show login prompt if no user
  if (!userId) {
    return (
      <div
        className="QuizContent"
        style={{
          backgroundImage: `url(${woodBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ 
          background: "rgba(255, 255, 255, 0.9)", 
          padding: "40px", 
          borderRadius: "10px",
          textAlign: "center",
          maxWidth: "400px"
        }}>
          <h2>🔒 Login Required</h2>
          <p style={{ marginTop: "20px", fontSize: "16px" }}>
            Please log in to take quizzes and earn XP & badges!
          </p>
        </div>
      </div>
    );
  }

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
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Box */}
      {currentQ && (
        <div className="question-box">
          <h3>{currentQ.question}</h3>
          {currentQ.options.map((opt, i) => (
            <div
              key={i}
              className={`option ${getOptionClass(currentIndex, i)}`}
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

      {/* Results */}
      {submitted && (
        <div className="results-box">
          <p className="submitted-text">
            Your Score: <strong>{score}</strong> / {questions.length}
          </p>

          {score === questions.length ? (
            <p className="perfect-score">🎉 Perfect Score! Badge Earned!</p>
          ) : (
            <p className="try-again">❌ Not perfect — try again!</p>
          )}

          <p className="xp-earned">
            ⭐ XP Earned: {score * 10} (Total: {currentXP})
          </p>
        </div>
      )}
    </div>
  );
}

export default QuizContent;