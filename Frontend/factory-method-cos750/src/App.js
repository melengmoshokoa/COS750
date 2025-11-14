import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quizzes from './Pages/Quizzes';
import Dashboard from './Pages/Dashboard';
import SuggestedReads from './Pages/SuggestedReads';

function App() {
  return (
     <Router>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/Quizzes" element={<Quizzes />} />
        ‹Route path="/SuggestedReads" element={<SuggestedReads • />}•/>
  
      </Routes>
    </Router>
  );
}

export default App;
