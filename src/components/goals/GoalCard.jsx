import React from "react";

const GoalCard = ({ goal }) => {
  return (
    <div className="goal-card">

      {/* TOP STRIP */}
      <div className={`card-top ${goal.color}`}></div>

      {/* HEADER */}
      <div className="card-header">
        <h3>{goal.title}</h3>
        <span className={`status ${goal.status}`}>
          {goal.status}
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="card-desc">{goal.description}</p>

      {/* PROGRESS */}
      <div className="progress-section">
        <div className="progress-header">
          <span>Progress</span>
          <span>{goal.progress}%</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${goal.progress}%` }}
          ></div>
        </div>
      </div>

      {/* STATS */}
      <div className="card-stats">
        <span>{goal.tasksDone}/{goal.totalTasks} tasks</span>
        <span>{goal.milestonesDone}/{goal.totalMilestones} milestones</span>
      </div>

      {/* FOOTER */}
      <div className="card-footer">
        <span>⏱ {goal.dueDate}</span>
        <span className={`priority ${goal.priority}`}>
          {goal.priority}
        </span>
      </div>

    </div>
  );
};

export default GoalCard;