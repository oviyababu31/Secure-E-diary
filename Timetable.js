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

export default function Timetable() {
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [text, setText] = useState("");
  const [mode, setMode] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("timetable");
    if (saved) {
      setMode(""); // Show mode selection if there's saved data
    } else {
      setMode("edit"); // If no saved data, go to edit mode
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
    localStorage.setItem("timetable", encrypt(text));
    alert("Timetable saved & encrypted!");
    setMode(""); // Return to menu after saving
  };

  if (mode === "") {
    const hasData = localStorage.getItem("timetable");
    if (hasData) {
      return (
        <div className="mode-select">
          <h2>Timetable</h2>
          <button
            onClick={() => {
              setText(decrypt(localStorage.getItem("timetable")));
              setMode("view");
            }}
          >
            VIEW INFO
          </button>
          <button
            onClick={() => {
              setText(decrypt(localStorage.getItem("timetable")));
              setMode("edit");
            }}
          >
            MODIFY INFO
          </button>
          <button
            onClick={() => {
              setText(localStorage.getItem("timetable"));
              setMode("encrypted");
            }}
          >
            VIEW ENCRYPTED INFO
          </button>
        </div>
      );
    }
  }

  return (
    <div className="ruled-page">
      <div className="header">
        <div>
          Date:
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            disabled={mode === "view" || mode === "encrypted"}
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
        placeholder="Write your timetable here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={mode === "view" || mode === "encrypted"}
      />

      {mode === "edit" && (
        <button onClick={saveData} style={{ marginTop: "10px" }}>
          Save
        </button>
      )}
    </div>
  );
}
