import { createContext, useState } from "react";

export const QuizContext = createContext();

export function QuizProvider({ children }) {

  const [currentQuizId, setCurrentQuizId] = useState(1);

  // store which quizzes are completed
  const [completed, setCompleted] = useState({
    1: false,
    2: false,
    3: false,
    // ...
  });

  return (
    <QuizContext.Provider value={{
      currentQuizId,
      setCurrentQuizId,
      completed,
      setCompleted
    }}>
      {children}
    </QuizContext.Provider>
  );
}
