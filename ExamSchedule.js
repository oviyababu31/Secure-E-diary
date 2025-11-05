import React, { useState, useEffect } from "react";
import "../styles.css";

// Caesar Cipher helper functions
const shift = 3;
const encrypt = (text) =>
  text.replace(/[a-z]/gi, (char) =>
    String.fromCharCode(
      ((char.charCodeAt(0) - (char === char.toUpperCase() ? 65 : 97) + shift) % 26) +
        (char === char.toUpperCase() ? 65 : 97)
    )
  );

const decrypt = (text) =>
  text.replace(/[a-z]/gi, (char) =>
    String.fromCharCode(
      ((char.charCodeAt(0) - (char === char.toUpperCase() ? 65 : 97) - shift + 26) % 26) +
        (char === char.toUpperCase() ? 65 : 97)
    )
  );

export default function ExamSchedule() {
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [text, setText] = useState("");
  const [mode, setMode] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("examSchedule");
    if (saved) {
      setMode(""); // Show menu if saved data exists
    } else {
      setMode("edit"); // Go straight to edit if nothing saved
    }
  }, []);

  const getDayName = (dateString) => {
    const dateObj = new Date(dateString);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dateObj.getDay()];
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    setDay(selectedDate ? getDayName(selectedDate) : "");
  };

  const saveData = () => {
    localStorage.setItem("examSchedule", encrypt(text));
    alert("Exam Schedule saved & encrypted!");
    setMode(""); // Back to menu after saving
  };

  // Menu mode
  if (mode === "") {
    const hasData = localStorage.getItem("examSchedule");
    if (hasData) {
      return (
        <div className="mode-select">
          <h2>Exam Schedule</h2>
          <button
            onClick={() => {
              setText(decrypt(localStorage.getItem("examSchedule")));
              setMode("view");
            }}
          >
            VIEW INFO
          </button>
          <button
            onClick={() => {
              setText(decrypt(localStorage.getItem("examSchedule")));
              setMode("edit");
            }}
          >
            MODIFY INFO
          </button>
          <button
            onClick={() => {
              setText(localStorage.getItem("examSchedule"));
              setMode("encrypted");
            }}
          >
            VIEW ENCRYPTED INFO
          </button>
        </div>
      );
    }
  }

  // View & Encrypted modes (no date/day shown)
  if (mode === "view" || mode === "encrypted") {
    return (
      <div className="ruled-page">
        <textarea
          value={text}
          readOnly
          placeholder="No data available..."
        />
        <button onClick={() => setMode("")}>Back</button>
      </div>
    );
  }

  // Edit mode
  return (
    <div className="ruled-page">
      <div className="header">
        <div>
          Date:
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div>
          Day:
          <input
            type="text"
            value={day}
            readOnly
            style={{ border: "none", background: "transparent" }}
          />
        </div>
      </div>

      <textarea
        placeholder="Write your exam schedule here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={saveData} style={{ marginTop: "10px" }}>
        Save
      </button>
    </div>
  );
}
