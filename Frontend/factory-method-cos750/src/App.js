import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quizzes from './Pages/Quizzes';
import QuizContent from './Pages/QuizContent';
import Dashboard from './Pages/Dashboard';  
import QuizDashboard from './Pages/QuizDashboard';
import { QuizProvider } from './Pages/context/QuizContext';
import SuggestedReads from './Pages/SuggestedReads';
import ProgressPage from './Pages/ProgressPage';

function App() {
  return (
    <QuizProvider>
     <Router>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/QuizDashboard" element={<QuizDashboard />} />
        <Route path="/quiz/:lessonId" element={<QuizContent />} />
        <Route path="/SuggestedReads" element={<SuggestedReads /> }/>
      <Route path="/ProgressPage " element={<ProgressPage /> }/>
  
      </Routes>
    </Router>
    </QuizProvider>
  );
}

export default App;
