import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Students from "./components/Students";
import Timetable from "./components/Timetable";
import ExamSchedule from "./components/ExamSchedule";
import ClassNotes from "./components/ClassNotes";
import TodoList from "./components/TodoList";
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/exam" element={<ExamSchedule />} />
        <Route path="/notes" element={<ClassNotes />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
