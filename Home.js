import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Secure E-Diary</h1>
      <div className="button-grid">
        <button onClick={() => navigate("/students")}>STUDENTS</button>
        <button>PROFESSIONALS</button>
        <button>HOMEMAKERS</button>
        <button>CUSTOMIZE</button>
      </div>
    </div>
  );
}
