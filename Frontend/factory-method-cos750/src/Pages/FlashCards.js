import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import "./FlashCards.css";
import woodBg from "./assests/wood.png";

function FlashCards() {
  const [currentView, setCurrentView] = useState("main");
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch flashcards
  const fetchFlashcards = async (category, difficulty) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("flashcards")
        .select("*")
        .eq("category", category)
        .eq("difficulty", difficulty)
        .order("order_index");

      if (error) {
        console.error("Error fetching flashcards:", error);
        setFlashcards([]);
      } else {
        setFlashcards(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
      setFlashcards([]);
    } finally {
      setLoading(false);
    }
  };

  // MAIN SCREEN (❌ no wood background)
  if (currentView === "main") {
    return (
      <div
        className="category-selection"
        style={{
          backgroundImage: `url(${woodBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center",
        }}
      >
        <div className="header">
          <h1>FACTORY METHOD</h1>
          <h2>FLASHCARDS</h2>
        </div>

        <div className="categories">
          <div
            className="category-card concepts"
            onClick={() => setCurrentView("difficulty")}
          >
            <h3>Start Learning</h3>
            <p>Master Factory Method Pattern</p>
          </div>
        </div>

        <div className="stats-preview">
          <div className="stat">
            <h3>Total Cards</h3>
            <p>30</p>
          </div>
          <div className="stat">
            <h3>Your Progress</h3>
            <p>{Math.round((masteredCards.length / 9) * 100)}%</p>
          </div>
        </div>
      </div>
    );
  }

  // DIFFICULTY SCREEN (✅ wood background wrapper added)
  if (currentView === "difficulty") {
    return (
      <div
        className="flashcards-page"
        style={{
          backgroundImage: `url(${woodBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center",
        }}
      >
        <div className="flashcards-overlay">
          <div
            className="difficulty-selection "
            style={{
              backgroundImage: `url(${woodBg})`,
              backgroundSize: "cover",
              backgroundRepeat: "repeat-y",
              backgroundPosition: "center",
            }}
          >
            <button
              className="back-button"
              onClick={() => setCurrentView("main")}
            >
              ← Back to Main Menu
            </button>

            <h2>Choose Difficulty Level</h2>
            <p>Select how challenging you want your flashcards to be</p>

            <div
              className="difficulty-levels"
              style={{
                backgroundImage: `url(${woodBg})`,
                backgroundSize: "cover",
                backgroundRepeat: "repeat-y",
                backgroundPosition: "center",
              }}
            >
              <div
                className="difficulty-card easy"
                onClick={async () => {
                  setSelectedDifficulty("easy");
                  await fetchFlashcards("concepts", "easy");
                  setCurrentView("flashcards");
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                  setScore(0);
                  setMasteredCards([]);
                }}
              >
                <h3>🌱 Easy</h3>
                <p>Basic concepts & fundamentals</p>
                <div className="card-count">10 cards</div>
              </div>

              <div
                className="difficulty-card medium"
                onClick={async () => {
                  setSelectedDifficulty("medium");
                  await fetchFlashcards("concepts", "medium");
                  setCurrentView("flashcards");
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                  setScore(0);
                  setMasteredCards([]);
                }}
              >
                <h3>🎯 Medium</h3>
                <p>Intermediate concepts</p>
                <div className="card-count">10 cards</div>
              </div>

              <div
                className="difficulty-card hard"
                onClick={async () => {
                  setSelectedDifficulty("hard");
                  await fetchFlashcards("concepts", "hard");
                  setCurrentView("flashcards");
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                  setScore(0);
                  setMasteredCards([]);
                }}
              >
                <h3>🔥 Hard</h3>
                <p>Advanced applications</p>
                <div className="card-count">10 cards</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FLASHCARDS SCREEN (✅ wood background wrapper added)
  if (currentView === "flashcards") {
    const currentCards = flashcards;

    if (loading) {
      return (
        <div
          className="flashcards-page"
          style={{
            backgroundImage: `url(${woodBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "repeat-y",
            backgroundPosition: "center",
          }}
        >
          <div className="flashcards-overlay">
            <div className="flashcard-viewer-single">
              <h2>Loading flashcards...</h2>
              <p>Please wait while we load your cards</p>
            </div>
          </div>
        </div>
      );
    }

    if (currentCards.length === 0) {
      return (
        <div
          className="flashcards-page"
          style={{
            backgroundImage: `url(${woodBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "repeat-y",
            backgroundPosition: "center",
          }}
        >
          <div className="flashcards-overlay">
            <div
              className="flashcard-viewer-single"
              style={{
                backgroundImage: `url(${woodBg})`,
                backgroundSize: "cover",
                backgroundRepeat: "repeat-y",
                backgroundPosition: "center",
              }}
            >
              <button
                className="back-button"
                onClick={() => setCurrentView("difficulty")}
              >
                ← Back to Levels
              </button>
              <h2>No flashcards found</h2>
              <button
                className="action-btn home-btn"
                onClick={() => setCurrentView("main")}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    const currentCard = currentCards[currentCardIndex];
    const progress = ((currentCardIndex + 1) / currentCards.length) * 100;

    const handleNext = () => {
      if (currentCardIndex < currentCards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
      } else {
        setCurrentView("results");
      }
    };

    const handlePrevious = () => {
      if (currentCardIndex > 0) {
        setCurrentCardIndex(currentCardIndex - 1);
        setIsFlipped(false);
      }
    };

    const handleMastered = () => {
      const cardId = currentCard?.id ?? currentCardIndex;
      setScore((s) => s + 1);
      setMasteredCards((prev) => [...prev, cardId]);
      handleNext();
    };

    const handleStillLearning = () => {
      handleNext();
    };

    return (
      <div
        className="flashcards-page"
        style={{
          backgroundImage: `url(${woodBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center",
        }}
      >
        <div className="flashcards-overlay">
          <div
            className="flashcard-viewer-single"
            style={{
              backgroundImage: `url(${woodBg})`,
              backgroundSize: "cover",
              backgroundRepeat: "repeat-y",
              backgroundPosition: "center",
            }}
          >
            <div className="flashcard-header">
              <button
                className="back-button"
                onClick={() => setCurrentView("difficulty")}
              >
                ← Back to Levels
              </button>

              <div className="progress-info">
                <div className="progress-text">
                  Card {currentCardIndex + 1} of {currentCards.length}
                </div>
                <div className="progress-bar2">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div
              className="flashcard-stack"
              style={{
                backgroundImage: `url(${woodBg})`,
                backgroundSize: "cover",
                backgroundRepeat: "repeat-y",
                backgroundPosition: "center",
              }}
            >
              <div
                className={`flashcard-single ${isFlipped ? "flipped" : ""}`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className="flashcard-inner">
                  <div className="flashcard-front">
                    <div className="card-content">
                      <h3>{currentCard.front_text}</h3>
                      <div className="hint-section">
                        <span className="hint-icon">💡</span>
                        <span className="hint-text">{currentCard.hint}</span>
                      </div>
                      <div className="flip-instruction">Click card to flip</div>
                    </div>
                  </div>

                  <div className="flashcard-back">
                    <div className="card-content">
                      <h3>Answer</h3>
                      <p>{currentCard.back_text}</p>
                      <div className="confidence-buttons">
                        <button
                          className="confidence-btn unsure"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStillLearning();
                          }}
                        >
                          Still Learning
                        </button>
                        <button
                          className="confidence-btn mastered"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMastered();
                          }}
                        >
                          Got It!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {currentCardIndex < currentCards.length - 1 && (
                <div className="next-card-shadow"></div>
              )}
            </div>

            <div className="navigation-controls">
              <button
                className="nav-btn prev-btn"
                onClick={handlePrevious}
                disabled={currentCardIndex === 0}
              >
                ← Previous
              </button>

              <button className="nav-btn next-btn" onClick={handleNext}>
                {currentCardIndex === currentCards.length - 1
                  ? "Finish"
                  : "Next →"}
              </button>
            </div>

            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-label">Mastered</span>
                <span className="stat-value">
                  {masteredCards.length} / {flashcards.length}
                </span>
              </div>

              <div className="stat-item">
                <span className="stat-label">Current Score</span>
                <span className="stat-value">
                  {score} / {flashcards.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS SCREEN (✅ wood background wrapper added)
  if (currentView === "results") {
    const totalCards = flashcards.length || 1;
    const masteryPercentage = Math.round(
      (masteredCards.length / totalCards) * 100
    );

    return (
      <div
        className="flashcards-page"
        style={{
          backgroundImage: `url(${woodBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center",
        }}
      >
        <div className="flashcards-overlay">
          <div
            className="results-screen"
            style={{
              backgroundImage: `url(${woodBg})`,
              backgroundSize: "cover",
              backgroundRepeat: "repeat-y",
              backgroundPosition: "center",
            }}
          >
            <div className="results-content">
              <h2>🎉 Deck Complete!</h2>

              <div className="results-stats">
                <div className="result-stat">
                  <h3>Cards Mastered</h3>
                  <p>
                    {masteredCards.length} / {totalCards}
                  </p>
                </div>

                <div className="result-stat">
                  <h3>Mastery Level</h3>
                  <p>{masteryPercentage}%</p>
                </div>

                <div className="result-stat">
                  <h3>Final Score</h3>
                  <p>{score}</p>
                </div>
              </div>

              <div className="result-actions">
                <button
                  className="action-btn retry-btn"
                  onClick={() => {
                    setCurrentView("flashcards");
                    setCurrentCardIndex(0);
                    setIsFlipped(false);
                    setScore(0);
                    setMasteredCards([]);
                  }}
                >
                  🔄 Try Again
                </button>

                <button
                  className="action-btn home-btn"
                  onClick={() => {
                    setCurrentView("main");
                    setScore(0);
                    setMasteredCards([]);
                  }}
                >
                  🏠 Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default FlashCards;
