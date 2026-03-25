import "./Tasks.css";
import React, { useState } from "react";
import { TasksTimeline } from "../../components/TaskstTimeline";
import TimelineTabs from "../../components/TimelineTabs";

export default function Tasks() {
    const [activeTab, setActiveTab] = useState("Day");

    return (
        <div className="tasks-page">

            {/* LEFT SIDEBAR */}
            <div className="tasks-sidebar">
                <h3>Tasks</h3>
                <ul>
                    <li className="active">Today</li>
                    <li>Upcoming</li>
                    <li>Completed</li>
                    <li>All Tasks</li>
                </ul>
            </div>

            {/* CENTER TASK LIST */}
            <div className="tasks-main">
                <div className="tasks-header">
                    <h2>Today</h2>
                    <button className="add-btn">+ Add Task</button>
                </div>
                <TimelineTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="timeline-view">
                    {activeTab === "Day" &&<TasksTimeline />}
                    {activeTab === "Week" && <p>Week View</p>}
                    {activeTab === "Month" && <p>Month View</p>}
                    {activeTab === "Year" && <p>Year View</p>}
                    {activeTab === "Detailed" && <p>Detailed View</p>}
                </div>
                
                

            </div>

            {/* RIGHT DETAILS PANEL */}
            <div className="tasks-details">
                <h3>Task Details</h3>
                <p>Select a task to view details</p>
            </div>
        </div>
    );
}