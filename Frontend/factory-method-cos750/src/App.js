import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quizzes from './Pages/Quizzes';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
     <Router>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/quizzes" element={<Quizzes />} />
  
      </Routes>
    </Router>
  );
}

export default App;
