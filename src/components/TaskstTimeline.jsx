import "./TasksTimeline.css";

export function TasksTimeline() {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="timeline-container">

      {/* HEADER (DATES) */}
      <div className="timeline-header">
        {["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"].map((day, i) => (
          <div key={i} className="day-column">
            {day}
          </div>
        ))}
      </div>

      {/* BODY */}
      <div className="timeline-body">

        {/* TIME LABELS */}
        <div className="time-column">
          {hours.map((h) => (
            <div key={h} className="time-slot">
              {h}:00
            </div>
          ))}
        </div>

        {/* DAYS GRID */}
        <div className="days-grid">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
            <div key={i} className="day-grid">

              {hours.map((h) => (
                <div key={h} className="grid-cell"></div>
              ))}

              {/* SAMPLE TASK BLOCK */}
              {i === 2 && (
                <div className="task-block" style={{ top: "120px", height: "80px" }}>
                  <p>Widget Refinement</p>
                  <span>2:00 PM</span>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}