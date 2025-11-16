import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { userAPI } from "../services/apiService";
import "./Dashboard.css";
import QuizAvatar from "../Media/Quizzes-icon.png";
import flashspanner from "../Media/idea.png";
import flashbulb from "../Media/flash-bulb.png";
import spanner from "../Media/Real-spanner.png";
import book from "../Media/Books.png";
import bookmark from "../Media/Boookmark.png";
import EngineerAvatar from "../Media/MAN.png";
import dashStory1 from "./assests/dash-story1.png";
import dashStory2 from "./assests/dash-story2.png";
import dashStory3 from "./assests/dash-story3.png";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setUser(session.user);
        // Once we have the user, fetch their progress
        try {
          const { data: userData } = await userAPI.getUser(session.user.id);
          if (userData) {
            // Assuming max XP is 600 (6 stories * 100 XP each)
            const maxXP = 600;
            const currentProgress = (userData.xp / maxXP) * 100;
            setProgress(Math.min(currentProgress, 100)); // Cap at 100%
          }
        } catch (error) {
          console.error("Failed to fetch user progress:", error);
        }
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* 1. Header Section */}
      <header className="dashboard-header">
        <h1>FACTORY METHOD ADVENTURES</h1>
      </header>

      <div className="dashboard-content-wrapper">
        <div className="dashboard-main-header">
          <h2>Welcome!</h2>
          <button onClick={handleSignOut} className="sign-out-button">
            Sign Out
          </button>
        </div>

        {/* 2. Welcome/Progress Section */}
        <section className="welcome-section">
          <div className="user-details">
            <div className="avatar-panel">
              <img
                src={EngineerAvatar}
                alt="Engineer Avatar"
                className="engineer-avatar"
              />
            </div>
            <div className="greeting-text-panel">
              <p>Hello There, {user ? user.email : "Engineer"}! </p>
              <p>Factory Method Pattern Engineer!</p>
            </div>
          </div>

          <div className="info-bars">
            {/* Bar 1: Progress (FR6.1) */}
            <div className="status-bar progress-bar">
              <div className="bar-value-text">{Math.round(progress)}% COMPLETE</div>
              <div
                className="bar-inner"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* 3. Interactive Storyboards Section (Content Navigation) */}
        <section className="storyboards-section">
          <h2>Interactive Storyboards</h2>
          <div className="storyboard-links">
            {/* Module 1 Link */}
            <Link to="/StoryBoard" className="dashboard-tile concept-tile">
              <img src={dashStory1} alt="Concept" className="tile-icon-img" />
              <p>Concept</p>
            </Link>
            {/* Module 2 Link */}
            <Link to="/StoryBoard" className="dashboard-tile concept-tile">
              <img
                src={dashStory2}
                alt="Application"
                className="tile-icon-img"
              />
              <p>Application</p>
            </Link>
            {/* Module 3 Link */}
            <Link to="/StoryBoard" className="dashboard-tile concept-tile">
              <img src={dashStory3} alt="Theory" className="tile-icon-img" />
              <p>Theory</p>
            </Link>
          </div>
        </section>

        {/* 4. Assessment & Practice Section */}
        <div className="assessment-row">
          {/* Quizzes Tile (Formative Assessment FR4) */}
          <Link to="/QuizDashboard" className="dashboard-tile quiz-tile">
            <h2>Quizzes</h2>
            
            <div className="quiz-info-row">
              {/* 1. Icon on the left */}
              <img
                src={QuizAvatar}
                alt="Pixel Art Quiz Logo"
                className="quiz-pixel-logo"
              />

              {/* 2. Text on the right/wrapping */}
              <div className="quiz-text-content">
                <p>CHALLENGE MODE: FACTORY LOGIC TEST!</p>
              </div>
            </div>
          </Link>

          {/* Flashcards Tile (Practice) */}
          <Link to="/flashcards" className="dashboard-tile flashcard-tile">
            <h2>Flashcards</h2>

            <div className="flashcard-images-row">
              <div className="flashcard-icons">
                <img
                  src={flashbulb}
                  alt="Pixel Art flashcard Logo"
                  className="flash-logo"
                />
              </div>

              <div className="spanner-icon">
                <img
                  src={spanner}
                  alt="Pixel Art spanner Logo"
                  className="spanner-logo-img"
                />
              </div>
            </div>
          </Link>

          {/* Suggested Reads Tile (Practice) */}
          <Link
            to="/SuggestedReads"
            className="dashboard-tile SuggestedReads-tile"
          >
            <h2>Suggested Reads</h2>
            <div className="flashcard-images-row">
              <div className="Bookmark-icons">
                <img
                  src={bookmark}
                  alt="Pixel Art flashcard Logo"
                  className="Bookmark"
                />
              </div>

              <div className="Book-icon">
                <img
                  src={book}
                  alt="Pixel Art spanner Logo"
                  className="Apple"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
