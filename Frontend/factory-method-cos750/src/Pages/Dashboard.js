import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Dashboard.css"; 
import QuizAvatar from "../Media/Quizzes-icon.png";
import flashspanner from "../Media/idea.png";
import flashbulb from "../Media/flash-bulb.png";
import spanner from "../Media/Real-spanner.png";
import book from "../Media/Books.png";
import bookmark from "../Media/Boookmark.png";
import EngineerAvatar from "../Media/MAN.png";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // Static placeholders for demonstration
  const userName = "ENGINEER";
  const progress = 30; // 30% complete

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* { 🛑 PLACEHOLDER WARNING: Will be removed when Auth is ready }
      <div className="auth-warning" style={{ 
        backgroundColor: '#a04b07', 
        border: '3px solid #f69c36', 
        padding: '10px', 
        marginBottom: '20px', 
        textAlign: 'center',
        color: '#ffbf61' 
      }}>
        ⚠️ **DASHBOARD UI PREVIEW:** Authentication and Data are static placeholders.
      </div> */}

      {/* 1. Header Section */}
      <header className="dashboard-header">
        <h1>FACTORY METHOD ADVENTURES</h1>
      </header>

      <div className="dashboard-content-wrapper">
        <div className="dashboard-main-header">
          <h2>Welcome!</h2>
          <button onClick={handleSignOut} className="sign-out-button">Sign Out</button>
        </div>

        {/* 2. Welcome/Progress Section */}
        <section className="welcome-section">
          <div className="user-details">
            <div className="avatar-panel">
              <img src={EngineerAvatar} alt="Engineer Avatar" className="engineer-avatar" />
            </div>
            <div className="greeting-text-panel">
              <p>Welcome back, {user ? user.email : 'Engineer'}! </p>
              <p>Factory Method Pattern Engineer!</p>
            </div>
          </div>

          <div className="info-bars">
            {/* Bar 1: Progress (FR6.1) */}
            <div className="status-bar progress-bar">
              <div className="bar-value-text">{progress}% COMPLETE</div>
              <div className="bar-inner" style={{ width: `${progress}%` }}></div>
            </div>
            {/* Bar 2: Status/Stat Placeholder
              <div className="status-bar retries-bar">
                <div className="bar-value-text">3 / 10</div>
                <div className="bar-inner" style={{ width: "30%" }}></div>
              </div> */}
          </div>
        </section>

        {/* 3. Interactive Storyboards Section (Content Navigation) */}
        <section className="storyboards-section">
          <h2>Interactive Storyboards</h2>
          <div className="storyboard-links">
            {/* Module 1 Link */}
            <Link to="/StoryBoard" className="dashboard-tile concept-tile">
              <span className="tile-icon"></span>
              <p>Concept</p>
            </Link>
            {/* Module 2 Link */}
            <Link to="/StoryBoard" className="dashboard-tile concept-tile">
              <span className="tile-icon"></span>
              <p>Application</p>
            </Link>
            {/* Module 3 Link */}
            <Link to="/StoryBoard" className="dashboard-tile concept-tile">
              <span className="tile-icon"></span>
              <p>Theory</p>
            </Link>
          </div>
        </section>

        {/* 4. Assessment & Practice Section */}
        <div className="assessment-row">
          {/* Quizzes Tile (Formative Assessment FR4) */}
          <Link to="/QuizDashboard" className="dashboard-tile quiz-tile">
            <h2>Quizzes</h2>
            {/* <div className="quiz-info-row">
            <p>CHALLENGE MODE: FACTORY LOGIC TEST!</p>
            
            <img src={QuizAvatar} alt="Quiz Logo" className="engineer-avatar" /> */}

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
