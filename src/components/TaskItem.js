import React from "react";

function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li style={{ margin: "10px 0" }}>
      <span
        onClick={() => toggleTask(task.id)}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        {task.text}
      </span>
      <button onClick={() => deleteTask(task.id)}>❌</button>
    </li>
  );
}

export default TaskItem;
