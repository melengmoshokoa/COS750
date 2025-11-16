import React, { useEffect, useState } from "react";

// All possible badges (use your actual badge images)
const badgeList = [
  { id: 1, name: "Factory Starter", image: "/badges/factory.png" },
  { id: 2, name: "Pattern Master", image: "/badges/pattern.png" },
  { id: 3, name: "Machine Optimizer", image: "/badges/machine.png" },
  { id: 4, name: "Resource Manager", image: "/badges/resource.png" },
  { id: 5, name: "Production Flow", image: "/badges/production.png" },
];

function ProgressPage({ userId }) {
  const [userProgress, setUserProgress] = useState({ level: 1, xp: 0, badges: [] });
  const [loading, setLoading] = useState(true);

  // Fetch user progress from backend
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await fetch(`/api/user/${userId}/progress`);
        const data = await response.json();
        // Expecting data = { level: number, xp: number, badges: [badgeId, ...] }
        setUserProgress(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user progress:", error);
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, [userId]);

  const getEarnedBadges = () => {
    return badgeList.filter(badge => userProgress.badges.includes(badge.id));
  };

  const Inventory = ({ badges, maxSlots = 20 }) => {
    const emptySlots = maxSlots - badges.length;
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 60px)",
        gap: "8px",
        backgroundColor: "#2a1002",
        padding: "10px",
        border: "4px solid #c76a19",
        borderRadius: "8px",
        maxWidth: "max-content",
        margin: "20px auto",
      }}>
        {badges.map(badge => (
          <div key={badge.id} style={{
            width: "60px",
            height: "60px",
            border: "2px solid #c76a19",
            backgroundColor: "#3a1602",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }} title={badge.name}>
            <img src={badge.image} alt={badge.name} style={{ width: "50px", height: "50px" }} />
          </div>
        ))}
        {[...Array(emptySlots)].map((_, i) => (
          <div key={i} style={{
            width: "60px",
            height: "60px",
            border: "2px solid #3a1602",
            backgroundColor: "#1c0a00",
          }} />
        ))}
      </div>
    );
  };

  const PlayerStats = ({ xp, level }) => (
    <div style={{
      textAlign: "center",
      marginBottom: "20px",
      color: "#f69c36",
      fontFamily: "'Press Start 2P', cursive",
      fontSize: "14px",
    }}>
      <div style={{
      textAlign: "center",
      marginBottom: "20px",
      color: "#f69c36",
      fontFamily: "'Press Start 2P', cursive",
      fontSize: "14px",
    }}>LEVEL: {level}</div>
      <div>XP: {xp}</div>
    </div>
  );

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "#f69c36" }}>
        Loading progress...
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: "#2c0d00",
      minHeight: "100vh",
      padding: "40px",
      fontFamily: "'Press Start 2P', cursive",
      color: "#f69c36",
    }}>
      <h1 style={{ textAlign: "center", fontSize: "32px", marginBottom: "20px" }}>
        INVENTORY
      </h1>

      <PlayerStats xp={userProgress.xp} level={userProgress.level} />

      <Inventory badges={getEarnedBadges()} maxSlots={15} />
    </div>
  );
}

export default ProgressPage;
