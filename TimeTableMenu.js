import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TimeTableMenu() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2>Time Table Menu</h2>
      <button onClick={() => navigate('/students/time-table/view')} style={btnStyle}>
        View Saved Info
      </button>
      <button onClick={() => navigate('/students/time-table/write')} style={btnStyle}>
        Rewrite Info
      </button>
      <button onClick={() => navigate('/students/time-table/encrypted')} style={btnStyle}>
        View Encrypted Info
      </button>
    </div>
  );
}

const btnStyle = {
  margin: '10px 0',
  padding: '10px 16px',
  fontSize: 16,
  cursor: 'pointer',
};
