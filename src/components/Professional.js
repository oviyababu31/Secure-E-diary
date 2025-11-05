import React from 'react';
import { User, Briefcase } from 'lucide-react';
import './SecureEDiary.css';

const Professional = ({ setProfessionalType, setUserType }) => {
  return (
    <div className="main-container professional-screen">
      <div className="white-card">
        <h2 className="main-title">Select Professional Type</h2>
        <div className="button-group">
          <button className="btn-faculty" onClick={() => setProfessionalType('faculty')}>
            <User className="btn-icon" /> Faculty
          </button>
          <button className="btn-employee" onClick={() => setProfessionalType('employee')}>
            <Briefcase className="btn-icon" /> Employee
          </button>
        </div>
        <button className="btn-back" onClick={() => setUserType(null)}>← Back</button>
      </div>
    </div>
  );
};

export default Professional;
