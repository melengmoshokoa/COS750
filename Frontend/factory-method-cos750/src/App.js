import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quizzes from "./Pages/Quizzes";
import Dashboard from "./Pages/Dashboard";
import FlashCards from "./Pages/FlashCards";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Quizzes" element={<Quizzes />} />
        <Route path="/Flashcards" element={<FlashCards />} />
      </Routes>
    </Router>
  );
}
export default App;
