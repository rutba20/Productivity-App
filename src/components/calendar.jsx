import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css";

const Calendar = ({ setSelectedTask, setSelectedDate }) => {
  const [events, saveEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || []
  );

  const [showInput, setShowInput] = useState(false);
  const [localDate, setLocalDate] = useState("");
  const [taskText, setTaskText] = useState("");
  const [color, setColor] = useState("#3788d8");

  // When clicking a date
  const handleDateClick = (info) => {
    setLocalDate(info.dateStr);   // ✅ local only
    setSelectedDate(info.dateStr); // ✅ global (for panel)
    setShowInput(true);
  };
  const handleEventClick = (info) => {
    const clickedDate = info.event.startStr.split("T")[0];

    setSelectedDate(clickedDate);

    setSelectedTask({
      title: info.event.title,
      date: clickedDate,
    });
  };

  // Add task on Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && taskText.trim() !== "") {
      const formattedDate = new Date(localDate).toISOString().split("T")[0];
      const newEvent = {
        title: taskText,
        start: formattedDate,
        date: formattedDate,
        completed: false,
        color: color,
      };

      const updatedEvents = [...events, newEvent];
      saveEvents(updatedEvents);

      // ALSO SAVE TO TASKS
      const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = [...existingTasks, newEvent];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      window.dispatchEvent(new Event("tasksUpdated"));

      setTaskText("");
      setShowInput(false);
    }
  };
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={events}
        height="85vh"
      />

      {/* Floating Input Box */}
      {showInput && (
        <div className="task-popup">
          <input
            type="text"
            placeholder="Enter task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />

          {/* Color Options */}
          <div className="color-options">
            {["#3788d8", "#28a745", "#dc3545", "#ffc107", "#6f42c1"].map(
              (c) => (
                <span
                  key={c}
                  className={`color-dot ${color === c ? "active" : ""}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              )
            )}
          </div>

          <button onClick={() => setShowInput(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;