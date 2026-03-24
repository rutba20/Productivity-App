
import "./dashboard.css";
import React, { useState } from "react";


export default function Dashboard() {
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
                        <li>Tasks</li>
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

                    <div className="profile">username</div>

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
                <section className="widgets">

                    <div className="widget tasks">
                        <div className="widget tasks">
                            <div className="widget-header">
                                <h3>Today's Tasks</h3>
                                <button className="add-task">+ Add</button>
                            </div>

                            <ul className="task-list">
                                <li className="task-item">
                                    <label className="custom-checkbox">
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <span className="task-text">Finish SQL practice</span>
                                </li>

                                <li className="task-item">
                                    <label className="custom-checkbox">
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <span className="task-text">Gym workout</span>
                                </li>

                                <li className="task-item completed">
                                    <label className="custom-checkbox">
                                        <input type="checkbox" defaultChecked />
                                        <span className="checkmark"></span>
                                    </label>
                                    <span className="task-text">Submit project report</span>
                                </li>

                                <li className="task-item">
                                    <label className="custom-checkbox">
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <span className="task-text">Read 10 pages</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="widget calendar">
                        <h3>Schedule</h3>
                        <p>9:00 — Study</p>
                        <p>12:00 — Project Work</p>
                        <p>18:00 — Gym</p>
                    </div>

                    <div className="widget goals">
                        <h3>Goals Progress</h3>
                        <p>Data Science Prep — 70%</p>
                        <p>Workout Consistency — 50%</p>
                    </div>

                    <div className="widget notes">
                        <h3>Quick Notes</h3>
                        <textarea placeholder="Write something..."></textarea>
                    </div>

                </section>

            </main>
        </div>
    );
}