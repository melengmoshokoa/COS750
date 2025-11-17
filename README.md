🏭 Factory Methods Adventures

Welcome to the Factory Methods Learning Hub!
A fun, gamified learning platform built to help students master the
Factory Method design pattern using lessons, quizzes, XP, and badges.

<img width="1365" height="630" alt="Screenshot 2025-11-17 093557" src="https://github.com/user-attachments/assets/d203677c-db84-4521-bb82-7c2a6c7e785f" />


------------------------------------------------------------------------

🎯 Project Goal

This prototype helps learners: - Understand Factory Methods with clear
explanations and examples. - Reinforce learning through interactive
quizzes. - Earn XP and unlock badges. - Access integrated external
reading resources.

------------------------------------------------------------------------

⚡ Features

✏️ Interactive Lessons

Step‑by‑step explanations of the Factory Method pattern.

🎮 Gamification

Earn XP, unlock badges, and track your progress.

🧠 Quizzes

Multiple‑choice questions.

🗄️ Data Management (Supabase)

-   Stores XP
-   Stores badges
-   Tracks user progress

🔗 External Resources

Hyperlinks included for additional reading.

------------------------------------------------------------------------

🛠️ Tech Stack

-   Frontend: React.js + Tailwind CSS
-   Backend: Supabase
-   Local Development Prototype (no deployment yet)

------------------------------------------------------------------------

📂 Project Structure

    project/
    │
    ├── backend/                 # Supabase-related code or backend utilities
    │
    └── frontend/
        └── factory-method-cos750/
            ├── Pages/
            ├── components/
            ├── services/
            ├── data/
            ├── assets/
            └── App.js

------------------------------------------------------------------------

🚀 Getting Started

1️⃣ Clone the repository

------------------------------------------------------------------------

2️⃣ Environment Setup – VERY IMPORTANT

Both frontend and backend have environment variables.

🔐 Create a .env file for the Backend

Inside the /backend directory:

    cd backend
    touch .env

Include your backend keys such as:

    SUPABASE_URL=
    SUPABASE_ANON_KEY=

🔐 Create a .env file for the Frontend

Inside the /frontend/factory-method-cos750/ directory:

    cd frontend/factory-method-cos750
    touch .env

Include:

    REACT_APP_API_URL=http://localhost:3001/api
    REACT_APP_SUPABASE_URL=
    REACT_APP_SUPABASE_KEY=

  The app will not run correctly without the required .env files.

------------------------------------------------------------------------

3️⃣ Running the Frontend

Navigate into the correct folder:

    cd frontend/factory-method-cos750
    npm install
    npm start

Runs on http://localhost:3000

------------------------------------------------------------------------

4️⃣ Running the Backend

Navigate into:

    cd backend
    npm run dev

(Backend behavior depends on your setup: scripts, Supabase
configuration, etc.)

------------------------------------------------------------------------

🧩 System Administration Notes

Since this is a prototype, the dev team manages everything: - Running
local environments
- Testing and troubleshooting
- Updating lessons, quizzes, and progress logic
- No cloud deployment yet

------------------------------------------------------------------------

🔮 Future Enhancements

-   Deployment to the cloud
-   Achievements and pop‑up animations
-   Leaderboards
-   Expanded design pattern lessons

------------------------------------------------------------------------
