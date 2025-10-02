import React from "react";
import "./TaskList.css";

const TaskList = ({ tasks, onEdit, onComplete, onDelete }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index} className={task.completed ? "completed" : ""}>
          {task.text}
          <div className="task-actions">
            <button
              className="task-button edit"
              onClick={() => onEdit(index)}
            >
              Edit
            </button>
            <button
              className="task-button complete"
              onClick={() => onComplete(index)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              className="task-button delete"
              onClick={() => onDelete(index)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
