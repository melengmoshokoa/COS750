import React, { useState } from "react";

const woodBrickBackground = {
  backgroundColor: "#2c0d00", /* Background (dark wood) */
  minHeight: "100vh",
  padding: "40px",
  fontFamily: "'Press Start 2P', cursive",
  fontSize: "12px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "#f69c36", /* Text (bright orange) */
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

// Mock quiz data - this would come from your actual quizzes
const initialQuizzes = [
  { id: 1, title: "FACTORY LOGIC TEST", completed: true },
  { id: 2, title: "PATTERN RECOGNITION", completed: false },
  { id: 3, title: "MACHINE OPTIMIZATION", completed: false },
  { id: 4, title: "RESOURCE MANAGEMENT", completed: false },
  { id: 5, title: "PRODUCTION FLOW", completed: false },
];

// Calculate initial progress based on completed quizzes
const calculateInitialProgress = () => {
  const completedCount = initialQuizzes.filter(quiz => quiz.completed).length;
  const totalQuizzes = initialQuizzes.length;
  
  // Start at level 1 and scale up based on completion
  const baseLevel = 1;
  const levelIncrease = Math.floor(completedCount / 2); // Level up every 2 quizzes
  const level = baseLevel + levelIncrease;
  
  // Parts start at 50 and increase by 25 per completed quiz
  const baseParts = 50;
  const parts = baseParts + (completedCount * 25);
  
  // Experience starts at 500 and increases by 150 per completed quiz
  const baseExperience = 500;
  const experience = baseExperience + (completedCount * 150);
  
  return { level, parts, experience };
};

function ProgressBar({ progress, onQuizClick, nextQuizTitle }) {
  const totalWidth = 260;
  const height = 20;

  return (
    <div style={{ marginTop: 20, width: totalWidth }}>
      <svg width={totalWidth} height={height}>
        <rect x={0} y={0} width={totalWidth} height={height} fill="#3a1602" rx={8} ry={8} />
        <rect
          x={0}
          y={0}
          width={totalWidth * progress}
          height={height}
          fill="#f69c36"
          rx={8}
          ry={8}
        />
      </svg>

      <div
        style={{
          marginTop: 20,
          width: "100%",
          fontWeight: "bold",
          position: "relative",
          textTransform: "uppercase",
          color: "#f69c36",
          fontSize: 16,
          userSelect: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            position: "relative",
            zIndex: 2,
            backgroundColor: "#2c0d00",
            padding: "0 10px",
            display: "inline-block",
          }}
        >
          QUIZZES COMPLETED
        </span>
        <hr
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            border: "none",
            borderTop: "3px solid #f69c36",
            transform: "translateY(-50%)",
            zIndex: 1,
            margin: 0,
          }}
        />
      </div>

      <div
        style={{
          marginTop: 30,
          display: "flex",
          maxWidth: totalWidth,
          width: "100%",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "#f69c36",
            padding: "10px 20px",
            borderRadius: "6px",
            color: "#2c0d00",
            fontWeight: "bold",
            textAlign: "center",
            flex: "0 0 140px",
            fontSize: "12px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          IN PROGRESS
        </div>
        <div
          style={{
            border: "2px solid #f69c36",
            padding: "10px 16px 10px 10px",
            borderRadius: "6px",
            color: "#f69c36",
            fontWeight: "bold",
            textAlign: "left",
            flex: "1",
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontSize: "10px",
            transition: "all 0.3s ease",
          }}
          onClick={onQuizClick}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#f69c36";
            e.target.style.color = "#2c0d00";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#f69c36";
          }}
        >
          {nextQuizTitle || "FACTORY LOGIC TEST"}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  
  // Calculate user progress based on completed quizzes
  const calculateUserProgress = (quizzesArray) => {
    const completedCount = quizzesArray.filter(quiz => quiz.completed).length;
    const totalQuizzes = quizzesArray.length;
    
    // Level progression: Start at 1, level up every 2 completed quizzes
    const baseLevel = 1;
    const level = baseLevel + Math.floor(completedCount / 2);
    
    // Parts progression: Start at 50, add 25 per completed quiz
    const baseParts = 50;
    const parts = baseParts + (completedCount * 25);
    
    // Experience progression: Start at 500, add 150 per completed quiz
    const baseExperience = 500;
    const experience = baseExperience + (completedCount * 150);
    
    return { level, parts, experience };
  };

  const [userProgress, setUserProgress] = useState(() => calculateUserProgress(initialQuizzes));

  // Calculate progress percentage from quizzes
  const calculateProgress = () => {
    const completedQuizzes = quizzes.filter(quiz => quiz.completed).length;
    return completedQuizzes / quizzes.length;
  };

  const progress = calculateProgress();
  const progressPercent = Math.round(progress * 100);

  // Get the next quiz title for the button
  const getNextQuizTitle = () => {
    const nextQuiz = quizzes.find(quiz => !quiz.completed);
    return nextQuiz ? nextQuiz.title : "ALL COMPLETED!";
  };

  // Handle quiz button click
  const handleQuizClick = () => {
    const nextQuiz = quizzes.find(quiz => !quiz.completed);
    if (nextQuiz) {
      // Complete the quiz and update progress
      setQuizzes(prevQuizzes => 
        prevQuizzes.map(quiz => 
          quiz.id === nextQuiz.id 
            ? { ...quiz, completed: true }
            : quiz
        )
      );
      
      // Update user progress based on new completion state
      const updatedQuizzes = quizzes.map(quiz => 
        quiz.id === nextQuiz.id ? { ...quiz, completed: true } : quiz
      );
      setUserProgress(calculateUserProgress(updatedQuizzes));
      
      alert(`Completed ${nextQuiz.title}! Progress updated.`);
    } else {
      alert("All quizzes completed! 🎉");
    }
  };

  // Reset progress for testing
  const resetProgress = () => {
    setQuizzes(initialQuizzes);
    setUserProgress(calculateUserProgress(initialQuizzes));
  };

  const completedCount = quizzes.filter(q => q.completed).length;
  const totalQuizzes = quizzes.length;

  return (
    <div style={woodBrickBackground}>
      {/* Dashboard Container */}
      <div className="dashboard-container" style={{
        maxWidth: "970px",
        margin: "40px auto", 
        padding: "20px",
        width: "100%"
      }}>
        
        {/* Dashboard Header */}
        <div className="dashboard-header" style={{
          backgroundColor: "#180902", /* Inner panels */
          border: "4px solid #c76a19", /*Secondary orange (for border/shadow) */
          padding: "15px 10px",
          marginBottom: "20px",
          textAlign: "center",
        }}>
          <h1 style={{
            fontSize: "50px", 
            color: "#ffbf61",
            margin: 0,
            lineHeight: "1.2"
          }}>
            FACTORY METHOD
            <br />
            ADVENTURES
          </h1>
        </div>

        {/* Dashboard Content Wrapper */}
        <div className="dashboard-content-wrapper" style={{
          backgroundColor: "#2a1002", /* Inner panels color */
          border: "4px solid #c76a19", /* Secondary orange border */
          padding: "15px", /* Add padding to the whole wrapper */
        }}>
          
          {/* Progress Section */}
          <div className="welcome-section" style={{
            backgroundColor: "#2a1002", /* Inner panels */
            border: "4px solid #c76a19",
            padding: "15px",
            marginBottom: "20px",
          }}>
            <h2 style={{
              fontSize: "14px",
              marginBottom: "10px",
              color: "#f69c36", /* Bright orange headings */
              marginTop: 0
            }}>
              Progress Overview
            </h2>

            {/* Top vertical stacks */}
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              {/* Left stack */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  minWidth: "150px",
                  position: "relative",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "28px",
                    position: "absolute",
                    top: "-25px",
                    right: "10px",
                  }}
                >
                  Numbers
                </div>

                <div
                  style={{
                    backgroundColor: "#2c0d00",
                    padding: "10px",
                    width: "100%",
                    textAlign: "center",
                    borderRadius: "4px",
                    marginTop: "20px",
                    textTransform: "uppercase",
                    border: "2px solid #c76a19",
                  }}
                >
                  LEVEL {userProgress.level}
                </div>
                <div
                  style={{
                    backgroundColor: "#2c0d00",
                    padding: "10px",
                    width: "100%",
                    textAlign: "center",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    border: "2px solid #c76a19",
                  }}
                >
                  PARTS <span style={{ fontWeight: "bold" }}>{userProgress.parts}</span>
                </div>
                <div
                  style={{
                    backgroundColor: "#2c0d00",
                    padding: "10px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "15px",
                    borderRadius: "4px",
                    border: "2px solid #c76a19",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid #aa5a12",
                      padding: "5px",
                      width: "30px",
                      height: "30px",
                      textAlign: "center",
                    }}
                  >
                    🛠️
                  </div>
                  <div
                    style={{
                      border: "1px solid #aa5a12",
                      padding: "5px",
                      width: "30px",
                      height: "30px",
                      textAlign: "center",
                    }}
                  >
                    ⛑️
                  </div>
                  <div
                    style={{
                      border: "1px solid #aa5a12",
                      padding: "5px",
                      width: "30px",
                      height: "30px",
                      textAlign: "center",
                    }}
                  >
                    ⚙️
                  </div>
                </div>
              </div>

              {/* Right stack */}
              <div
                style={{
                  backgroundColor: "#2c0d00",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "4px solid #c76a19",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  minWidth: "150px",
                  textTransform: "uppercase",
                  position: "relative",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "32px" }}>{userProgress.experience}</div>
                <div style={{ fontSize: "18px" }}>EXPERIENCE</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid #aa5a12",
                      padding: "5px",
                      width: "25px",
                      height: "25px",
                      textAlign: "center",
                    }}
                  >
                    🔨
                  </div>
                  <div
                    style={{
                      border: "1px solid #aa5a12",
                      padding: "5px",
                      width: "25px",
                      height: "25px",
                      textAlign: "center",
                    }}
                  >
                    🧱
                  </div>
                  <div
                    style={{
                      border: "1px solid #aa5a12",
                      padding: "5px",
                      width: "25px",
                      height: "25px",
                      textAlign: "center",
                    }}
                  >
                    ⚙️
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar Section */}
            <div style={{
              backgroundColor: "#2c0d00",
              padding: "20px",
              borderRadius: "8px",
              border: "4px solid #c76a19",
              maxWidth: "350px",
              width: "100%",
              position: "relative",
              fontWeight: "bold",
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
              margin: "0 auto",
            }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "28px",
                  width: "100%",
                  textAlign: "left",
                  color: "#f69c36",
                }}
              >
                Progress
              </div>

              <ProgressBar 
                progress={progress} 
                onQuizClick={handleQuizClick}
                nextQuizTitle={getNextQuizTitle()}
              />

              {/* Progress Percentage Display */}
              <div
                style={{
                  marginTop: 10,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#f69c36",
                    marginBottom: "5px",
                  }}
                >
                  PROGRESS
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: "#f69c36",
                    fontWeight: "bold",
                  }}
                >
                  {progressPercent}%
                </div>
              </div>
            </div>

            {/* Progress info */}
            <div
              style={{
                backgroundColor: "#2c0d00",
                padding: "10px",
                borderRadius: "6px",
                width: "100%",
                textAlign: "center",
                fontSize: "10px",
                color: "#f69c36",
                border: "2px solid #c76a19",
                marginTop: "20px",
                maxWidth: "350px",
                margin: "20px auto 0",
              }}
            >
              <div>Completed: {completedCount}/{totalQuizzes} quizzes</div>
              <div style={{ marginTop: "5px", fontSize: "8px" }}>
                Level: +1 every 2 quizzes | Parts: +25 per quiz | XP: +150 per quiz
              </div>
              <button
                onClick={resetProgress}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#3a1602",
                  color: "#f69c36",
                  border: "1px solid #f69c36",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "8px",
                  cursor: "pointer",
                }}
              >
                RESET PROGRESS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


