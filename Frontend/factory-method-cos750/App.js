import React from "react";

const woodBrickBackground = {
  backgroundColor: "#2c0d00",
  backgroundImage:
    "url('https://cdn.pixabay.com/photo/2017/08/11/22/51/wood-2628656_960_720.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "repeat",
  color: "#f69c36",
  height: "100vh",
  padding: "40px",
  fontFamily: "'Press Start 2P', cursive",
  letterSpacing: "1px",
  textTransform: "uppercase",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function ProgressBar() {
  const totalWidth = 260; // reduced from 300
  const height = 20;
  const progress = 0.5; // 50% progress

  return (
    <div style={{ marginTop: 20, width: totalWidth }}>
      <svg width={totalWidth} height={height}>
        <rect x={0} y={0} width={totalWidth} height={height} fill="#3a1602" rx={8} ry={8} />
        <rect
          x={0}
          y={0}
          width={totalWidth * progress}
          height={height}
          fill="#f69c36"
          rx={8}
          ry={8}
        />
      </svg>

      <div
        style={{
          marginTop: 20,
          width: "100%",
          fontWeight: "bold",
          position: "relative",
          textTransform: "uppercase",
          color: "#f69c36",
          fontSize: 16,
          userSelect: "none",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            position: "relative",
            zIndex: 2,
            backgroundColor: "#2c0d00",
            padding: "0 10px",
            display: "inline-block",
          }}
        >
          QUIZZES COMPLETED
        </span>
        <hr
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            border: "none",
            borderTop: "3px solid #f69c36",
            transform: "translateY(-50%)",
            zIndex: 1,
            margin: 0,
          }}
        />
      </div>

      <div
        style={{
          marginTop: 30,
          display: "flex",
          maxWidth: totalWidth,
          width: "100%",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "#f69c36",
            padding: "10px 20px",
            borderRadius: "6px",
            color: "#2c0d00",
            fontWeight: "bold",
            textAlign: "center",
            flex: "0 0 140px", // reduced from 160px (about 1 inch smaller)
            fontSize: "12px", // reduced font size (16px -> 12px)
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          IN PROGRESS
        </div>
        <div
          style={{
            border: "2px solid #f69c36",
            padding: "10px 16px 10px 10px",
            borderRadius: "6px",
            color: "#f69c36",
            fontWeight: "bold",
            textAlign: "left",
            flex: "0 0 22.5px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            marginLeft: "auto",
            fontSize: "10px",
          }}
        >
          FACTORY LOGIC TEST
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={woodBrickBackground}>
      {/* Title Box */}
      <div
        style={{
          backgroundColor: "#3a1602",
          padding: "30px 20px",
          borderRadius: "8px",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0 0 10px #c76a19",
          fontWeight: "bold",
        }}
      >
        <div style={{ fontSize: "80px", lineHeight: "1" }}>
          FACTORY
          <br />
          METHOD
        </div>
        <div style={{ fontSize: "48px", lineHeight: "1", marginTop: "15px" }}>
          ADVENTURES
        </div>
      </div>

      {/* Main container */}
      <div
        style={{
          backgroundColor: "#3a1602",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 8px #c76a19",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "15px",
          maxWidth: "400px",
          width: "100%",
          position: "relative",
          alignItems: "flex-start",
        }}
      >
        {/* Top vertical stacks */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {/* Left stack */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              minWidth: "150px",
              position: "relative",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "28px",
                position: "absolute",
                top: "-25px",
                right: "10px",
              }}
            >
              Numbers
            </div>

            <div
              style={{
                backgroundColor: "#2c0d00",
                padding: "10px",
                width: "100%",
                textAlign: "center",
                borderRadius: "4px",
                marginTop: "20px",
                textTransform: "uppercase",
              }}
            >
              LEVEL 7
            </div>
            <div
              style={{
                backgroundColor: "#2c0d00",
                padding: "10px",
                width: "100%",
                textAlign: "center",
                borderRadius: "4px",
                textTransform: "uppercase",
              }}
            >
              PARTS <span style={{ fontWeight: "bold" }}>120</span>
            </div>
            <div
              style={{
                backgroundColor: "#2c0d00",
                padding: "10px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  border: "1px solid #aa5a12",
                  padding: "5px",
                  width: "30px",
                  height: "30px",
                  textAlign: "center",
                }}
              >
                🛠️
              </div>
              <div
                style={{
                  border: "1px solid #aa5a12",
                  padding: "5px",
                  width: "30px",
                  height: "30px",
                  textAlign: "center",
                }}
              >
                ⛑️
              </div>
              <div
                style={{
                  border: "1px solid #aa5a12",
                  padding: "5px",
                  width: "30px",
                  height: "30px",
                  textAlign: "center",
                }}
              >
                ⚙️
              </div>
            </div>
          </div>

          {/* Right stack */}
          <div
            style={{
              backgroundColor: "#2c0d00",
              padding: "10px 20px",
              borderRadius: "8px",
              boxShadow: "0 0 8px #c76a19",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              minWidth: "150px",
              textTransform: "uppercase",
              position: "relative",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "32px" }}>2 323</div>
            <div style={{ fontSize: "18px" }}>EXPERIENCE</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  border: "1px solid #aa5a12",
                  padding: "5px",
                  width: "25px",
                  height: "25px",
                  textAlign: "center",
                }}
              >
                🔨
              </div>
              <div
                style={{
                  border: "1px solid #aa5a12",
                  padding: "5px",
                  width: "25px",
                  height: "25px",
                  textAlign: "center",
                }}
              >
                🧱
              </div>
              <div
                style={{
                  border: "1px solid #aa5a12",
                  padding: "5px",
                  width: "25px",
                  height: "25px",
                  textAlign: "center",
                }}
              >
                ⚙️
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#2c0d00",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 8px #c76a19",
            maxWidth: "350px",
            width: "90%",
            position: "relative",
            fontWeight: "bold",
            textTransform: "uppercase",

            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "28px",
              width: "100%",
              textAlign: "left",
            }}
          >
            Progress
          </div>

          <ProgressBar />
        </div>
      </div>
    </div>
  );
}

export default App;


