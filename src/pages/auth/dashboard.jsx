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

                <nav>
                    <ul>
                        <li className="active">Dashboard</li>
                        <li>
                            <Link to="/tasks">Tasks</Link>
                        </li>
                        <li>
                            <Link to="/Goals">Goals</Link>
                        </li>
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
                    <section className="greeting">
                        <h2>Hello Rutba!</h2>
                        <p>Here is your productivity overview</p>
                    </section>
                </header>

                <div className="alerts-section">

                    {/* Warning */}
                    <div className="alert-card warning">
                        <span className="alert-dot"></span>
                        <p>
                            You missed <strong>3 tasks yesterday</strong> — Gym session, Read 20 pages, Review weekly budget
                        </p>
                    </div>

                    {/* Reminder */}
                    <div className="alert-card reminder">
                        <span className="alert-dot"></span>
                        <p>
                            Deadline in <strong>2 days</strong> — “Launch Portfolio Website” milestone due Friday
                        </p>
                    </div>

                </div>

                {/* Stats Cards */}
                <section className="stats">
                    <div className="stat-card glass">
                        <div className="stat-top">
                            <div className="stat-icon purple">📊</div>

                            <div>
                                <p className="stat-title">Tasks Completed</p>
                                <h3>5 / 8</h3>
                                <span className="stat-sub">2 tasks left</span>
                            </div>
                        </div>

                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: "62%" }}></div>
                        </div>
                    </div>

                    <div className="stat-card glass">
                        <div className="stat-top">
                            <div className="stat-icon blue">🧠</div>

                            <div>
                                <p className="stat-title">Focus Time</p>
                                <h3>2h</h3>
                                <span className="stat-sub">+30m from yesterday</span>
                            </div>
                        </div>

                        <div className="segments">
                            {[...Array(20)].map((_, i) => (
                                <span
                                    key={i}
                                    className={i < 12 ? "segment active" : "segment"}
                                ></span>
                            ))}
                        </div>
                    </div>

                    <div className="stat-card glass streak-card">
                        <div className="stat-top">
                            <div className="stat-icon orange">🔥</div>

                            <div>
                                <p className="stat-title">Active Streak</p>
                                <h3>7 Days</h3>
                            </div>
                        </div>

                        <div className="streak-grid">
                            {Array.from({ length: 28 }).map((_, i) => {
                                const completedDays = [1, 2, 3, 5, 6, 7, 10, 11, 12, 15, 16, 17, 18];

                                return (
                                    <div
                                        key={i}
                                        className={`streak-box ${completedDays.includes(i) ? "active" : ""
                                            }`}
                                    ></div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="stat-card glass ai-card">
                        <div className="stat-top">
                            <div className="stat-icon purple">✨</div>

                            <div>
                                <p className="stat-title">AI Insight</p>
                            </div>
                        </div>

                        <div className="ai-content">
                            <p className="ai-line">
                                You're most productive between <span>10 AM – 1 PM</span>
                            </p>

                        </div>
                    </div>
                </section>

                {/* Main Widgets */}

                <div className="dashboard-row">
                    <TasksWidget />

                    <div className="widget calendar">
                        <h3>Today's Timeline</h3>

                        <div className="timeline">
                            <div className="timeline-content">
                                <div className="timeline-scroll">
                                    <div className="timeline-bar">
                                        {timeSlots.map((time, index) => (
                                            <div key={index} className="time-slot">
                                                {time}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="timeline-events">
                                        <div className="event-card" style={{ left: "35%" }}>
                                            <span className="event-time">12:00 PM</span>
                                            <h4>Lunch Break</h4>
                                            <p>Take a walk & eat healthy</p>
                                        </div>

                                        <div className="event-card light" style={{ left: "55%" }}>
                                            <span className="event-time">1:30 PM</span>
                                            <h4>1:1 Check-in</h4>
                                            <p>Catch up with manager</p>
                                        </div>

                                        <div className="event-card light" style={{ left: "75%" }}>
                                            <span className="event-time">3:00 PM</span>
                                            <h4>Design Review</h4>
                                            <p>Review final prototype</p>
                                        </div>
                                    </div>
                                    <div
                                        className="current-time-line"
                                        style={{ left: `${getCurrentPosition()}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="xp-card">
                    <div className="xp-header">

                        <div className="xp-left">
                            <div className="xp-icon">🏆</div>

                            <div>
                                <h3>Level 12</h3>
                                <p className="xp-sub">Master of Focus</p>
                            </div>
                        </div>

                        <div className="xp-points">
                            8,450 / 10,000
                        </div>

                    </div>

                    {/* Progress */}
                    <div className="xp-progress">
                        <div className="xp-fill" style={{ width: "84%" }}></div>
                    </div>

                    {/* Badges */}
                    <div className="xp-badges">
                        <p className="badge-title">Recent Badges</p>

                        <div className="badge-list">
                            <div className="badge">⭐</div>
                            <div className="badge">🔥</div>
                            <div className="badge">⚡</div>
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