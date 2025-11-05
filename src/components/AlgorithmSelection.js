import React from 'react';
import './SecureEDiary.css';

const AlgorithmSelection = ({ userType, professionalType, setAlgorithm, onBack }) => {
  const algorithms = ['AES-256', 'RSA-2048', 'Blowfish', 'Triple DES', 'ChaCha20'];

  return (
    <div className="main-container algorithm-screen">
      <div className="white-card">
        {onBack && (
          <button className="back-button" onClick={onBack}>← Back</button>
        )}
        <h1 className="main-title">Select Your Encryption Algorithm</h1>
        <div className="button-group">
          {algorithms.map((algo) => (
            <button
              key={algo}
              onClick={() => setAlgorithm(algo)}
              className="algo-button"
            >
              {algo}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmSelection;
