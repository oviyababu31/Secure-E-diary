import React, { useState } from 'react';
import Student from './Student';
import Professional from './Professional';
import CategorySelection from './CategorySelection';
import DiaryPage from './DiaryPage';
import AlgorithmSelection from './AlgorithmSelection';

const SecureEDiary = ({ userCredentials }) => {
  const [userType, setUserType] = useState(null);
  const [professionalType, setProfessionalType] = useState(null);
  const [category, setCategory] = useState(null);

  // Separate algorithm states for each type
  const [studentAlgorithm, setStudentAlgorithm] = useState(null);
  const [facultyAlgorithm, setFacultyAlgorithm] = useState(null);
  const [employeeAlgorithm, setEmployeeAlgorithm] = useState(null);

  // Determine active algorithm based on role
  const currentAlgorithm =
    userType === 'student'
      ? studentAlgorithm
      : professionalType === 'faculty'
      ? facultyAlgorithm
      : professionalType === 'employee'
      ? employeeAlgorithm
      : null;

  const setAlgorithmForUser = (algo) => {
    if (userType === 'student') setStudentAlgorithm(algo);
    else if (professionalType === 'faculty') setFacultyAlgorithm(algo);
    else if (professionalType === 'employee') setEmployeeAlgorithm(algo);
  };

  // Step 1: Student selection
  if (!userType) return <Student setUserType={setUserType} />;

  // Step 2: Professional selection
  if (userType === 'professional' && !professionalType) {
    return (
      <Professional
        setProfessionalType={setProfessionalType}
        setUserType={setUserType}
      />
    );
  }

  // Step 3: Algorithm selection (for Student or Professional)
  if (!currentAlgorithm) {
    return (
      <AlgorithmSelection
        userType={userType}
        professionalType={professionalType}
        setAlgorithm={setAlgorithmForUser}
        onBack={() => {
          if (userType === 'professional') {
            setProfessionalType(null);
          } else {
            setUserType(null);
          }
        }}
      />
    );
  }

  // Step 4: Category selection
  if (!category) {
    return (
      <CategorySelection
        userType={userType}
        professionalType={professionalType}
        setCategory={setCategory}
        setProfessionalType={setProfessionalType}
        setUserType={setUserType}
      />
    );
  }

  // Step 5: Diary page
  return (
    <DiaryPage
      userType={userType}
      professionalType={professionalType}
      category={category}
      algorithm={currentAlgorithm}
      setCategory={(val) => {
        if (val === null) {
          // Reset algorithm when coming back from diary page
          if (userType === 'student') setStudentAlgorithm(null);
          else if (professionalType === 'faculty') setFacultyAlgorithm(null);
          else if (professionalType === 'employee') setEmployeeAlgorithm(null);
        }
        setCategory(val);
      }}
      userCredentials={userCredentials}
    />
  );
};

export default SecureEDiary;
