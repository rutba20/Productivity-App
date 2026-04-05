import React,{ useState } from "react";
import "./Goals.css";
import GoalCard from "../../../components/goals/GoalCard";
import Modal from "../../../components/common/Modal";



const GoalsPage = () => {
    const [aiInput, setAiInput] = useState("");
    // goal modal state
    const [showModal, setShowModal] = useState(false);
    // ai modal state
    const [showAIModal, setShowAIModal] = useState(false);
    // state for AI modal 
   const generateAIGoal = () => {
     if (!aiInput.trim()) return;

     const newGoal = {
       title: aiInput,
       description: "AI Generated Plan",
       status: "in-progress",
       progress: 0,
       priority: "medium",
       color: "purple",

       milestones: [
         {
           title: "Learn Basics",
           tasks: ["Python", "Statistics", "Excel"],
         },
         {
           title: "Core Skills",
           tasks: ["SQL", "Data Cleaning", "Visualization"],
         },
         {
           title: "Projects + Prep",
           tasks: ["Build Portfolio", "Practice Interview"],
         },
       ],

       tasksDone: 0,
       totalTasks: 6,
       milestonesDone: 0,
       totalMilestones: 3,
       dueDate: "3 months",
     };

     setGoals((prev) => [...prev, newGoal]);

     setShowAIModal(false); // ✅ correct modal closed
     setAiInput("");
   };
    // state for goals - in real app, this would come from backend
    const [goals, setGoals] = useState([
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
        color: "purple",
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
        color: "green",
      },
    ]);
     const [form, setForm] = useState({
       title: "",
       description: "",
       category: "Career",
       priority: "medium",
       milestones: [{ title: "", tasks: [""] }],
     });

     const addMilestone = () => {
       setForm({
         ...form,
         milestones: [...form.milestones, { title: "", tasks: [""] }],
       });
     };
     const updateMilestone = (index, value) => {
       const updated = [...form.milestones];
       updated[index].title = value;
       setForm({ ...form, milestones: updated });
     };
     const addTask = (mIndex) => {
       const updated = [...form.milestones];
       updated[mIndex].tasks.push("");
       setForm({ ...form, milestones: updated });
     };
     const updateTask = (mIndex, tIndex, value) => {
       const updated = [...form.milestones];
       updated[mIndex].tasks[tIndex] = value;
       setForm({ ...form, milestones: updated });
     };

     const handleAddGoal = (e) => {
       e.preventDefault(); // prevents page reload (important if using <form>)

       if (!form.title.trim()) return; // basic validation

       const newGoal = {
         ...form, // takes title, description, etc.
         progress: 0,
         status: "in-progress",
         tasksDone: 0,
         totalTasks: 0,
         milestonesDone: 0,
         totalMilestones: 0,
         dueDate: "No date",
         color: "blue",
       };

       setGoals((prev) => [...prev, newGoal]); // add new goal

       // reset form
       setForm({
         title: "",
         description: "",
         category: "Career",
         priority: "medium",
         milestones: [{ title: "", tasks: [""] }],
       });
       setShowModal(false); // close modal
     };
     
    return (
      <div className="goals-page">
        {/* Header */}
        <div className="goals-header">
          <div>
            <h1>Your Goals</h1>
            <p>Track and achieve your most important objectives</p>
          </div>

          <div className="goals-actions">
            <button className="ai-btn" onClick={() => setShowAIModal(true)}>
              {" "}
              ✨ AI Breakdown
            </button>
            <button className="add-btn" onClick={() => setShowModal(true)}>
              + Add Goal
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="goals-stats">
          <div className="stat-card blue">
            2 <span>In Progress</span>
          </div>
          <div className="stat-card teal">
            1 <span>Completed</span>
          </div>
          <div className="stat-card purple">
            3 <span>Total Goals</span>
          </div>
          <div className="stat-card orange">
            68% <span>Avg Progress</span>
          </div>
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

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <h2>Add Goal</h2>

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          {/* 🔥 MILESTONES */}
          {form.milestones.map((m, mIndex) => (
            <div key={mIndex} className="milestone-block">
              <input
                placeholder="Milestone title"
                value={m.title}
                onChange={(e) => updateMilestone(mIndex, e.target.value)}
              />

              {/* TASKS */}
              {m.tasks.map((task, tIndex) => (
                <input
                  key={tIndex}
                  placeholder="Task"
                  value={task}
                  onChange={(e) => updateTask(mIndex, tIndex, e.target.value)}
                />
              ))}

              <button type="button" onClick={() => addTask(mIndex)}>
                + Add Task
              </button>
            </div>
          ))}

          <button type="button" onClick={addMilestone}>
            + Add Milestone
          </button>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>Career</option>
            <option>Health</option>
            <option>Study</option>
          </select>

          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div className="modal-actions">
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={handleAddGoal}>Add</button>
          </div>
          
        </Modal>
        <Modal isOpen={showAIModal} onClose={() => setShowAIModal(false)}>
          <h2>AI Goal Breakdown</h2>

          <textarea
            placeholder="Describe your goal (e.g., Become a data analyst in 3 months)"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
          />

          <div className="modal-actions">
            <button onClick={() => setShowAIModal(false)}>Cancel</button>
            <button onClick={generateAIGoal}>Generate</button>
          </div>
        </Modal>
      </div>
    );
};

export default GoalsPage;