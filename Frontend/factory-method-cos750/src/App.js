import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quizzes from './Pages/Quizzes';

function App() {
  return (
     <Router>
      <Routes>
       
        <Route path="/" element={<Quizzes/>} />
  
      </Routes>
    </Router>
  );
}

export default App;
