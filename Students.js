import React from "react";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="back-arrow" onClick={() => navigate(-1)}>←</div>
      <h2>Students</h2>
      <div className="students-options">
        <button onClick={() => navigate("/timetable")}>Timetable</button>
        <button onClick={() => navigate("/exam")}>Exam Schedule</button>
        <button onClick={() => navigate("/notes")}>Class Notes</button>
        <button onClick={() => navigate("/todo")}>To-Do List</button>
        <button onClick={() => navigate("/customize")}>Customize</button>
      </div>
    </div>
  );
}
