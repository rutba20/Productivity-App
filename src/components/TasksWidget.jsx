import React, { useState } from "react";
import "./TasksWidget.css";

export function TasksWidget() {
  const [tasks, setTasks] = useState([
    { text: "", completed: false },
  ]);

  // Update text
  const handleChange = (index, value) => {
    const updated = [...tasks];
    updated[index].text = value;
    setTasks(updated);
  };

  // Handle Enter & Backspace
  const handleKeyDown = (e, index) => {
    // Enter → add new task below
    if (e.key === "Enter") {
      e.preventDefault();

      const newTasks = [...tasks];
      newTasks.splice(index + 1, 0, { text: "", completed: false });
      setTasks(newTasks);
    }

    // Backspace on empty → delete task
    if (e.key === "Backspace" && tasks[index].text === "") {
      if (tasks.length === 1) return; // keep at least 1 row

      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    }
  };

  // Toggle checkbox
  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <div className="tasks-widget">
      <h3>Today's Tasks</h3>

      {tasks.map((task, index) => (
        <div key={index} className="task-row">
          
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(index)}
          />

          <input
            type="text"
            value={task.text}
            placeholder="Type a task..."
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`task-input ${task.completed ? "completed" : ""}`}
          />
        </div>
      ))}
    </div>
  );
}