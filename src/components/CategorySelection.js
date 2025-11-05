import React from 'react';
import { GraduationCap, KeyRound, FileText, FileSpreadsheet, Lightbulb } from 'lucide-react';
import './SecureEDiary.css';

const CategorySelection = ({ userType, professionalType, setCategory, setProfessionalType, setUserType }) => {
  const buttons = () => {
    if(userType === 'student'){
      return [
        { key:'notes', label:'📝 Notes', bg:'#7c3aed', icon:null },
        { key:'personal', label:'💭 Personal', bg:'#8b5cf6', icon:null },
        { key:'marks', label:'📊 Marks', bg:'#2563eb', icon:null }
      ];
    } else if(professionalType === 'faculty'){
      return [
        { key:'passwords', label:'Passwords', bg:'#7c3aed', icon:<KeyRound /> },
        { key:'qpapers', label:'Question Papers', bg:'#8b5cf6', icon:<FileSpreadsheet /> },
        { key:'fnotes', label:'Notes', bg:'#2563eb', icon:<FileText /> }
      ];
    } else if(professionalType === 'employee'){
      return [
        { key:'ideas', label:'Patent Ideas', bg:'#2563eb', icon:<Lightbulb /> },
        { key:'enotes', label:'Notes', bg:'#7c3aed', icon:<FileText /> },
        { key:'research', label:'Research Papers', bg:'#8b5cf6', icon:<FileSpreadsheet /> }
      ];
    }
  };

  const title = userType === 'student' ? 'Student Diary' :
                professionalType === 'faculty' ? 'Faculty Diary' : 'Employee Diary';

  return (
    <div className="main-container category-screen">
      <div className="white-card">
        <h1 className="main-title">{title}</h1>
        <p className="main-subtitle">Select a Category</p>
        <div className="button-group">
          {buttons().map(btn => (
            <button key={btn.key} style={{ backgroundColor:btn.bg }} onClick={()=>setCategory(btn.key)}>
              {btn.icon} {btn.label}
            </button>
          ))}
        </div>
        <button className="btn-back" onClick={() => professionalType ? setProfessionalType(null) : setUserType(null)}>← Back</button>
      </div>
    </div>
  );
};

export default CategorySelection;
