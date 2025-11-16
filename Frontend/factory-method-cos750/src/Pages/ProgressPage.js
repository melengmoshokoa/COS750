import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import woodBg from "./assests/wood.png";
import api from "../services/apiService";

// Import your badge images from assets
import pizzaBadge from "./assests/pizza-badge.png";
import coffeeBadge from "./assests/coffee-badge.png";
import vehiclesBadge from "./assests/tool-badge.png";
import emailsBadge from "./assests/bell-badge.png";
import shapes from "./assests/palette-badge.png";
import docs from "./assests/doc-badge.png";
import factoryBadge from "./assests/books-badge.png";
import patternBadge from "./assests/building-badge.png";
import machineBadge from "./assests/dartboard-badge.png";
import resourceBadge from "./assests/glasses-badges.png";
import productionBadge from "./assests/magnify-badge.png";

// UPDATED: Fixed duplicate badge keys and added unique badges
const badgeList = [
  { id: "phase_1_mastery", name: "Phase 1: Problem Recognition Mastery", image: factoryBadge },
  { id: "phase_2_mastery", name: "Phase 2: Intent & Definition Mastery", image: patternBadge },
  { id: "phase_3_mastery", name: "Phase 3: Machine Optimizer", image: machineBadge },
  { id: "phase_4_mastery", name: "Phase 4: Resource Manager", image: resourceBadge },
  { id: "phase_5_mastery", name: "Phase 5: Production Flow", image: productionBadge },
  { id: "phase_6_mastery", name: "Phase 6: Advanced Production", image: productionBadge },
  { id: "pizza", name: "Pizza Master", image: pizzaBadge },
  { id: "coffee", name: "Coffee Connoisseur", image: coffeeBadge },
  { id: "vehicles", name: "Auto Engineer", image: vehiclesBadge },
  { id: "emails", name: "Notification Expert", image: emailsBadge },
  { id: "shapes", name: "Shape Master", image: shapes },
  { id: "docs", name: "Document Expert", image: docs },
];

function ProgressPage() {
  const [userProgress, setUserProgress] = useState({ level: 1, xp: 0, badges: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserAndProgress = async () => {
      try {
        setError(null);
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Error getting session:", sessionError);
          setError("Failed to load user session");
          setLoading(false);
          return;
        }

        if (!session || !session.user) {
          console.log("No active session");
          setError("Please log in to view your progress");
          setLoading(false);
          return;
        }

        const currentUserId = session.user.id;
        setUserId(currentUserId);
        console.log("User ID:", currentUserId);

        console.log("Loading user progress...");
        const progressData = await api.progress.getProgress(currentUserId);
        console.log("Progress data received:", progressData);
        
        // ADD DEBUG LOGGING HERE
        console.log("User badges array:", progressData.badges);
        console.log("Looking for badges with ids:", progressData.badges);
        console.log("Available badges in badgeList:", badgeList.map(b => b.id));
        
        // Check each badge match
        progressData.badges.forEach(badgeId => {
          const foundBadge = badgeList.find(b => b.id === badgeId);
          console.log(`Badge ${badgeId}:`, foundBadge ? "FOUND" : "NOT FOUND", foundBadge);
        });
        
        setUserProgress(progressData);

      } catch (error) {
        console.error("Failed to fetch user progress:", error);
        setError("Failed to load progress data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProgress();
  }, []);

  const getEarnedBadges = () => {
    // Use Set to remove duplicates, then filter and map to badge objects
    const uniqueBadgeIds = [...new Set(userProgress.badges)];
    const earned = badgeList.filter(badge => uniqueBadgeIds.includes(badge.id));
    
    console.log("Unique badge IDs:", uniqueBadgeIds);
    console.log("getEarnedBadges result:", earned);
    return earned;
  };

  const Inventory = ({ badges, maxSlots = 20 }) => {
    const emptySlots = maxSlots - badges.length;
    
    console.log("Inventory rendering with badges:", badges);

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
        {badges.map((badge) => {
          console.log("Rendering badge:", badge.id, badge.name);
          return (
            <div key={badge.id} style={{
              width: "60px",
              height: "60px",
              border: "2px solid #c76a19",
              backgroundColor: "#3a1602",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
            }} title={badge.name}>
              <img 
                src={badge.image} 
                alt={badge.name} 
                style={{ 
                  width: "50px", 
                  height: "50px",
                  
                }} 
                onError={(e) => {
                  console.error(`Image failed to load: ${badge.image} for badge ${badge.id}`);
                  e.target.style.display = 'none';
                }}
                onLoad={() => console.log(`Image loaded successfully: ${badge.image}`)}
              />
            </div>
          );
        })}

        {[...Array(emptySlots)].map((_, i) => (
          <div key={`empty-${i}`} style={{
            width: "60px",
            height: "60px",
            border: "2px dashed #3a1602",
            backgroundColor: "#1c0a00",
            borderRadius: "4px",
          }} />
        ))}
      </div>
    );
  };

  const PlayerStats = ({ xp, level }) => {
    const earnedBadges = getEarnedBadges();
    
    return (
      <div style={{
        textAlign: "center",
        marginBottom: "20px",
        color: "#f69c36",
        fontFamily: "'Press Start 2P', cursive",
        fontSize: "14px",
      }}>
        <div>LEVEL: {level}</div>
        <div>XP: {xp}</div>
        <div style={{ fontSize: "10px", marginTop: "10px", color: "#ffa500" }}>
          Badges Earned: {earnedBadges.length}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "#f69c36" }}>
        Loading progress...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "#ff6b6b" }}>
        {error}
        {!userId && (
          <div style={{ marginTop: "10px", fontSize: "12px" }}>
            Please make sure you are logged in.
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      backgroundImage: `url(${woodBg})`,
      backgroundSize: "cover",
      backgroundRepeat: "repeat-y",
      backgroundPosition: "center",
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