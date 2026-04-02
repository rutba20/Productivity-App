import React, { useState } from "react";
import "./goals.css";

const Goals = () => {
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [newGoal, setNewGoal] = useState({
        title: "",
        description: "",
        category: "Career",
        deadline: "",
        priority: "Medium",
        milestones: [],
    });
    const handleChange = (e) => {
        setNewGoal({ ...newGoal, [e.target.name]: e.target.value });
    };

    const addMilestone = () => {
        setNewGoal({
            ...newGoal,
            milestones: [
                ...newGoal.milestones,
                { id: Date.now(), title: "", tasks: [] },
            ],
        });
    };

    const updateMilestone = (id, value) => {
        setNewGoal({
            ...newGoal,
            milestones: newGoal.milestones.map((m) =>
                m.id === id ? { ...m, title: value } : m
            ),
        });
    };

    const addTaskToMilestone = (milestoneId) => {
        setNewGoal({
            ...newGoal,
            milestones: newGoal.milestones.map((m) =>
                m.id === milestoneId
                    ? { ...m, tasks: [...m.tasks, ""] }
                    : m
            ),
        });
    };

    const updateTask = (milestoneId, index, value) => {
        setNewGoal({
            ...newGoal,
            milestones: newGoal.milestones.map((m) => {
                if (m.id === milestoneId) {
                    const updatedTasks = [...m.tasks];
                    updatedTasks[index] = value;
                    return { ...m, tasks: updatedTasks };
                }
                return m;
            }),
        });
    };
    const saveGoal = () => {
        const goalToSave = {
            ...newGoal,
            id: Date.now(),
            progress: 0,
            status: "Not Started",
        };

        // Add to goals list (you’ll replace this later with backend)
        goals.push(goalToSave);

        setShowModal(false);
        setNewGoal({
            title: "",
            description: "",
            category: "Career",
            deadline: "",
            priority: "Medium",
            milestones: [],
        });
    };
    const goals = [
        {
            id: 1,
            title: "Become Data Analyst",
            deadline: "2026-06-30",
            progress: 40,
            description: "Learn SQL, Python, and build projects",
            milestones: [
                { id: 1, title: "Learn SQL", completed: true },
                { id: 2, title: "Build Projects", completed: false },
            ],
            tasks: ["Practice joins", "Build dashboard"],
        },
    ];

    return (
        <div className="goals-page">
            {/* LEFT - GOALS LIST */}

            <div className="goals-list">
                <h2>Goals</h2>
                <button
                    className="add-goal-btn"
                    onClick={() => setShowModal(true)}
                >
                    + Add Goal
                </button>
                {goals.map((goal) => (
                    <div
                        key={goal.id}
                        className={`goal-card ${selectedGoal?.id === goal.id ? "active" : ""
                            }`}
                        onClick={() => setSelectedGoal(goal)}
                    >
                        <div className="goal-header">
                            <h3>{goal.title}</h3>
                            <span className="deadline">{goal.deadline}</span>
                        </div>

                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${goal.progress}%` }}
                            ></div>
                        </div>

                        <p className="progress-text">{goal.progress}% completed</p>
                    </div>
                ))}
            </div>

            {/* RIGHT - GOAL DETAILS */}
            <div className="goal-details">
                {selectedGoal ? (
                    <>
                        <h2>{selectedGoal.title}</h2>
                        <p className="goal-desc">{selectedGoal.description}</p>

                        {/* Milestones */}
                        <div className="milestones">
                            <h3>Milestones</h3>
                            {selectedGoal.milestones.map((m) => (
                                <div key={m.id} className="milestone-item">
                                    <input type="checkbox" checked={m.completed} readOnly />
                                    <span>{m.title}</span>
                                </div>
                            ))}
                        </div>

                        {/* Tasks */}
                        <div className="goal-tasks">
                            <h3>Linked Tasks</h3>
                            {selectedGoal.tasks.map((task, i) => (
                                <p key={i}>{task}</p>
                            ))}
                        </div>

                        {/* Progress Chart Placeholder */}
                        <div className="goal-chart">
                            <h3>Progress</h3>
                            <div className="chart-placeholder">Chart coming soon</div>
                        </div>
                    </>
                ) : (
                    <div className="empty-state">
                        <p>Select a goal to view details</p>
                    </div>
                )}
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">

                        <h2>Create Goal</h2>

                        <input
                            name="title"
                            placeholder="Goal Title"
                            value={newGoal.title}
                            onChange={handleChange}
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={newGoal.description}
                            onChange={handleChange}
                        />

                        {/* Category */}
                        <select name="category" onChange={handleChange}>
                            <option>Career</option>
                            <option>Health</option>
                            <option>Study</option>
                            <option>Personal</option>
                        </select>

                        {/* Deadline */}
                        <input
                            type="date"
                            name="deadline"
                            value={newGoal.deadline}
                            onChange={handleChange}
                        />

                        {/* Priority */}
                        <select name="priority" onChange={handleChange}>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>

                        {/* Milestones */}
                        <div className="milestone-section">
                            <h3>Milestones</h3>

                            {newGoal.milestones.map((m) => (
                                <div key={m.id} className="milestone-block">

                                    <input
                                        placeholder="Milestone title"
                                        value={m.title}
                                        onChange={(e) =>
                                            updateMilestone(m.id, e.target.value)
                                        }
                                    />

                                    {/* Tasks */}
                                    {m.tasks.map((task, i) => (
                                        <input
                                            key={i}
                                            placeholder="Task"
                                            value={task}
                                            onChange={(e) =>
                                                updateTask(m.id, i, e.target.value)
                                            }
                                        />
                                    ))}

                                    <button onClick={() => addTaskToMilestone(m.id)}>
                                        + Add Task
                                    </button>

                                </div>
                            ))}

                            <button onClick={addMilestone}>+ Sub goals</button>
                        </div>

                        {/* Actions */}
                        <div className="modal-actions">
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={saveGoal} className="save-btn">
                                Save Goal
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Goals;