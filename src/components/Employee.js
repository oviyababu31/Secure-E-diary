import React from 'react';
import { Briefcase, Lightbulb, FileText, FileSpreadsheet } from 'lucide-react';
import './SecureEDiary.css';

const Employee = ({ setProfessionalType, setCategory, setUserType }) => {
  return (
    <div className="category-screen">
      <div className="card">
        <Briefcase className="main-icon" />
        <h1 className="main-title">Employee Diary</h1>
        <p className="main-subtitle">Select a Category</p>
        <div className="button-group">
          <button className="btn-employee-category" onClick={() => setCategory('ideas')}>
            <Lightbulb className="btn-icon" /> Patent Ideas
          </button>
          <button className="btn-employee-category" onClick={() => setCategory('enotes')}>
            <FileText className="btn-icon" /> Notes
          </button>
          <button className="btn-employee-category" onClick={() => setCategory('research')}>
            <FileSpreadsheet className="btn-icon" /> Research Papers
          </button>
        </div>
        <button className="btn-back" onClick={() => setProfessionalType(null)}>← Back</button>
      </div>
    </div>
  );
};

export default Employee;
