import "./dashboard.css";
import { TasksWidget } from "../../components/TasksWidget";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const generateTimeSlots = () => {
    const slots = [];

    for (let hour = 0; hour < 24; hour++) {
        for (let min of [0, 30]) {
            const h = hour.toString().padStart(2, "0");
            const m = min.toString().padStart(2, "0");
            slots.push(`${h}:${m}`);
        }
    }

    return slots;
};
const getCurrentPosition = () => {
    const now = new Date();
    const totalMinutes = now.getHours() * 60 + now.getMinutes();
    return (totalMinutes / (24 * 60)) * 100;
};

export default function Dashboard() {
    const timeSlots = generateTimeSlots();
    const [goals, setGoals] = useState([
        { text: "Finish ML project", progress: 70 },
        { text: "Workout 5x/week", progress: 40 },
        { text: "Apply for internships", progress: 20 },
    ]);
    return (
        <div className="dashboard-container">

            {/* Sidebar */}
            <aside className="sidebar">
                <h2 className="logo">AI Task Buddy</h2>
                <header className="topbar">

                    <input
                        type="text"
                        placeholder="Search..."
                        className="search"
                    />

                    <div className="topbar-right">



                    </div>

                </header>
                <nav>
                    <ul>
                        <li className="active">Dashboard</li>
                        <li>
                            <Link to="/tasks">Tasks</Link>
                        </li>
                        <li>Goals</li>
                        <li>Calendar</li>
                        <li>Notes</li>
                        <li>Analytics</li>
                        <li>Settings</li>
                    </ul>
                </nav>
            </aside>

            {/* Main Section */}
            <main className="main-content">

                {/* Top Navbar */}
                <header className="topbar">

                </header>

                {/* Greeting Section */}
                <section className="greeting">
                    <h2>Hello Rutba!</h2>
                    <p>Here is your productivity overview</p>
                </section>

                {/* Stats Cards */}
                <section className="stats">
                    <div className="stat-card">
                        <p className="stat-title">Tasks Completed</p>
                        <h3>5 / 8</h3>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: "62%" }}></div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <p className="stat-title">Focus Time</p>
                        <h3>2h</h3>
                        <div className="segments">
                            {[...Array(20)].map((_, i) => (
                                <span
                                    key={i}
                                    className={i < 12 ? "segment active" : "segment"}
                                ></span>
                            ))}
                        </div>
                    </div>

                    <div className="stat-card">
                        <p className="stat-title">Habits Done</p>
                        <h3>4 / 6</h3>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: "62%" }}></div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <p className="stat-title">Goal Progress</p>
                        <h3>65%</h3>
                        <div className="circle">
                            <svg>
                                <circle cx="30" cy="30" r="26" className="bg" />
                                <circle
                                    cx="30"
                                    cy="30"
                                    r="26"
                                    className="progress"
                                    strokeDasharray="163"
                                    strokeDashoffset="54" // adjust based on %
                                />
                            </svg>
                        </div>
                    </div>
                </section>

                {/* Main Widgets */}

                <div className="dashboard-row">
                    <TasksWidget />

                    <div className="widget calendar">
                        <h3>Today's Timeline</h3>

                        <div className="timeline">
                            <div className="timeline-bar">
                                {timeSlots.map((time, index) => (
                                    <div key={index} className="time-slot">
                                        {time}
                                    </div>
                                ))}
                            </div>
                            <div
                                className="current-time-line"
                                style={{ left: `${getCurrentPosition()}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="widgets-row">

                    {/* Goals Card */}
                    <div className="widget">
                        <h3>Goals</h3>
                        <ul className="goals-list">
                            {goals.map((goal, index) => (
                                <li key={index} className="goal-item">

                                    <div className="goal-header">
                                        <span>{goal.text}</span>
                                        <span>{goal.progress}%</span>
                                    </div>

                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${goal.progress}%` }}
                                        ></div>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Notes Card */}
                    <div className="widget">
                        <h3>Quick Notes</h3>
                        <textarea
                            placeholder="Write something..."
                            className="notes-input"
                        ></textarea>
                    </div>

                </div>



            </main>

        </div >

    );
}