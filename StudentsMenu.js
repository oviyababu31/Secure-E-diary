import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function StudentsMenu() {
  const options = ['Time Table', 'Exam Schedule', 'Class Note', 'To-Do List', 'Customize'];
  const navigate = useNavigate();

  return (
    <div className="menu">
      {options.map(opt => (
        <button
          key={opt}
          className="menuButton"
          onClick={() => navigate(opt.toLowerCase().replace(' ', '-'))}
          onClick={() => navigate('/students/time-table/menu')}
        >
          {opt}
        </button>
      ))}
      <button className="backButton" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}