import React from 'react';
import { GraduationCap, Lock, Briefcase } from 'lucide-react';
import './SecureEDiary.css';

const Student = ({ setUserType }) => {
  return (
    <div className="main-container home-screen">
      <div className="white-card">
        <Lock className="main-icon" />
        <h1 className="main-title">Secure e-Diary</h1>
        <p className="main-subtitle">Select Your User Type</p>
        <div className="button-group">
          <button className="btn-student" onClick={() => setUserType('student')}>
            <GraduationCap className="btn-icon" /> Student
          </button>
          <button className="btn-professional" onClick={() => setUserType('professional')}>
            <Briefcase className="btn-icon" /> Working Professional
          </button>
        </div>
      </div>
    </div>
  );
};

export default Student;
