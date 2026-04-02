import React, { useState } from "react";
import "./dayTimeline.css";

export default function DayTimeline({ setSelectedTask }) {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const [tasks, setTasks] = useState([]);

    // 👇 NEW STATES
    const [activeHour, setActiveHour] = useState(null);
    const [taskInput, setTaskInput] = useState("");
    const [selectedColor, setSelectedColor] = useState("#2563eb");

    // 👉 CLICK SLOT
    const handleSlotClick = (hour) => {
        setActiveHour(hour);
        setTaskInput("");
    };

    // 👉 SAVE TASK ON ENTER
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && taskInput.trim() !== "") {
            const newTask = {
                id: Date.now(),
                title: taskInput,
                start: activeHour,
                duration: 1,
                color: selectedColor,
            };

            setTasks([...tasks, newTask]);

            // reset
            setActiveHour(null);
            setTaskInput("");
        }
    };

    return (
        <div className="day-container">

            {/* TIME COLUMN */}
            <div className="time-column">
                {hours.map((h) => (
                    <div key={h} className="time-slot">
                        {h}:00
                    </div>
                ))}
            </div>

            {/* GRID */}
            <div className="timeline-grid">

                {/* GRID ROWS */}
                <div className="grid-rows">
                    {hours.map((h) => (
                        <div
                            key={h}
                            className="grid-row"
                            onClick={() => handleSlotClick(h)}
                        >
                            {activeHour === h && (
                                <div className="task-input-wrapper">
                                    <input
                                        autoFocus
                                        className="task-input"
                                        value={taskInput}
                                        onChange={(e) => setTaskInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Enter task..."
                                    />

                                    <div className="color-picker">
                                        {["#2563eb", "#22c55e", "#ef4444", "#a855f7"].map((color) => (
                                            <span
                                                key={color}
                                                className={`color-dot ${selectedColor === color ? "active" : ""}`}
                                                style={{ background: color }}
                                                onClick={() => setSelectedColor(color)}
                                                
                                            />
                                            
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* TASK BLOCKS */}
                <div className="tasks-layer">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="task-block"
                            onClick={() => setSelectedTask(task)}
                            style={{
                                top: task.start * 60,
                                height: task.duration * 60,
                                background: task.color,
                            }}
                        >
                            <p className="task-title">{task.title}</p>
                            <span className="task-time">
                                {task.start}:00 - {task.start + task.duration}:00
                            </span>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}