import React, { useState, useEffect } from "react";

function ClassNotes() {
  const [notes, setNotes] = useState("");
  const storageKey = "classnotes";

  // Load data
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setNotes(atob(saved)); // decode from Base64
    }
  }, []);

  // Save data
  const saveNotes = () => {
    localStorage.setItem(storageKey, btoa(notes)); // encode to Base64
    alert("Class notes saved (encrypted)!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Class Notes</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows="10"
        cols="50"
      />
      <br />
      <button onClick={saveNotes}>Save Notes</button>
    </div>
  );
}

export default ClassNotes;
