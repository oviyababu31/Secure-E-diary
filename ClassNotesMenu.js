import React from "react";
import { useNavigate } from "react-router-dom";

function ClassNotesMenu() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Class Notes</h2>
      <button
        onClick={() => navigate("/classnotes")}
        style={{
          fontSize: "24px",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        +
      </button>
    </div>
  );
}

export default ClassNotesMenu;
