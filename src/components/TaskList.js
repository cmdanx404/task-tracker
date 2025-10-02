import React, { useState } from "react";

function TaskList({ tasks, toggleTask, deleteTask, editTask, filter }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  if (tasks.length === 0) {
    if (filter === "all") {
      return <p>No tasks yet, add one above 👆</p>;
    } else {
      return <p>No tasks found</p>;
    }
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} style={{ marginBottom: "10px" }}>
          {editingId === task.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button
                className="save-btn"
                onClick={() => {
                  editTask(task.id, editText);
                  setEditingId(null);
                }}
              >
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
              <div>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditingId(task.id);
                    setEditText(task.text);
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  className={task.completed ? "pending-btn" : "complete-btn"}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "↩️ Mark as Pending" : "✅ Mark as Complete"}
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
