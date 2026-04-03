import React from "react";
import "./Goals.css";
import GoalCard from "../../../components/goals/GoalCard";

const goals = [
    {
        title: "Learn Data Science",
        description: "Master Python, ML and statistics",
        progress: 65,
        status: "in-progress",
        tasksDone: 8,
        totalTasks: 12,
        milestonesDone: 2,
        totalMilestones: 4,
        dueDate: "Due Mar 30",
        priority: "high",
        color: "purple"
    },
    {
        title: "Get Fit",
        description: "Workout and lose weight",
        progress: 40,
        status: "in-progress",
        tasksDone: 3,
        totalTasks: 8,
        milestonesDone: 1,
        totalMilestones: 2,
        dueDate: "Due Apr 30",
        priority: "medium",
        color: "green"
    }
];

const GoalsPage = () => {
    return (
        <div className="goals-page">
            {/* Header */}
            <div className="goals-header">
                <div>
                    <h1>Your Goals</h1>
                    <p>Track and achieve your most important objectives</p>
                </div>

                <div className="goals-actions">
                    <button className="ai-btn">✨ AI Breakdown</button>
                    <button className="add-btn">+ Add Goal</button>
                </div>
            </div>

            {/* Stats */}
            <div className="goals-stats">
                <div className="stat-card blue">2 <span>In Progress</span></div>
                <div className="stat-card teal">1 <span>Completed</span></div>
                <div className="stat-card purple">3 <span>Total Goals</span></div>
                <div className="stat-card orange">68% <span>Avg Progress</span></div>
            </div>

            {/* Filters */}
            <div className="goals-filters">
                <button className="active">All</button>
                <button>Career</button>
                <button>Health</button>
                <button>Study</button>
            </div>

            {/* Cards */}
            <div className="goals-grid">
                {goals.map((goal, i) => (
                    <GoalCard key={i} goal={goal} />
                ))}
            </div>
        </div>
    );
};

export default GoalsPage;