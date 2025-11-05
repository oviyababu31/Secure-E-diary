import React, { useState, useEffect } from 'react';
import { Lock, Calendar, Eye, EyeOff, Save } from 'lucide-react';
import { encryptData, decryptData } from './SecureEncryption';
import './SecureEDiary.css';

const DiaryPage = ({ userType, professionalType, category, algorithm, setCategory }) => {
  const [currentContent, setCurrentContent] = useState('');
  const [savedEntries, setSavedEntries] = useState({
    notes: [], personal: [], marks: [], passwords: [], qpapers: [], fnotes: [], ideas: [], enotes: [], research: []
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewingEntry, setViewingEntry] = useState(null);

  // ✅ Load existing encrypted data from backend when category changes
  useEffect(() => {
    if (!category) return;

    fetch(`http://localhost:5000/api/diary/get/${localStorage.getItem('email')}/${category}`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(entry => ({
          id: Date.now() + Math.random(),
          date: entry.date,
          algorithm: entry.algorithm,
          encrypted: entry.encrypted,
          decrypted: null,
          showDecrypted: false
        }));
        setSavedEntries(prev => ({ ...prev, [category]: formatted }));
      });
  }, [category]);


  // ✅ Save & Encrypt entry
  const handleSave = () => {
    if (!currentContent.trim()) {
      alert('Please write something!');
      return;
    }

    const encrypted = encryptData(currentContent, algorithm);

    const newEntry = {
      id: Date.now(),
      date: selectedDate,
      algorithm,
      encrypted,
      decrypted: null,
      showDecrypted: false
    };

    // Update UI
    setSavedEntries({
      ...savedEntries,
      [category]: [...savedEntries[category], newEntry]
    });

    setCurrentContent('');
    alert(`Saved & encrypted with ${algorithm}`);

    // ✅ SEND TO BACKEND
    console.log("📌 Sending to backend:", {
      email: localStorage.getItem('email'),
      category,
      date: selectedDate,
      algorithm,
      encrypted
    });

    fetch('http://localhost:5000/api/diary/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: localStorage.getItem('email'),
        category,
        date: selectedDate,
        algorithm,
        encrypted
      })
    })
      .then(res => res.json())
      .then(data => console.log("✅ Backend response:", data))
      .catch(err => console.log("❌ Error sending:", err));
  };


  // ✅ View entry toggle
  const handleViewEntry = (entryId) => {
    setViewingEntry(viewingEntry === entryId ? null : entryId);
  };


  // ✅ Decrypt entry and show/hide plaintext
  const handleDecryptEntry = (entryId) => {
    const updatedEntries = savedEntries[category].map(entry => {
      if (entry.id === entryId) {
        const decrypted = decryptData(entry.encrypted, entry.algorithm, localStorage.getItem('pin'));
        return { ...entry, decrypted, showDecrypted: !entry.showDecrypted };
      }
      return entry;
    });

    setSavedEntries({ ...savedEntries, [category]: updatedEntries });
  };


  return (
    <div className="main-container diary-screen">
      <div className="diary-header">
        <div className="header-left">
          <Lock className="header-icon" />
          <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        </div>
        <button className="btn-back" onClick={() => setCategory(null)}>← Back</button>
      </div>

      <div className="diary-body">
        <div className="calendar-section">
          <Calendar className="calendar-icon" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <p>Encryption: {algorithm}</p>
        </div>

        <div className="entry-section">
          <textarea
            className="entry-textarea"
            value={currentContent}
            onChange={(e) => setCurrentContent(e.target.value)}
            placeholder={`Write your ${category} here...`}
          />

          <button className="btn-save" onClick={handleSave}>
            <Save /> Save & Encrypt
          </button>

          {savedEntries[category].length > 0 && (
            <div className="saved-entries">
              {savedEntries[category].map(entry => (
                <div key={entry.id} className="entry-card">
                  <div className="entry-header">
                    <span>📅 {entry.date}</span>
                    <span>🔐 {entry.algorithm}</span>

                    <button onClick={() => handleViewEntry(entry.id)}>
                      {viewingEntry === entry.id ? 'Hide' : 'View'}
                    </button>
                  </div>

                  {viewingEntry === entry.id && (
                    <>
                      <div className="encrypted-box">{entry.encrypted}</div>

                      <button onClick={() => handleDecryptEntry(entry.id)}>
                        {entry.showDecrypted ? <EyeOff /> : <Eye />}
                        {entry.showDecrypted ? 'Hide Decrypted' : 'Decrypt & View'}
                      </button>

                      {entry.showDecrypted && (
                        <div className="decrypted-box">{entry.decrypted}</div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
