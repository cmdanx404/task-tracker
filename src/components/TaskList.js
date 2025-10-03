import React, { useState } from "react";
import "./TaskList.css";

function TaskList({ tasks, toggleTask, deleteTask, updateTask, filter }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (editText.trim() !== "") {
      updateTask(id, editText);
    }
    setEditingId(null);
    setEditText("");
  };

  if (tasks.length === 0) {
    return (
      <p>
        {filter === "all"
          ? "No tasks yet, add one above 👆"
          : "No tasks found"}
      </p>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          {editingId === task.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button className="save-btn" onClick={() => saveEdit(task.id)}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setEditingId(null)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <span
                className={`task-text ${task.completed ? "completed" : ""}`}
              >
                {task.text}
              </span>
              <div className="task-actions">
                <button
                  className="edit-btn"
                  onClick={() => startEditing(task)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="toggle-btn"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "Mark as Pending" : "Mark as Complete"}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  ❌ Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
