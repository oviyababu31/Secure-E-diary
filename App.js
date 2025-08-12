import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import StudentsMenu from './StudentsMenu';

// Menus
import TimeTableMenu from './TimeTableMenu';
import ExamScheduleMenu from './ExamScheduleMenu';
import ClassNotesMenu from './ClassNotesMenu';
import TodoListMenu from './TodoListMenu';

// Pages (each accepts prop mode: "view" | "write" | "encrypted")
import TimeTable from './TimeTable';
import ExamSchedule from './ExamSchedule';
import ClassNotes from './ClassNotes';
import TodoList from './TodoList';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/students" element={<StudentsMenu />} />

        {/* TimeTable */}
        <Route path="/students/time-table/menu" element={<TimeTableMenu />} />
        <Route path="/students/time-table/view" element={<TimeTable mode="view" />} />
        <Route path="/students/time-table/write" element={<TimeTable mode="write" />} />
        <Route path="/students/time-table/encrypted" element={<TimeTable mode="encrypted" />} />

        {/* Exam Schedule */}
        <Route path="/students/exam-schedule/menu" element={<ExamScheduleMenu />} />
        <Route path="/students/exam-schedule/view" element={<ExamSchedule mode="view" />} />
        <Route path="/students/exam-schedule/write" element={<ExamSchedule mode="write" />} />
        <Route path="/students/exam-schedule/encrypted" element={<ExamSchedule mode="encrypted" />} />

        {/* Class Notes */}
        <Route path="/students/class-notes/menu" element={<ClassNotesMenu />} />
        <Route path="/students/class-notes/view" element={<ClassNotes mode="view" />} />
        <Route path="/students/class-notes/write" element={<ClassNotes mode="write" />} />
        <Route path="/students/class-notes/encrypted" element={<ClassNotes mode="encrypted" />} />

        {/* To-Do List */}
        <Route path="/students/to-do-list/menu" element={<TodoListMenu />} />
        <Route path="/students/to-do-list/view" element={<TodoList mode="view" />} />
        <Route path="/students/to-do-list/write" element={<TodoList mode="write" />} />
        <Route path="/students/to-do-list/encrypted" element={<TodoList mode="encrypted" />} />

        <Route path="*" element={<h1 style={{ padding: 30 }}>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}