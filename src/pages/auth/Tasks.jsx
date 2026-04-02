import "./Tasks.css";
import React, { useState } from "react";
import DayTimeline from "../../components/DayTimeline";
import Calendar from "../../components/calendar";

export default function Tasks() {
    // Controls which view is active (Today timeline vs Calendar view)
    const [activeView, setActiveView] = useState("Today");

    // Stores the currently selected task (used in Today view for showing single task details)
    const [selectedTask, setSelectedTask] = useState(null);

    // Stores the selected date from calendar (used in Calendar view to show all tasks of that day)
    const [selectedDate, setSelectedDate] = useState(null);

    // Main source of truth for all tasks (loaded from localStorage)
    // Each task contains: { title, date, completed, color }
    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem("tasks")) || []
    );

    // Closes whichever panel is currently open
    const handleCloseDetails = () => {
        setSelectedTask(null);
        setSelectedDate(null);
    };

    // Filters tasks for the selected date (used in Calendar details panel)
    const tasksForDay = tasks.filter(
        task => task.date?.split("T")[0] === selectedDate
    );

    console.log("Selected Date:", selectedDate);
    console.log("All Tasks:", tasks);
    console.log(
        "Filtered:",
        tasksForDay
    );

    React.useEffect(() => {
        const syncTasks = () => {
            const stored = JSON.parse(localStorage.getItem("tasks")) || [];
            setTasks(stored);
        };

        window.addEventListener("tasksUpdated", syncTasks);

        return () => window.removeEventListener("tasksUpdated", syncTasks);
    }, []);

    return (
        <div className={`tasks-page ${(activeView === "Today" && selectedTask) ||
            (activeView === "Calendar" && selectedDate)
            ? "show-details"
            : ""
            }`}>
            <div className="tasks-sidebar">
                <h3>Tasks</h3>

                <ul>
                    <li
                        className={activeView === "Today" ? "active" : ""}
                        onClick={() => setActiveView("Today")}
                    >
                        Today
                    </li>

                    <li
                        className={activeView === "Calendar" ? "active" : ""}
                        onClick={() => setActiveView("Calendar")}
                    >
                        Calendar
                    </li>

                </ul>
            </div>

            <div className="tasks-main">

                <div className="tasks-header">
                    <h2>{activeView}</h2>
                </div>

                <div className="timeline-view">
                    {activeView === "Today" && <DayTimeline setSelectedTask={setSelectedTask} />}
                    {activeView === "Calendar" && (
                        <Calendar
                            setSelectedTask={setSelectedTask}
                            setSelectedDate={setSelectedDate}
                        />
                    )}

                </div>

            </div>
            {/* RIGHT DETAILS PANEL */}
            {activeView === "Today" && selectedTask && (
                <div className="tasks-details">

                    <div className="details-header">
                        <h3>Task Details</h3>
                        <button onClick={handleCloseDetails}>✕</button>
                    </div>

                    <div className="details-group">
                        <label>Date</label>
                        <div className="details-box">
                            {new Date().toLocaleDateString()}
                        </div>
                    </div>

                    <div className="details-group">
                        <label>Title</label>
                        <input className="details-input" value={selectedTask.title} readOnly />
                    </div>

                    <div className="details-group">
                        <label>Time</label>
                        <div className="details-box">
                            {selectedTask.start}:00 - {selectedTask.start + selectedTask.duration}:00
                        </div>
                    </div>

                    <div className="details-group">
                        <label>Description</label>
                        <textarea className="details-textarea" placeholder="Add notes..." />
                    </div>

                </div>
            )}
            {activeView === "Calendar" && selectedDate && (
                <div className="tasks-details">

                    <div className="details-header">
                        <h3>Tasks for {selectedDate}</h3>
                        <button onClick={handleCloseDetails}>✕</button>
                    </div>

                    {tasksForDay.length === 0 ? (
                        <p>No tasks for this day</p>
                    ) : (
                        tasksForDay.map((task, i) => (
                            <div key={i} className="task-check-item">

                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => {
                                        const updated = tasks.map(t =>
                                            t === task ? { ...t, completed: !t.completed } : t
                                        );
                                        setTasks(updated);
                                        localStorage.setItem("tasks", JSON.stringify(updated));
                                    }}
                                />

                                <span className={task.completed ? "done" : ""}>
                                    {task.title}
                                </span>

                            </div>
                        ))
                    )}

                </div>
            )}
        </div>
    );
}