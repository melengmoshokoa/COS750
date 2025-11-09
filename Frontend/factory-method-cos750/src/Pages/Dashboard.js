import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Assume the correct CSS is linked
import EngineerAvatar from '../Media/674-6740075_tf2-scout-pixel-art-hd-png-download.png';
import QuizAvatar from '../Media/Quiz-logo.jpg';

function Dashboard() {
  // Static placeholders for demonstration
  const userName = "ENGINEER"; 
  const progress = 30; // 30% complete
  
  // No hooks (like useAuth or useEffect) are used here to keep it static

  return (
    <div className="dashboard-container">

      {/* 🛑 PLACEHOLDER WARNING: Will be removed when Auth is ready */}
      <div className="auth-warning" style={{ 
        backgroundColor: '#a04b07', 
        border: '3px solid #f69c36', 
        padding: '10px', 
        marginBottom: '20px', 
        textAlign: 'center',
        color: '#ffbf61' 
      }}>
        ⚠️ **DASHBOARD UI PREVIEW:** Authentication and Data are static placeholders.
      </div>

      {/* 1. Header Section */}
      <header className="dashboard-header">
        <h1>FACTORY METHOD ADVENTURES</h1>
      </header>

    <div className="dashboard-content-wrapper">
      <h2>Welcome</h2>
      {/* 2. Welcome/Progress Section */}
      <section className="welcome-section">
        
        <div className="user-info">
          {/* ⬅️ LEFT COLUMN: Avatar & Greeting Text (Needs a wrapper) */}
                {/* <div className="user-greeting-panel"> 
                    <span className="engineer-avatar"></span>
                    <div className="greeting-text">
                        <p>Welcome back,</p>
                        <p>**ENGINEER OF {userName}**!</p> 
                    </div>
                </div> */}
                {/* <div className="avatar-panel"> 
                    <img src={EngineerAvatar} alt="Engineer Avatar" className="engineer-avatar" />
                </div> */}

                <div className="greeting-text-panel"> 
                    <p>Welcome back,</p>
                    <p>Pattern Engineer!</p> 
                </div>

                {/* <div className="progress-bar-container">
              Current Progress: **{progress}%** Complete
          </div> */}
                
                <div className="info-bars"> 
                    
                    {/* Bar 1: Progress (FR6.1) */}
                    <div className="status-bar progress-bar">
                        <div className="bar-value-text">{progress}% COMPLETE</div>
                        <div className="bar-inner" style={{ width: `${progress}%` }}></div>
                    </div>

                {/* Bar 2: Status/Stat Placeholder */}
                    <div className="status-bar retries-bar">
                        <div className="bar-value-text">3 / 10</div>
                        <div className="bar-inner" style={{ width: '30%' }}></div>
                    </div>

            </div>

        
        </div>
      </section>

      {/* 3. Interactive Storyboards Section (Content Navigation) */}
      <section className="storyboards-section">
        <h2>Interactive Storyboards</h2>
        <div className="storyboard-links">
          {/* Module 1 Link */}
          <Link to="/modules/concept" className="dashboard-tile">
             <span className="tile-icon"></span> 
             <p>Concept</p>
          </Link>
          {/* Module 2 Link */}
          <Link to="/modules/application" className="dashboard-tile">
             <span className="tile-icon"></span> 
             <p>Application</p>
          </Link>
          {/* Module 3 Link */}
          <Link to="/modules/theory" className="dashboard-tile">
             <span className="tile-icon"></span> 
             <p>Theory</p>
          </Link>
        </div>
      </section>

      {/* 4. Assessment & Practice Section */}
      <div className="assessment-row">
        {/* Quizzes Tile (Formative Assessment FR4) */}
        <Link to="/quizzes" className="dashboard-tile quiz-tile">
          <h2>Quizzes</h2>
          <div className="quiz-info-row">
            <p>CHALLENGE MODE: FACTORY LOGIC TEST!</p>
            
            {/* Logo Image Placeholder */}
            <img src={QuizAvatar} alt="Quiz Logo" className="engineer-avatar" />

          </div>


        </Link>
        
        {/* Flashcards Tile (Practice) */}
        <Link to="/flashcards" className="dashboard-tile flashcard-tile">
          <h2>Flashcards</h2>
          <div className="flashcard-icons">
             <span className="tile-icon"></span> 
             <span className="tile-icon"></span>
          </div>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;