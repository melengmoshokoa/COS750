import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Quizzes from './Pages/Quizzes';
import QuizContent from './Pages/QuizDashboard';
import Dashboard from './Pages/Dashboard';  
import QuizDashboard from './Pages/QuizDashboard';
import { QuizProvider } from './Pages/context/QuizContext';
import SuggestedReads from './Pages/SuggestedReads';
import ProgressPage from './Pages/ProgressPage';
import FlashCards from './Pages/FlashCards';
import Auth from './Pages/Auth';
import { supabase } from './supabaseClient';
import Header from "./Pages/Header";
import StoryBoard from './Pages/StoryBoard';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a nice loading spinner
  }

  return (
    <QuizProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={!session ? <Auth /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/QuizDashboard" element={session ? <QuizDashboard /> : <Navigate to="/" />} />
          <Route path="/quiz/:lessonId" element={session ? <QuizContent /> : <Navigate to="/" />} />
          <Route path="/StoryBoard" element={session ? <StoryBoard /> : <Navigate to="/" />} />
          <Route path="/SuggestedReads" element={session ? <SuggestedReads /> : <Navigate to="/" />} />
          <Route path="/ProgressPage" element={session ? <ProgressPage /> : <Navigate to="/" />} />
          <Route path="/StoryBoard" element={session ? <StoryBoard /> : <Navigate to="/" />} />
          <Route path="/FlashCards" element={session ? <FlashCards /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
